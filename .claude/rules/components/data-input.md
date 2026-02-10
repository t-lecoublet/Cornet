---
paths:
  - "components/DataInput/**"
---

# Composants Data Input

## DuInputField

**Fichiers :** `components/DataInput/du-input-field/du-input-field.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `type?`: INPUTFIELDType (`'text'` | `'password'` | `'email'` | `'number'` | `'date'` | `'datetime-local'` | `'week'` | `'month'` | `'tel'` | `'url'` | `'search'` | `'time'`)
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

**Fichiers :** `components/DataInput/du-select/du-select.vue` | `.types.ts` | `.stories.ts`

> **Composant complexe** : Logique de recherche, multi-sélection, gestion d'objets. Lire le source complet avant modification.

**Props :**
- `ghost?`: boolean
- `variant?`: Variant
- `size?`: Size
- `disabled?`: boolean
- `multiple?`: boolean
- `modelValue?`: any (v-model)
- `placeholder?`: string
- `search?`: boolean - Recherche externe
- `searchable?`: boolean - Recherche activée
- `searchableInside?`: boolean - Recherche intégrée dans le dropdown
- `searchPlaceholder?`: string
- `searchNoResultsText?`: string
- `options?`: any[]
- `checkboxes?`: boolean
- `closeOnSelect?`: boolean
- `trackBy?`: string - Propriété clé pour les objets
- `labelBy?`: string - Propriété label pour les objets
- `returnObject?`: boolean - Retourner l'objet complet

---

## DuSearch

**Fichiers :** `components/DataInput/du-search/du-search.vue` | `.types.ts` | `.stories.ts`

> **Composant complexe** : Auto-complétion, multi-sélection.

**Props :**
- `modelValue?`: any | any[] (v-model)
- `name`: string (requis)
- `id`: string (requis)
- `placeholder?`: string
- `listValues`: SearchOption[] (requis)
- `limit?`: number
- `addOption?`: boolean
- `type?`: string
- `required?`: boolean
- `pattern?`: string
- `multiple?`: boolean
- `size?`: Size
- `variant?`: Variant
- `ghost?`: boolean
- `disabled?`: boolean
- `customClass?`: string

**Types :**
```typescript
export interface SearchOption {
  id: any
  name: string
}
```

---

## DuCheckbox

**Fichiers :** `components/DataInput/du-checkbox/du-checkbox.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `modelValue?`: boolean (v-model)
- `checked?`: boolean
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
- `items?`: RatingItem[]
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
export interface RatingItem {
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

**Fichiers :** `components/DataInput/du-filter/du-filter.vue` | `.types.ts` | `.stories.ts`

Groupe de boutons filtres.

**Props :**
- `items?`: FilterItem[]
- `name?`: string
- `buttonsArgs?`: FilterButtonArgs

**Types :**
```typescript
export interface FilterItem {
  title?: string
  checked?: boolean
  customClass?: string
  buttonsArgs?: FilterButtonArgs
}

export interface FilterButtonArgs {
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

**Fichiers :** `components/DataInput/du-label-input-validator/du-label-input-validator.vue` | `.types.ts` | `.stories.ts`

Combo label + input avec validation HTML5 intégrée.

**Props :**
- `type?`: LABELProps["type"]
- `pattern?`: string
- `minlength?`: number
- `maxlength?`: number
- `title?`: string
- `required?`: boolean
- `placeholder?`: string
- `inputType?`: INPUTFIELDType
- `disabled?`: boolean
- `suggestionName?`: string
- `suggestionList?`: string[]
