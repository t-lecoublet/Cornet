# TODO - Documentation composants Cornet (v2)

## Objectif
Documenter TOUTES les props de chaque composant avec:
- [ ] Exemple pour chaque prop
- [ ] Exemples de cas d'utilisation avec `<template>` slots
- [ ] Correspondance avec les stories Storybook existantes

---

## Progression

### ✅ HAUTE PRIORITÉ - TERMINÉ
- `navigation/menu.ts` - props, slots, all directions, sizes, nested submenus, callbacks
- `navigation/navbar.ts` - slots (#start, #center, #end)
- `navigation/tabs.ts` - props, slots, manual mode, all styles, sizes, icons
- `navigation/steps.ts` - props, slots, manual mode, all directions, variants, responsive
- `navigation/pagination.ts` - props, slots, manual mode, all variants, outline, soft, sizes
- `data-display/table.ts` - props, slots (#cell-{key}, #header-{key}, #footer-{key})
- `data-display/timeline.ts` - props, slots, manual mode, modifiers
- `data-display/chat.ts` - props, slots (#image-{n}, #header-{n}, #message-{n}, #footer-{n})
- `data-display/carousel.ts` - props, dynamic items mode, center/start/end, vertical
- `data-display/accordion.ts` - props, slots, dynamic items, modifiers
- `data-display/collapse.ts` - props, slots, dynamic items, modifiers, open state
- `actions/dropdown.ts` - props, slots (#trigger, #content), all placements
- `actions/modal.ts` - props, slot #actions, closeButton, closeOnEscape, closeBackdrop
- `data-input/select.ts` - props, slots (#selected, #option, #tag, #no-options)
- `data-input/search.ts` - props, slots (#option, #add-option, #no-results)
- `data-input/rating.ts` - props, shape, color, halfStar, clearable, disabled, sizes
- `layout/drawer.ts` - props, slots (#sidebar, #content), items mode, iconOnly
- `feedback/alert.ts` - props, direction, soft/outline/dash, dismissible, autoDismissible, icon
- `feedback/tooltip.ts` - props, slot #content, responsive

### 🔄 En cours
-

### 📋 Priorité moyenne

#### DataDisplay
- [ ] `data-display/avatar.ts` - ring, mask, placeholder
- [ ] `data-display/card.ts` - slots #image/#actions
- [ ] `data-display/list.ts` - slots #start/#end
- [ ] `data-display/stat.ts` - slots
- [ ] `data-display/diff.ts` - aspectRatio
- [ ] `data-display/countdown.ts` - targetDate, autoStart

#### DataInput
- [ ] `data-input/input-field.ts` - suggestionList, validation
- [ ] `data-input/textarea.ts` - modelValue, ghost
- [ ] `data-input/file-input.ts` - ghost
- [ ] `data-input/filter.ts` - buttonsArgs

#### Actions
- [ ] `actions/button.ts` - as prop, href, type
- [ ] `actions/fab.ts` - slots manuels, mainAction

### 📋 Priorité basse (props simples déjà couvertes)
- `data-display/kbd.ts` ✓
- `data-display/skeleton.ts` ✓
- `data-display/badge.ts` ✓
- `data-display/status.ts` ✓
- `feedback/loading.ts` ✓
- `feedback/progress.ts` ✓
- `feedback/radial-progress.ts` ✓
- `feedback/toast.ts` ✓
- `data-input/checkbox.ts` ✓
- `data-input/radio.ts` ✓
- `data-input/range.ts` ✓
- `data-input/fieldset.ts` ✓
- `data-input/label.ts` ✓
- `data-input/label-input-validator.ts` ✓
- `navigation/breadcrumbs.ts` ✓
- `navigation/button-link.ts` ✓
- `navigation/dock.ts` ✓
- `navigation/link.ts` ✓
- `layout/join.ts` ✓

---

## Conventions de documentation

Pour chaque prop:
```typescript
{
  title: 'Nom de la prop',
  description: 'Description courte',
  preview: `<Composant prop="value">
    <template #slot>Contenu</template>
  </Composant>`,
  code: `<Composant prop="value">
    <template #slot>Contenu</template>
  </Composant>`,
}
```

Pour les slots complexes:
```typescript
{
  title: 'Utilisation du slot #nom',
  description: 'Quand utiliser ce slot',
  code: `<Composant>
    <template #nom="{ item, index }">
      <!-- Contenu avec destructuring -->
    </template>
  </Composant>`,
}
```