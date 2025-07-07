<script setup lang="ts">
import { ref, computed, watch, toRefs, onUnmounted, nextTick, provide } from 'vue'
import DuMenu from "../../Navigation/du-menu/du-menu.vue"
import { type SELECTProps } from './du-select.types'
import { useVariantMapping } from "../../../composables/useVariantProps"
import { useSizeMapping } from "../../../composables/useSizeProps"

const rootRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

const props = withDefaults(
  defineProps<SELECTProps & { options?: any[] }>(),
  {
    ghost: false,
    variant: "default",
    size: "default",
    disabled: false,
    multiple: false,
    search: false,
    options: () => [],
    placeholder: 'Select an option',
    searchPlaceholder: 'Search...',
    searchNoResultsText: 'No results found',
  },
)
const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const { ghost, variant, size, disabled, multiple, modelValue, options, placeholder, search, searchPlaceholder } = toRefs(props)

const ghostClass = computed(() => (ghost.value ? "select-ghost" : ""))
const { colorClass } = useVariantMapping(props, "select")
const { sizeClass } = useSizeMapping(props, "select")

const isOpen = ref(false)
const searchQuery = ref('')
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

// Fonction de filtrage récursive
function filterOptions(optionsList: any[], query: string): any[] {
  if (!query.trim()) return optionsList
  
  return optionsList.reduce((filtered: any[], opt: any) => {
    if ('options' in opt) {
      // C'est un groupe
      const filteredSubOptions = filterOptions(opt.options, query)
      if (filteredSubOptions.length > 0) {
        filtered.push({
          ...opt,
          options: filteredSubOptions
        })
      }
    } else {
      // C'est une option simple
      if (opt.label.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(opt)
      }
    }
    return filtered
  }, [])
}

// Options filtrées basées sur la recherche
const filteredOptions = computed(() => {
  return filterOptions(options.value, searchQuery.value)
})

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
        multiple: multiple.value, // Indique au menu-item s'il doit afficher la checkbox
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
    searchQuery.value = '' // Reset search on selection
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

async function handleDropdownClick(e: MouseEvent) {
  if (disabled.value) return
  isOpen.value = !isOpen.value
  e.stopPropagation()
  
  // Focus sur l'input de recherche si activé
  if (isOpen.value && search.value) {
    await nextTick()
    searchInputRef.value?.focus()
  }
}

function handleOutsideClick(e: MouseEvent) {
  if (!isOpen.value) return
  const target = e.target as Node
  if (rootRef.value && !rootRef.value.contains(target)) {
    isOpen.value = false
    searchQuery.value = '' // Reset search when closing
  }
}

function handleSearchInput(e: Event) {
  const target = e.target as HTMLInputElement
  searchQuery.value = target.value
}

function clearSearch() {
  searchQuery.value = ''
  searchInputRef.value?.focus()
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', handleOutsideClick)
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleOutsideClick)
  }
})

provide('isDropdownTrigger', true)
</script>

<template>
  <div class="relative w-full" ref="rootRef">
    <div 
      :class="[
        'select',
        ghostClass,
        colorClass,
        sizeClass,
        'w-full flex items-center cursor-pointer',
        { 'select-disabled': disabled, 'bg-base-100': isOpen }
      ]" 
      @click="handleDropdownClick" 
      tabindex="0" 
      :aria-disabled="disabled"
    >
      <span class="truncate flex-1 text-left">
        {{ selectedLabels || placeholder }}
      </span>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="absolute z-30 w-full mt-1 shadow-lg rounded-box bg-base-100 overflow-hidden max-h-72">
        <!-- Input de recherche -->
        <div v-if="search" class="p-2 border-b border-base-300">
          <div class="relative">
            <input
              ref="searchInputRef"
              type="text"
              class="input input-sm w-full pr-8"
              :placeholder="searchPlaceholder"
              :value="searchQuery"
              @input="handleSearchInput"
              @click.stop
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-60 hover:opacity-100"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <!-- Menu des options -->
        <div class="overflow-auto" :class="{ 'max-h-60': search, 'max-h-72': !search }">
          <DuMenu 
            :items="mapOptionsToMenuItems(filteredOptions)" 
            class="w-full" 
            :rounded="true"
          />
          <!-- Message si aucun résultat -->
          <div v-if="search && searchQuery && filteredOptions.length === 0" class="px-4 py-2 text-sm text-base-content/60 text-center">
            {{ searchNoResultsText }}
          </div>
        </div>
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
