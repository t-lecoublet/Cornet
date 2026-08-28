<script setup lang="ts">
import { useSizeMapping } from '../../../composables/useSizeProps'
import { useVariantMapping } from '../../../composables/useVariantProps'
import { computed, inject, useSlots } from 'vue'
import { type DuButtonProps, type DuButtonElementTag } from './du-button.types'

const props = withDefaults(
  defineProps<DuButtonProps>(),
  {
    customClass: undefined,
    size: 'default',
    variant: 'default',
    outline: false,
    soft: false,
    dash: false,
    active: false,
    ghost: false,
    link: false,
    wide: false,
    disabled: undefined,
    square: false,
    circle: false,
    block: false,
    type: undefined,
    href: undefined,
    value: undefined,
    inputType: undefined,
    label: undefined,
    ariaLabel: undefined,
  },
)

const slots = useSlots()
const inJoin = inject("isInJoin", false)
const filterName = inject('filterName', undefined)

const { sizeClass } = useSizeMapping(props, 'btn')
const { colorClass } = useVariantMapping(props, 'btn')

const elementTag = computed((): DuButtonElementTag => {
  if (props.as) return props.as
  if (filterName) return 'input'

  return 'button'
})

const isInputElement = computed(() => elementTag.value === 'input')

/**
 * `label` names the button only when there is nothing visible to name it. With
 * slot content, overriding that text with a different string is what WCAG 2.5.3
 * forbids — a user saying "click Save" to a voice assistant needs the name to
 * match what they can see.
 */
// The template has two branches rather than one `<component :is>` with a `v-if`
// inside: an `<input>` is a void element and may hold no children at all, but a
// `v-if` still renders a comment placeholder on the client. The server, knowing
// the element is void, emits nothing — and hydration then reports a mismatch on
// every button in a filter.
const accessibleName = computed(() => props.ariaLabel ?? (slots.default == null ? props.label : undefined))
const isAnchorElement = computed(() => elementTag.value === 'a')

// The element this renders as changes with the context (a radio inside a
// DuFilter, an anchor, a div inside a dropdown trigger), and so do the
// attributes it needs. `string` covers them all: `tabindex` and `type` are
// attributes, not properties, so the DOM stringifies them anyway.
const buttonAttributes = computed(() => {
  const attrs: Record<string, string> = {}

  if (filterName) {
    attrs.name = filterName
    attrs.type = 'radio'
  } else if (isInputElement.value) {
    attrs.type = props.inputType || 'button'
    attrs.value = props.value || ''
  } else if (isAnchorElement.value) {
    attrs.href = props.href || '#'
    attrs.role = 'button'
  } else {
    attrs.type = props.type || 'button'
  }
  return attrs
})
</script>
<template>
  <input
    v-if="isInputElement"
    v-bind="buttonAttributes"
    :class="[
      'btn',
      customClass,
      sizeClass,
      colorClass,
      soft && 'btn-soft',
      outline && 'btn-outline',
      dash && 'btn-dash',
      active && 'btn-active',
      ghost && 'btn-ghost',
      link && 'btn-link',
      wide && 'btn-wide',
      square && 'btn-square',
      circle && 'btn-circle',
      block && 'btn-block',
      inJoin && 'join-item',
    ]"
    :aria-label="accessibleName"
    :disabled="props.disabled"
  />
  <component
    v-else
    :is="elementTag"
    v-bind="buttonAttributes"
    :class="[
      'btn',
      customClass,
      sizeClass,
      colorClass,
      soft && 'btn-soft',
      outline && 'btn-outline',
      dash && 'btn-dash',
      active && 'btn-active',
      ghost && 'btn-ghost',
      link && 'btn-link',
      wide && 'btn-wide',
      square && 'btn-square',
      circle && 'btn-circle',
      block && 'btn-block',
      inJoin && 'join-item',
    ]"
    :aria-label="accessibleName"
    :disabled="props.disabled"
  >
    <slot></slot>
  </component>
</template>
