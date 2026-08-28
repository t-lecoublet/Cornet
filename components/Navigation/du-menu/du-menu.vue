<script setup lang="ts" generic="T extends DuMenuItemData = DuMenuItemData">
// Two components in one, chosen by `role`:
//   nav  — a list of links. No ARIA role, native Tab. What a sidebar is.
//   menu — WAI-ARIA menu pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menu/
//          one tab stop, arrow keys, typeahead, collapsible submenus.
import { computed, provide, reactive, ref, watch } from 'vue'
import { useRovingIndex } from '../../core/navigation'
import { useSizeMapping } from '../../../composables/useSizeProps'
import DuMenuItem from './du-menu-item.vue'
import {
  DU_MENU_CONTEXT,
  type DuMenuContext,
  type DuMenuItemData,
  type DuMenuProps,
} from './du-menu.types'

const props = withDefaults(
  defineProps<DuMenuProps<T>>(),
  {
    role: 'nav',
    direction: 'vertical',
    size: 'default',
    rounded: true,
    items: undefined,
    activeItem: undefined,
    ariaLabel: undefined,
  },
)

const emit = defineEmits<{
  itemClick: [item: T]
  subItemClick: [item: T]
}>()

const root = ref<HTMLElement | null>(null)
const isMenu = computed(() => props.role === 'menu')

// --- submenus ---------------------------------------------------------------
// A nav menu shows every level at once, the way a sidebar does. A real menu
// collapses them, which is what `aria-expanded` on the parent announces.
const expanded = reactive(new Set<string>())

function isExpanded(path: string): boolean {
  return !isMenu.value || expanded.has(path)
}

function toggleSubmenu(path: string, force?: boolean) {
  if (!isMenu.value) {
    return
  }
  const shouldOpen = force ?? !expanded.has(path)
  if (shouldOpen) {
    expanded.add(path)
  }
  else {
    expanded.delete(path)
  }
}

// --- roving tab stop --------------------------------------------------------
// The path (`"1-0"`) identifies an item across renders; an index would not,
// because the visible set changes as submenus open and close.
const activePath = ref<string | null>(null)

const menuItems = () => [
  ...(root.value?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []),
]

const roving = useRovingIndex({
  items: menuItems,
  orientation: () => (props.direction === 'horizontal' ? 'horizontal' : 'vertical'),
  isDisabled: (el) => el.getAttribute('aria-disabled') === 'true',
  typeahead: () => isMenu.value,
})

/** The first item that can hold the tab stop, so the menu is reachable at all. */
const firstEnabledPath = computed(() => {
  const walk = (list: DuMenuItemData[], prefix: string): string | null => {
    for (const [index, item] of list.entries()) {
      const path = prefix === '' ? `${index}` : `${prefix}-${index}`
      if (!item.isTitle && !item.disabled) {
        return path
      }
      if (item.subItems != null && isExpanded(path)) {
        const found = walk(item.subItems, path)
        if (found != null) {
          return found
        }
      }
    }
    return null
  }
  return walk(props.items ?? [], '')
})

function isTabStop(path: string): boolean {
  if (!isMenu.value) {
    return true
  }
  return path === (activePath.value ?? firstEnabledPath.value)
}

function pathOf(el: Element | null): string | null {
  return el?.getAttribute('data-menu-path') ?? null
}

function onFocusin(event: FocusEvent) {
  const path = pathOf((event.target as HTMLElement).closest('[role="menuitem"]'))
  if (path != null) {
    activePath.value = path
    roving.syncTo(event.target)
  }
}

function onKeydown(event: KeyboardEvent) {
  const current = (event.target as HTMLElement).closest<HTMLElement>('[role="menuitem"]')
  const path = pathOf(current)

  // A submenu opens to the side and takes focus; closing steps back out to its
  // parent. The APG's horizontal keys, whatever the menu's own orientation.
  if (path != null && event.key === 'ArrowRight' && current?.getAttribute('aria-haspopup') === 'menu') {
    event.preventDefault()
    toggleSubmenu(path, true)
    void Promise.resolve().then(() => {
      const child = menuItems().find((el) => pathOf(el)?.startsWith(`${path}-`) === true)
      child?.focus()
    })
    return
  }
  if (path != null && event.key === 'ArrowLeft') {
    const parent = path.includes('-') ? path.slice(0, path.lastIndexOf('-')) : null
    if (parent != null) {
      event.preventDefault()
      toggleSubmenu(parent, false)
      menuItems().find((el) => pathOf(el) === parent)?.focus()
      return
    }
  }

  if (roving.onKeydown(event)) {
    event.preventDefault()
  }
}

// Attached only in `menu` mode: a nav menu is a list of links and has no
// keyboard behaviour of its own to listen for.
watch([root, isMenu], ([el, wanted], _old, onCleanup) => {
  if (el == null || !wanted) {
    return
  }
  el.addEventListener('focusin', onFocusin)
  el.addEventListener('keydown', onKeydown)
  onCleanup(() => {
    el.removeEventListener('focusin', onFocusin)
    el.removeEventListener('keydown', onKeydown)
  })
  // Sync flush: the ref is filled during mount, and the listeners have to be
  // in place by the time `mount()` returns, not a tick later.
}, { immediate: true, flush: 'sync' })

function select(item: DuMenuItemData, isSubItem: boolean) {
  if (isSubItem) {
    emit('subItemClick', item as T)
  }
  else {
    emit('itemClick', item as T)
  }
}

provide<DuMenuContext>(DU_MENU_CONTEXT, reactive({
  role: computed(() => props.role),
  activeItem: computed(() => props.activeItem),
  isExpanded,
  toggleSubmenu,
  isTabStop,
  select,
}) as unknown as DuMenuContext)

// --- presentation -----------------------------------------------------------
const directionClass = computed(() => ({
  default: '',
  vertical: 'menu-vertical',
  horizontal: 'menu-horizontal',
  responsive: 'menu-vertical lg:menu-horizontal',
}[props.direction]))

const { sizeClass } = useSizeMapping(props, 'menu')

const roundedClass = computed(() => (props.rounded ? 'rounded-box' : '[&_li>*]:rounded-none p-0'))
</script>

<template>
  <ul
    ref="root"
    :role="isMenu ? 'menu' : undefined"
    :aria-label="ariaLabel"
    :aria-orientation="isMenu ? (direction === 'horizontal' ? 'horizontal' : 'vertical') : undefined"
    :class="['menu', 'bg-base-200', roundedClass, directionClass, sizeClass]"
  >
    <!-- Items mode -->
    <template v-if="items && !$slots.default">
      <DuMenuItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :index="index"
      >
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps ?? {}" />
        </template>
      </DuMenuItem>
    </template>

    <!-- Manual mode: the consumer writes the <li>s. -->
    <slot v-else />
  </ul>
</template>
