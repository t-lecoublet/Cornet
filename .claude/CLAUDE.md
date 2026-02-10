# Cornet - DaisyUI Vue Kit

Bibliothèque de composants Vue 3 basée sur DaisyUI 5 et Tailwind CSS 4.

## Documentation complète des composants

@cornet-llm.txt

## Conventions de nommage

- Tous les composants sont préfixés `Du` : DuButton, DuModal, DuSelect
- Types TypeScript en UPPERCASE : `{COMPONENT}Props`, `{COMPONENT}Size`, `{COMPONENT}Variant`
- Constantes de types en UPPERCASE : `BUTTON_SIZES`, `MODAL_PLACEMENTS`
- Fichiers : `du-{name}.vue`, `du-{name}.types.ts`, `du-{name}.stories.ts`

## Structure des fichiers composants

```
components/{Category}/du-{name}/
├── du-{name}.vue           # Composant Vue
├── du-{name}.types.ts      # Types TypeScript
└── du-{name}.stories.ts    # Stories Storybook
```

**Catégories :** Actions, DataDisplay, DataInput, Feedback, Layout, Navigation

## Props communes à la plupart des composants

- `size`: Size = `'default'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
- `variant`: Variant = `'default'` | `'neutral'` | `'primary'` | `'secondary'` | `'accent'` | `'info'` | `'success'` | `'warning'` | `'error'`
- `customClass`: string - Classes CSS personnalisées
- `disabled`: boolean - Désactivation du composant

## Avant toute modification de composant

1. Lire TOUJOURS le fichier source `.vue` complet
2. Vérifier le fichier `.types.ts` associé
3. Consulter les stories `.stories.ts` pour comprendre les cas d'usage
4. Modifier dans cet ordre : types -> composant -> stories

## Exports

- **Point d'entrée principal :** `index.ts` exporte tous les composants et composables
- **Types :** `types/index.ts` exporte tous les types (auto-généré)
- **CSS :** `index.css`
- **Plugin Vite :** `plugin-vite.ts`

## Stack technique

- Vue 3.3+ (Composition API, `<script setup>`)
- TypeScript 5.8+
- DaisyUI 5.5+
- Tailwind CSS 4+
- Vite 6+
