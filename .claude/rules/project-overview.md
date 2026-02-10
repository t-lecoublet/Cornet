# Vue d'ensemble du projet Cornet

## Architecture

```
lib/
├── index.ts                    # Exports principaux (composants + composables)
├── index.css                   # Styles globaux
├── plugin-vite.ts              # Plugin Vite pour l'intégration
├── package.json                # Dépendances (peerDependencies)
├── cornet-llm.txt              # Documentation complète des composants (legacy)
├── types/
│   └── index.ts                # Auto-généré : exports de tous les types
├── composables/
│   ├── useSizeProps.ts         # Mapping des tailles -> classes CSS
│   └── useVariantProps.ts      # Mapping des variantes -> classes CSS
├── components/
│   ├── Actions/                # 5 composants : boutons, modals, dropdowns
│   ├── DataDisplay/            # 18 composants : cartes, tables, badges, avatars
│   ├── DataInput/              # 13 composants : inputs, selects, checkboxes
│   ├── Feedback/               # 7 composants : alertes, loading, tooltips
│   ├── Layout/                 # 2 composants : drawer, join
│   └── Navigation/             # 10 composants : menus, pagination, tabs
└── build-scripts/              # Scripts de build et génération
```

## Composants par catégorie (55 total)

### Actions (5)
DuButton, DuDropdown, DuModal, DuSwap, DuFab

### DataDisplay (18)
DuAccordion, DuAvatar, DuBadge, DuCard, DuCarousel, DuCarouselItem, DuChat, DuCollapse, DuCountdown, DuCountdownGroup, DuDiff, DuKbd, DuList, DuStat, DuStats, DuStatus, DuTable, DuTimeline

### DataInput (13)
DuCheckbox, DuFieldset, DuFileInput, DuFilter, DuInputField, DuLabel, DuLabelInputValidator, DuRadio, DuRange, DuRating, DuSearch, DuSelect, DuTextArea

### Feedback (7)
DuAlert, DuLoading, DuProgress, DuRadialProgress, DuSkeleton, DuToast, DuTooltip

### Layout (2)
DuDrawer, DuJoin

### Navigation (10)
DuBreadcrumbs, DuButtonLink, DuDock, DuLink, DuMenu, DuNavbar, DuPagination, DuStepItem, DuSteps, DuTabs

## Dépendances clés (peerDependencies)

- `vue` >= 3.3.11
- `daisyui` >= 5.5.18
- `tailwindcss` >= 4.0.0
- `typescript` >= 5.8.3
- `vite` >= 6.4.1
- `@tailwindcss/vite` >= 4.1.18

## Exports du package

| Export | Fichier | Description |
|--------|---------|-------------|
| `.` | `index.ts` | Tous les composants et composables |
| `./plugin-vite` | `plugin-vite.ts` | Plugin Vite |
| `./css` | `index.css` | Styles |
| `./types` | `types/index.ts` | Tous les types TypeScript |

## Règles de contribution

- Ne jamais créer de fichier composant sans les 3 fichiers associés (.vue, .types.ts, .stories.ts)
- Toujours exporter le nouveau composant dans `index.ts`
- Les types doivent être dans le fichier `.types.ts`, pas dans le `.vue`
- Utiliser les composables `useSizeMapping` et `useVariantMapping` pour les props communes
- Respecter les conventions DaisyUI pour les noms de classes CSS
