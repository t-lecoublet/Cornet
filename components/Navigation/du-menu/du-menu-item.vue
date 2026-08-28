<script setup lang="ts" generic="T extends DuMenuItemData = DuMenuItemData">
import { computed, inject } from 'vue'
import { iconAsText, resolveIconKind } from '../../../composables/useIconSource'
import {
  DU_MENU_CONTEXT,
  type DuMenuContext,
  type DuMenuItemData,
  type DuMenuItemProps,
} from './du-menu.types'

const props = defineProps<DuMenuItemProps<T>>()

// Typed via defineSlots so the recursive slot forwarding below stays type-safe.
const _slots = defineSlots()

const menu = inject<DuMenuContext>(DU_MENU_CONTEXT)

/** Identifies this item across renders: `"1"`, `"1-0"`, … */
const path = computed(() => (props.parentIndex ? `${props.parentIndex}-${props.index}` : `${props.index}`))

const isMenuRole = computed(() => menu?.role === 'menu')
const hasSubmenu = computed(() => props.item.subItems != null && props.item.subItems.length > 0)
const isExpanded = computed(() => menu?.isExpanded(path.value) ?? true)

const ROUTER_COMPONENTS = ['RouterLink', 'router-link', 'NuxtLink', 'nuxt-link']

const linkTag = computed(() => props.item.as || 'a')

const isRouterComponent = computed(() => {
  const tag = props.item.as
  if (!tag) return false
  if (typeof tag === 'string') return ROUTER_COMPONENTS.includes(tag)
  return tag.name ? ROUTER_COMPONENTS.includes(tag.name) : false
})

const linkProps = computed(() => {
  // A disabled item is not a destination: without an href it is not in the tab
  // order either, which is what `aria-disabled` promises a keyboard user.
  if (props.item.disabled) {
    return {}
  }
  return isRouterComponent.value ? { to: props.item.href } : { href: props.item.href }
})

const isActive = computed(() => (
  props.item.multiple ? props.item.checked : (props.item.checked || props.item.active)
))

/** Marks the item the consumer named through `activeItem`. */
const isCurrent = computed(() => {
  const marker = menu?.activeItem
  return marker != null && (props.item.value === marker || props.item.label === marker)
})

/**
 * Everything ARIA and focus-related for the anchor, in one bag — the two
 * branches below would otherwise drift apart.
 */
const itemProps = computed(() => {
  if (!isMenuRole.value) {
    return {
      'aria-disabled': props.item.disabled ? true : undefined,
      'aria-current': isCurrent.value ? ('page' as const) : undefined,
      'data-menu-path': path.value,
    }
  }
  return {
    role: 'menuitem' as const,
    'data-menu-path': path.value,
    // One tab stop for the whole menu; the arrows move between items.
    tabindex: menu?.isTabStop(path.value) ? 0 : -1,
    'aria-disabled': props.item.disabled ? true : undefined,
    'aria-haspopup': hasSubmenu.value ? ('menu' as const) : undefined,
    'aria-expanded': hasSubmenu.value ? isExpanded.value : undefined,
    // A checkable item is a menuitemcheckbox in APG terms; `aria-checked`
    // carries the state that the hidden input used to fake.
    ...(props.item.multiple && props.item.value !== undefined
      ? { role: 'menuitemcheckbox' as const, 'aria-checked': props.item.checked === true }
      : {}),
  }
})

function handleClick(event: MouseEvent) {
  if (props.item.disabled) {
    event.preventDefault()
    return
  }
  if (isMenuRole.value && hasSubmenu.value) {
    event.preventDefault()
    menu?.toggleSubmenu(path.value)
    return
  }
  props.item.onClick?.()
  menu?.select(props.item, props.parentIndex != null)
}

/** Enter and Space activate a menuitem, the way a button does. */
function handleKeydown(event: KeyboardEvent) {
  if (!isMenuRole.value || (event.key !== 'Enter' && event.key !== ' ')) {
    return
  }
  event.preventDefault()
  handleClick(new MouseEvent('click'))
}
</script>

<template>
  <!-- Plain title -->
  <template v-if="item.isTitle && !hasSubmenu">
    <slot v-if="$slots[`title-${path}`]" :name="`title-${path}`" :item="item" :index="index" />
    <slot v-else-if="$slots.title" name="title" :item="item" :index="index" />
    <li v-else :role="isMenuRole ? 'none' : undefined" class="menu-title">{{ item.label }}</li>
  </template>

  <!-- Title with a submenu -->
  <template v-else-if="item.isTitle && hasSubmenu">
    <li :role="isMenuRole ? 'none' : undefined">
      <slot v-if="$slots[`title-${path}`]" :name="`title-${path}`" :item="item" :index="index" />
      <slot v-else-if="$slots.title" name="title" :item="item" :index="index" />
      <h2 v-else class="menu-title">{{ item.label }}</h2>
      <ul v-show="isExpanded" :role="isMenuRole ? 'menu' : undefined">
        <DuMenuItem
          v-for="(sub, subIndex) in item.subItems"
          :key="subIndex"
          :item="sub"
          :index="subIndex"
          :parent-index="path"
        >
          <template v-for="(_, name) in $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps ?? {}" />
          </template>
        </DuMenuItem>
      </ul>
    </li>
  </template>

  <!-- Item, with or without a submenu -->
  <template v-else>
    <slot v-if="$slots[`item-${path}`]" :name="`item-${path}`" :item="item" :index="index" />
    <slot v-else-if="hasSubmenu && $slots[`submenu-${path}`]" :name="`submenu-${path}`" :item="item" :index="index" />
    <slot v-else-if="hasSubmenu && $slots.submenu" name="submenu" :item="item" :index="index" />
    <slot v-else-if="!hasSubmenu && $slots.item" name="item" :item="item" :index="index" />
    <!--
      `role="none"` in menu mode: `role="menu"` owns `menuitem` children
      directly, so the daisyUI `<li>` in between has to stop being a listitem
      or the tree is malformed (and the `<ul role="menu">` is not a list any
      more, which is the other half of the same rule).
    -->
    <li v-else :role="isMenuRole ? 'none' : undefined" :class="{ 'menu-disabled': item.disabled }">
      <component
        :is="linkTag"
        v-bind="{ ...linkProps, ...itemProps }"
        :class="{ 'menu-active': isActive, 'menu-disabled': item.disabled }"
        @click.stop="handleClick"
        @keydown="handleKeydown"
      >
        <component :is="item.icon" v-if="resolveIconKind(item.icon) === 'component'" />
        <img
          v-else-if="resolveIconKind(item.icon) === 'image'"
          :src="iconAsText(item.icon)"
          :alt="item.label"
          class="w-5 h-5"
        />
        <div v-else-if="resolveIconKind(item.icon) === 'html'" v-html="iconAsText(item.icon)"></div>
        {{ item.label }}
        <slot name="additional" :item="item" :index="index" />
      </component>

      <ul v-if="hasSubmenu" v-show="isExpanded" :role="isMenuRole ? 'menu' : undefined">
        <DuMenuItem
          v-for="(sub, subIndex) in item.subItems"
          :key="subIndex"
          :item="sub"
          :index="subIndex"
          :parent-index="path"
        >
          <template v-for="(_, name) in $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps ?? {}" />
          </template>
        </DuMenuItem>
      </ul>
    </li>
  </template>
</template>
