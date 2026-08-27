---
paths:
  - "components/DataInput/**"
---

# Data Input Components

## DuInputField

**Files:** `components/DataInput/du-input-field/du-input-field.vue` | `.types.ts` | `.stories.ts`

**Props:**
- `type?`: DuInputFieldType (`'text'` | `'password'` | `'email'` | `'number'` | `'date'` | `'datetime-local'` | `'week'` | `'month'` | `'tel'` | `'url'` | `'search'` | `'time'`)
- `placeholder?`: string
- `size?`: Size
- `ghost?`: boolean
- `invalid?`: boolean
- `variant?`: Variant
- `disabled?`: boolean
- `suggestionName?`: string
- `suggestionList?`: string[]
- `required?`: boolean
- `pattern?`: string
- `minlength?`: number
- `maxlength?`: number
- `title?`: string
- `class?`: string

---

## DuSelect

**Files:** `components/DataInput/du-select/du-select.vue` | `.types.ts` | `.stories.ts`

> **Complex component**: a styled facade over the internal combobox engine in
> `components/DataInput/core/combobox/`.
> The engine owns open/close, the query, the highlight, focus, the keyboard and the
> ARIA prop bags; the component owns markup and DaisyUI classes only. Never
> reintroduce local `open` / `query` / `highlightedIndex` state here — pass a
> new option to `useCombobox` (or extend the engine) instead.

Generic: `<script setup generic="O = any, V = any">`. Read the source and
`tests/du-select.spec.ts` before modifying.

**Props:**
- `modelValue?`: V | V[] | null (v-model)
- `options?`: O[]
- `multiple?` / `disabled?` / `readonly?` / `required?`: boolean
- `minSelected?` / `maxSelected?`: number
- `errorMessages?`: Partial<Record<'required' | 'minlength' | 'maxlength', string>>
- `trackBy?`: string (default `'id'`) - key identifying an option
- `labelBy?`: string (default `'name'`) - key displayed for an option
- `optionValue?` / `optionLabel?` / `optionFilter?` / `optionDisabled?`: callbacks, win over trackBy/labelBy
- `returnObject?`: boolean - emit whole options
- `closeOnSelect?`: boolean | null (default `null` = single closes, multiple stays open)
- `closeOnClickOutside?` / `selectOnTab?` / `clearable?`: boolean
- `placeholder?` / `noResultsText?` / `searchPlaceholder?` / `removeItemLabel?`: string
- `id?`: string (defaults to `useId()`)
- `popover?`: boolean - dropdown in the top layer
- `searchable?`: boolean - type in the field; `searchableInside?`: boolean - type in the dropdown
- `checkboxes?`: boolean
- `size?` / `subSize?`: Size, `variant?`: Variant, `ghost?`: boolean, `customClass?`: string

**Emits:** `update:modelValue`, `select`, `remove`, `query`, `open`, `close`

**Slots:** `tag`, `selected`, `option`, `no-options`, `error`

---

## DuSearch

**Files:** `components/DataInput/du-search/du-search.vue` | `.types.ts` | `.stories.ts`

> **Complex component**: same engine as DuSelect, typeahead shape — a single
> input that is itself the combobox. Same rule: no local state here.

Generic like DuSelect. `returnObject` defaults to **`true`** (the model holds
whole options).

**Props:** DuSelect's, minus `searchable*` / `checkboxes`, plus:
- `creatable?`: boolean - offer an "Add «query»" entry when nothing matches exactly
- `createOptionText?`: string (default `'Add'`), `createOption?`: (query: string) => O
- `commitOnClose?`: `'none' | 'match' | 'auto'` - what happens to text left in the field on close
- `externalFilter?`: boolean - server-side search: options already are the result
- `resultsLimit?`: number
- `name?` / `type?` / `pattern?`: string - native input attributes

**Emits:** `update:modelValue`, `select`, `remove`, `add`, `query`, `open`, `close`

**Slots:** `tag`, `option`, `create-option`, `no-options`, `error`

---

## DuCheckbox

**Fichiers :** `components/DataInput/du-checkbox/du-checkbox.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `modelValue?`: boolean (v-model, via `defineModel()`)
- `disabled?`: boolean
- `indeterminate?`: boolean
- `variant?`: Variant
- `size?`: Size

---

## DuRadio

**Fichiers :** `components/DataInput/du-radio/du-radio.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `checked?`: boolean
- `disabled?`: boolean
- `variant?`: Variant
- `size?`: Size

---

## DuRange

**Fichiers :** `components/DataInput/du-range/du-range.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `modelValue?`: number (v-model)
- `min?`: number
- `max?`: number
- `step?`: number
- `disabled?`: boolean
- `variant?`: Variant
- `size?`: Size

---

## DuRating

**Fichiers :** `components/DataInput/du-rating/du-rating.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `modelValue?`: number (v-model)
- `items?`: DuRatingItemData[]
- `count?`: number - Nombre d'étoiles (si pas d'items)
- `name?`: string
- `halfStar?`: boolean
- `clearable?`: boolean
- `disabled?`: boolean
- `size?`: Size
- `shape?`: `'star'` | `'star-2'` | `'heart'` | `'circle'`
- `color?`: string
- `customClass?`: string

**Types :**
```typescript
export interface DuRatingItemData {
  value: number
  checked?: boolean
}
```

---

## DuTextArea

**Fichiers :** `components/DataInput/du-text-area/du-text-area.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `modelValue?`: string (v-model)
- `placeholder?`: string
- `disabled?`: boolean
- `variant?`: Variant
- `size?`: Size
- `ghost?`: boolean

---

## DuFilter

**Files:** `components/DataInput/du-filter/du-filter.vue` | `.types.ts` | `.stories.ts`

Filter button group.

**Props:**
- `items?`: DuFilterItem[]
- `name?`: string
- `buttonsArgs?`: DuFilterButtonArgs

**Types :**
```typescript
export interface DuFilterItem {
  title?: string
  checked?: boolean
  customClass?: string
  buttonsArgs?: DuFilterButtonArgs
}

export interface DuFilterButtonArgs {
  variant?: Variant
  size?: Size
  outline?: boolean
  soft?: boolean
  dash?: boolean
  active?: boolean
  ghost?: boolean
  link?: boolean
  wide?: boolean
  disabled?: boolean
  square?: boolean
  circle?: boolean
}
```

---

## DuFieldset

**Fichiers :** `components/DataInput/du-fieldset/du-fieldset.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `legend?`: string
- `label?`: string

---

## DuFileInput

**Fichiers :** `components/DataInput/du-file-input/du-file-input.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `disabled?`: boolean
- `variant?`: Variant
- `size?`: Size
- `ghost?`: boolean

---

## DuLabel

**Fichiers :** `components/DataInput/du-label/du-label.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `type?`: `'label'` | `'input'` | `'select'` | `'floating-label'` | `'fieldset-label'`

---

## DuLabelInputValidator

**Files:** `components/DataInput/du-label-input-validator/du-label-input-validator.vue` | `.types.ts` | `.stories.ts`

Label + input combo with built-in HTML5 validation.

**Props:**
- `type?`: DuLabelProps["type"]
- `pattern?`: string
- `minlength?`: number
- `maxlength?`: number
- `title?`: string
- `required?`: boolean
- `placeholder?`: string
- `inputType?`: DuInputFieldType
- `disabled?`: boolean
- `suggestionName?`: string
- `suggestionList?`: string[]
