<script setup lang="ts">
import { ref, computed, watch, toRefs, onUnmounted } from 'vue'
import DuMenu from "../../Navigation/du-menu/du-menu.vue"
import { type SELECTProps } from './du-select.types'
import { useVariantMapping } from "../../../composables/useVariantProps"
import { useSizeMapping } from "../../../composables/useSizeProps"

const rootRef = ref<HTMLElement | null>(null)

const props = withDefaults(
  defineProps<SELECTProps & { options?: any[] }>(),
  {
    ghost: false,
    variant: "default",
    size: "default",
    disabled: false,
    multiple: false,
    options: () => [],
    placeholder: 'Sélectionnez...'
  },
)
const emit = defineEmits(['update:modelValue'])

const { ghost, variant, size, disabled, multiple, modelValue, options, placeholder } = toRefs(props)

const ghostClass = computed(() => (ghost.value ? "select-ghost" : ""))
const { colorClass } = useVariantMapping(props, "select")
const { sizeClass } = useSizeMapping(props, "select")

const isOpen = ref(false)
const internalValue = ref<any>(multiple.value ? ([] as (string | number)[]) : (null as null | string | number))

watch(
  () => modelValue.value,
  (val) => {
    if (multiple.value) {
      if (Array.isArray(val) && JSON.stringify(val) !== JSON.stringify(internalValue.value)) {
        internalValue.value = val.slice()
      }
    } else {
      if (val !== internalValue.value) {
        internalValue.value = val as string | number | null
      }
    }
  },
  { immediate: true }
)

watch(
  () => internalValue.value,
  (val) => {
    if (multiple.value) {
      if (JSON.stringify(val) !== JSON.stringify(modelValue.value)) {
        emit('update:modelValue', val)
      }
    } else {
      if (val !== modelValue.value) {
        emit('update:modelValue', val)
      }
    }
  }
)

/**
 * Transforme les options du select en MenuItem[] pour DuMenu.
 * Prend en compte isTitle (groupe/titre) + subItems.
 */
function mapOptionsToMenuItems(optionsList: any[]): any[] {
  return optionsList.map(opt => {
    if ('options' in opt) {
      return {
        label: opt.label,
        isTitle: true,
        subItems: mapOptionsToMenuItems(opt.options),
      }
    } else {
      return {
        label: opt.label,
        value: opt.value,
        disabled: !!opt.disabled,
        onClick: () => onSelectOption(opt),
        checked: multiple.value ? (internalValue.value as any[]).includes(opt.value) : internalValue.value === opt.value,
      }
    }
  })
}

function onSelectOption(opt: any) {
  if (opt.disabled) return
  if (multiple.value) {
    let arr = Array.isArray(internalValue.value) ? internalValue.value.slice() : []
    if (arr.includes(opt.value)) {
      arr = arr.filter(v => v !== opt.value)
    } else {
      arr = [...arr, opt.value]
    }
    internalValue.value = arr
  } else {
    internalValue.value = opt.value
    isOpen.value = false
  }
}

const selectedLabels = computed(() => {
  if (multiple.value) {
    const arr = internalValue.value as (string | number)[]
    // Récupère les labels des items sélectionnés (y compris dans les groupes)
    function collectLabels(opts: any[]): string[] {
      return opts.flatMap(opt => {
        if (opt.options) {
          return collectLabels(opt.options)
        } else if (arr.includes(opt.value)) {
          return [opt.label]
        }
        return []
      })
    }
    return collectLabels(options.value).join(', ')
  } else {
    // Trouve le label de la valeur sélectionnée
    function findLabel(opts: any[]): string | undefined {
      for (const opt of opts) {
        if (opt.options) {
          const label = findLabel(opt.options)
          if (label) return label
        } else if (opt.value === internalValue.value) {
          return opt.label
        }
      }
      return undefined
    }
    return findLabel(options.value) || ''
  }
})

function handleDropdownClick(e: MouseEvent) {
  if (disabled.value) return
  isOpen.value = !isOpen.value
  e.stopPropagation()
}

function handleOutsideClick(e: MouseEvent) {
  if (!isOpen.value) return
  const target = e.target as Node
  if (rootRef.value && !rootRef.value.contains(target)) {
    isOpen.value = false
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', handleOutsideClick)
}
onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div class="relative w-full " ref="rootRef">
    <div :class="[
      'select',
      ghostClass,
      colorClass,
      sizeClass,
      'w-full flex items-center cursor-pointer',
      { 'select-disabled': disabled, 'bg-base-100': isOpen }
    ]" @click.stop="handleDropdownClick" tabindex="0" :aria-disabled="disabled">
      <span class="truncate flex-1 text-left">
        {{ selectedLabels || placeholder }}
      </span>
      <svg class="w-4 h-4 ml-2 opacity-70" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="absolute z-30 w-full mt-1 shadow-lg rounded-box bg-base-100 overflow-auto max-h-72 ">
        <DuMenu :items="mapOptionsToMenuItems(options)" class="w-56">
          <template #item="{ item }">
            <li><a @click.stop="item.onClick && item.onClick()">
              <input v-if="multiple && item.value !== undefined" type="checkbox" class="invisible w-0 h-0 overflow-clip" :checked="item.checked" disabled>
              {{ item.label }}
            </a></li>
          </template>
          <template #submenu="{ item }">
            <li>
              <a>{{ item.label }}</a>
              <ul>
                <li><a>Submenu slot 1</a></li>
                <li><a>Submenu slot 2</a></li>
              </ul>
            </li>
          </template>
        </DuMenu>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
