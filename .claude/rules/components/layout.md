---
paths:
  - "components/Layout/**"
---

# Composants Layout

## DuDrawer

**Fichiers :** `components/Layout/du-drawer/du-drawer.vue` | `.types.ts` | `.stories.ts`

> **Composant complexe** : Gestion responsive et overlay. Lire le source complet avant modification.

**Props :**
- `id?`: string
- `position?`: `'start'` | `'end'`
- `open?`: boolean
- `responsive?`: boolean
- `alwaysOpenOnLarge?`: boolean
- `modelValue?`: boolean (v-model)
- `sidebarClass?`: string
- `contentClass?`: string
- `overlayClass?`: string
- `items?`: DRAWERItem[]

**Types :**
```typescript
import { type MenuItem } from '../../Navigation/du-menu/du-menu.types'

export interface DRAWERItem extends MenuItem {
  icon?: any
  customClass?: string
  [key: string]: any
}
```

**Note :** DRAWERItem étend MenuItem de DuMenu. Toute modification de MenuItem impacte aussi DuDrawer.

---

## DuJoin

**Fichiers :** `components/Layout/du-join/du-join.vue` | `.types.ts` | `.stories.ts`

Groupe d'éléments joints sans espacement (boutons groupés, input + bouton, etc.)

**Props :**
- `as?`: string - Type d'élément HTML conteneur
- `direction?`: `'horizontal'` | `'vertical'`

**Usage :** Les enfants doivent avoir la classe `join-item` pour être correctement joints.
