---
paths:
  - "components/DataDisplay/**"
---

# Composants Data Display

## DuAccordion

**Fichiers :** `components/DataDisplay/du-accordion/du-accordion.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `customClass?`: string
- `items?`: ACCORDIONItem[]
- `modifier?`: `'collapse-arrow'` | `'collapse-plus'` | `'collapse-open'` | `'collapse-close'`
- `name?`: string - Nom du groupe pour exclusivité

**Types :**
```typescript
export interface ACCORDIONItem {
  title?: string
  content?: string
  checked?: boolean
  customClass?: string
}
export type ACCORDIONModifier = (typeof ACCORDION_MODIFIERS)[number]
```

---

## DuAvatar

**Fichiers :** `components/DataDisplay/du-avatar/du-avatar.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `size?`: Size
- `variant?`: Variant
- `rounded?`: Rounded (`'default'` | `'rounded'` | `'full'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`)
- `mask?`: Mask (`'default'` | `'heart'` | `'squircle'` | `'hexagon'` | `'hexagon-2'` | `'decagon'` | `'pentagon'` | `'diamond'` | `'square'` | `'circle'` | `'parallelogram'` | `'parallelogram-2'` | `'star'` | `'star-2'`)
- `ring?`: boolean
- `ringColor?`: string
- `ringOffset?`: number
- `online?`: boolean
- `offline?`: boolean
- `placeholder?`: boolean

---

## DuBadge

**Fichiers :** `components/DataDisplay/du-badge/du-badge.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `size?`: Size
- `variant?`: Variant
- `outline?`: boolean
- `soft?`: boolean
- `dash?`: boolean
- `ghost?`: boolean
- `icon?`: boolean

---

## DuCard

**Fichiers :** `components/DataDisplay/du-card/du-card.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `title?`: string
- `size?`: Size
- `bordered?`: boolean
- `dash?`: boolean
- `side?`: boolean - Disposition horizontale
- `responsive?`: boolean - Side sur grands écrans
- `imageFull?`: boolean - Image en arrière-plan

---

## DuCarousel / DuCarouselItem

**Fichiers :** `components/DataDisplay/du-carousel/du-carousel.vue` | `.types.ts` | `.stories.ts`

**Props DuCarousel :**
- `start?`: boolean
- `center?`: boolean
- `end?`: boolean
- `vertical?`: boolean

---

## DuChat

**Fichiers :** `components/DataDisplay/du-chat/du-chat.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `items?`: ChatItem[]
- `placement?`: `'start'` | `'end'`
- `customClass?`: string

**Types :**
```typescript
export interface ChatItem {
  message?: string
  image?: string
  header?: string
  footer?: string
  placement?: 'start' | 'end'
  variant?: CHATColor
  customClass?: string
}
```

---

## DuCollapse

**Fichiers :** `components/DataDisplay/du-collapse/du-collapse.vue` | `.types.ts` | `.stories.ts`

Similaire à DuAccordion mais pour des items individuels.

**Props :**
- `customClass?`: string
- `items?`: COLLAPSEItem[]
- `modifier?`: `'collapse-arrow'` | `'collapse-plus'` | `'collapse-open'` | `'collapse-close'`

**Types :**
```typescript
export interface COLLAPSEItem {
  title?: string
  content?: string
  open?: boolean
  customClass?: string
}
```

---

## DuCountdown / DuCountdownGroup

**Fichiers :** `components/DataDisplay/du-countdown/du-countdown.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `value?`: number
- `targetDate?`: Date
- `format?`: `'days'` | `'hours'` | `'minutes'` | `'seconds'`
- `separator?`: string
- `customClass?`: string
- `autoStart?`: boolean

---

## DuDiff

**Fichiers :** `components/DataDisplay/du-diff/du-diff.vue` | `.types.ts` | `.stories.ts`

Comparaison visuelle avant/après.

**Props :**
- `item1?`: string
- `item2?`: string
- `aspectRatio?`: `'aspect-16/9'` | `'aspect-4/3'` | `'aspect-1/1'` | `'aspect-video'` | `'aspect-square'` | string | null

---

## DuKbd

**Fichiers :** `components/DataDisplay/du-kbd/du-kbd.vue` | `.types.ts` | `.stories.ts`

Affichage de touches de clavier.

**Props :**
- `size?`: Size

---

## DuList

**Fichiers :** `components/DataDisplay/du-list/du-list.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `class?`: string

---

## DuStat

**Fichiers :** `components/DataDisplay/du-stat/du-stat.vue` | `.types.ts` | `.stories.ts`

Statistique individuelle.

**Props :**
- `figureClass?`: string
- `valueClass?`: string
- `descClass?`: string
- `titleClass?`: string

**Types :**
```typescript
export interface STATItem {
  title?: string
  value?: string | number
  description?: string
  figure?: any
  figureClass?: string
  valueClass?: string
  descClass?: string
  titleClass?: string
  actions?: any
}
```

---

## DuStats

**Fichiers :** `components/DataDisplay/du-stats/du-stats.vue` | `.types.ts` | `.stories.ts`

Groupe de statistiques.

**Props :**
- `items?`: STATSItem[]
- `vertical?`: boolean
- `shadow?`: boolean

---

## DuStatus

**Fichiers :** `components/DataDisplay/du-status/du-status.vue` | `.types.ts` | `.stories.ts`

Indicateur de statut (point coloré).

**Props :**
- `size?`: Size
- `variant?`: Variant
- `ping?`: boolean - Animation ping
- `bounce?`: boolean - Animation rebond

---

## DuTable

**Fichiers :** `components/DataDisplay/du-table/du-table.vue` | `.types.ts` | `.stories.ts`

> **Composant complexe** : Supporte les slots personnalisés par cellule (`#cell-{columnKey}="{ row }"`).

**Props :**
- `columns?`: TABLEColumn[]
- `rows?`: TABLERow[]
- `zebra?`: boolean
- `pinRows?`: boolean
- `pinCols?`: boolean
- `size?`: TABLESize
- `customClass?`: string
- `header?`: boolean
- `footer?`: boolean

**Types :**
```typescript
export interface TABLEColumn {
  key: string
  label: string
  customClass?: string
}

export interface TABLERow {
  id: string | number
  [key: string]: any
  customClass?: string
}
```

---

## DuTimeline

**Fichiers :** `components/DataDisplay/du-timeline/du-timeline.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `items?`: TIMELINEItem[]
- `direction?`: `'timeline-vertical'` | `'timeline-horizontal'`
- `modifier?`: `'timeline-snap-icon'` | `'timeline-box'` | `'timeline-compact'`
- `customClass?`: string
- `responsive?`: boolean
- `validItems?`: (boolean | undefined)[]
- `hrClasses?`: string[]

**Types :**
```typescript
export interface TIMELINEItem {
  start?: string
  middle?: string
  end?: string
  customClass?: string
  valid?: boolean | undefined
  hrClass?: string
}
```
