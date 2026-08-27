# Plan de refacto global — Cornet-UI hors DuSelect/DuSearch

> **Document autoporteur**, exécutable dans une nouvelle conversation sans contexte. Il couvre les Phases 2 à 5 de `ROADMAP.md` : le socle transversal, la migration des widgets interactifs sur les primitives `core/`, et la passe d'hygiène. La refonte DuSelect/DuSearch (Phase 1) est **faite** : le moteur combobox existe, en code Cornet original (aucune dépendance ni code tiers), et sert de point de départ à ce plan.
>
> **État du moteur au démarrage de la Phase 2** — `components/DataInput/core/combobox/`, 4 fichiers :
> `useCombobox.ts` (la machine à états entière, en **une closure unique** de ~840 lignes : sélection, filtrage, entrée créable, surlignage, clavier, cycle du popup, commit à la fermeture, focus, positionnement par ancrage CSS, prop bags ARIA, validation), `dom.ts` (helpers DOM purs), `types.ts`, `index.ts`. **103 tests** (`core-combobox.spec.ts` + `core-combobox-dom.spec.ts`), sur 420 dans la lib.
>
> `PLAN-REFONTE-COMBOBOX.md` décrit une approche par *vendoring* d'une lib tierce qui a été **abandonnée en cours de route** au profit d'une réimplémentation native : il est conservé comme archive et ne doit plus servir de référence.
>
> Breaking changes assumés (beta). Chaque section « Composant » est conçue comme une PR autonome.

---

## 1. État des lieux (constaté sur la branche `lib`)

### 1.1 Inventaire par catégorie

| Catégorie | Composants | Verdict |
|---|---|---|
| **Popups / overlays** | du-dropdown, du-menu, du-tooltip, du-modal, du-drawer, du-toast | Refonte sur primitives `core/` (§4) |
| **Sélection & valeur** | du-tabs, du-accordion, du-collapse, du-filter, du-rating, du-range, du-pagination | Refonte ciblée (§5) |
| **Data display riches** | du-table, du-carousel, du-chat, du-timeline, du-list, du-diff | Améliorations ciblées (§6) |
| **Présentationnels** | du-button, du-badge, du-card, du-avatar, du-stat(s), du-status, du-kbd, du-loading, du-skeleton, du-progress, du-radial-progress, du-alert, du-countdown, du-swap, du-fab, du-breadcrumbs, du-link, du-navbar, du-dock, du-steps, du-step-item, du-join | Hygiène seulement (§7) |
| **Form plumbing** | du-checkbox, du-radio, du-input-field, du-text-area, du-file-input, du-fieldset, du-label, du-label-input-validator | Hygiène + cohérence validation (§7.3) |

### 1.2 Problèmes transversaux constatés

| # | Problème | Localisation | Correction |
|---|---|---|---|
| T1 | `Math.random()` pour générer ids/names → mismatch d'hydratation SSR | du-filter, du-rating, du-accordion, du-collapse, du-drawer (`useDrawerClasses`) | `useId()` partout (§3.2) |
| T2 | 14 `any` en code de production, tous dans des `.types.ts` : du-stat (3), du-fab (3), du-tabs (2), du-dock (2), du-drawer (2), du-table (1), du-radial-progress (1, dans le `.vue`). **Le vrai sujet est ailleurs** : plusieurs composants font transiter des données utilisateur vers des slots sans être génériques | ⚠️ une version antérieure de ce tableau annonçait « ~60 `any` » avec un classement par composant : ces chiffres comptaient les `.stories.ts` (`render: (args: any)`, signature Storybook), pas le code livré | Passe de typage + génériques (§3.3) |
| T3 | État "ouvert" stylé par classes DaisyUI pilotées par props, sans état JS ni dismiss | du-dropdown (`dropdown-open`, tout-CSS), du-tooltip (`tooltip-open`) | Primitives `core/popover` (§4) |
| T4 | Aucune gestion clavier/dismiss propre en dehors du combobox : chaque composant réinvente ou omet | du-menu (`useMenuKeyboardNav` local), du-drawer (`useDrawerDismiss` local), du-dropdown (rien), du-tooltip (rien) | Primitives partagées (§2) |
| T5 | Patterns DaisyUI à base d'inputs radio/checkbox cachés utilisés comme mécanique d'état, avec sémantique ARIA incorrecte ou absente | du-accordion (radios), du-collapse (checkbox), du-tabs (radios — cas limite, voir §5.1), du-filter (radios via DuButton) | Boutons + `aria-expanded`/pattern APG (§5) |
| T6 | Emits sans v-model là où un v-model est attendu | du-filter (`change` seul), du-accordion/du-collapse (pas de contrôle de l'état ouvert), du-dropdown (`open` prop sans `update:open`) | v-model systématique (§4, §5) |
| T7 | `aria-*` absent de composants qui en nécessitent | du-carousel, du-accordion, du-collapse, du-swap, du-toast (pas d'`aria-live`), du-diff | §4–§6 |
| T8 | Le mécanisme Tailwind-scanner (constantes `*_SIZES`/`*_VARIANTS` exportées des `.types.ts`) est **déjà couvert** par `tests/class-literals-invariant.spec.ts`, qui exige, pour chaque appel `useSizeMapping`/`useVariantMapping`, que les littéraux correspondants soient atteignables dans le dossier du composant ou d'une dépendance | Reste à documenter la règle et à ajouter un build de contrôle « embedded » | §3.5 |
| T9 | Classes de taille figées dans des composants eux-mêmes dimensionnés : un contrôle imbriqué garde sa taille quelle que soit celle du parent | `du-modal` (`btn-sm` du bouton de fermeture), `du-alert` (`btn-sm` du bouton dismiss) — corrigé dans DuSelect/DuSearch en Phase 1 | Généraliser `nestedSize` (§3.6) |

### 1.3 Acquis à préserver

- `tests/` contient 28 specs / 420 tests (alert, breadcrumbs, card, chat, checkbox, countdown, dock, drawer, dropdown, fab, fieldset, filter, menu, modal, pagination, rating, stats, tabs, timeline, composables, class-literals-invariant, plugin-vite, + `core-combobox`, `core-combobox-dom`, `du-select`, `du-search` issus de la Phase 1). **Ils servent de filet : chaque refonte commence par les lire et les étendre, jamais par les supprimer.**
- **Le patron livré par la Phase 1 est la référence des Phases 2+** : façade générique (`generic="O = any, V = any"`), zéro état local d'ouverture/surlignage, prop bags ARIA `v-bind`és, `useId()`, validation par `errorMessages` + slot `error` avec timing « touched », état stylé par `data-highlighted`/`aria-selected`. Les nouvelles façades s'y conforment plutôt que d'inventer.
- `composables/useSizeProps.ts` expose désormais **`nestedSize(size)`** (un cran en dessous, `default` compté comme `md`) : c'est l'utilitaire à réutiliser pour T9, pas un nouveau mécanisme.
- `du-modal` utilise déjà `<dialog>.showModal()` — bonne base native, à consolider, pas à remplacer.
- `du-tabs` s'appuie sur le pattern radio-group DaisyUI qui donne la navigation flèches native — le remplacement (§5.1) doit être un gain net, pas un recul.
- `composables/useSizeProps` et `useVariantProps` (mappings size/variant) sont sains : les conserver tels quels.
- `du-drawer` a déjà `useDrawerDismiss`/`useDrawerOpenState` : la migration est un remplacement d'implémentation, pas d'API.
- Un plugin Vite maison existe (`plugin-vite.spec.ts`) : vérifier son rôle avant tout renommage de fichiers/exports.

---

## 2. Phase 2.a — Extraction des primitives `core/`

**Prérequis : Phase 1 terminée — c'est le cas** (moteur combobox vert, 103 tests).

⚠️ **La nature du travail a changé depuis la rédaction initiale.** Le moteur n'est pas découpé en modules génériques qu'il suffirait de remonter d'un cran : c'est **une closure unique** (`useCombobox.ts`), un choix assumé — les fonctionnalités y sont fortement couplées (sélectionner ferme le popup, fermer commit la query en attente, taper re-surligne, Tab doit connaître la frontière du widget) et un scope partagé rend ce câblage direct.

L'extraction est donc un **découpage**, pas un déplacement : plus coûteux et plus risqué que ce que le plan annonçait. Deux règles pour le contenir :

- **Extraire à la demande, jamais par anticipation.** Une primitive ne sort du moteur que lorsqu'un deuxième consommateur réel existe (DuDropdown pour `popover`, DuModal/DuDrawer pour `focus`, DuMenu/DuTabs pour `navigation`). Sortir les sept modules « au cas où » recréerait le câblage indirect qu'on vient d'éliminer.
- **Les 103 tests du moteur sont le filet** : aucun ne doit changer d'assertion. S'ils cassent, c'est l'extraction qui est mauvaise, pas eux.

### 2.1 Arborescence cible

**Point de départ réel** — `components/DataInput/core/combobox/` : `useCombobox.ts`, `dom.ts` (`isTextField`, `focusableInDocument`, `hasEditableText`, `revealInContainer`), `types.ts`, `index.ts`.

**Cible** (atteinte progressivement, module par module, à mesure que les consommateurs arrivent) :

```
components/core/                 # ← déplacement depuis DataInput/core (§2.0)
├── combobox/            # moteur Phase 1, allégé de ce qui a été extrait
├── popover/
│   └── usePopoverState.ts    # open/close/toggle, callbacks onOpen/onClose,
│                             # click-outside (listeners montés SEULEMENT quand ouvert),
│                             # closeOnClickOutside, clickOutsideFilter, Escape,
│                             # support Popover API (showPopover/hidePopover, top-layer)
├── positioning/
│   └── useAnchorPosition.ts  # CSS anchor positioning, popupStyle
├── focus/
│   ├── useFocusReturn.ts     # mémorise l'élément focus avant ouverture, restaure au close
│   ├── useFocusTrap.ts       # NOUVEAU (pas dans le moteur) : piège Tab/Shift+Tab
│   │                         # dans un conteneur — requis par modal/drawer
│   └── dom.ts                # celui du moteur, remonté tel quel
├── navigation/
│   └── useRovingIndex.ts     # généralisation du clavier du moteur : index actif, flèches
│                             # (orientation h/v/both), wrap, skip des items disabled,
│                             # Home/End, typeahead par premières lettres (NOUVEAU, requis
│                             # par menu), activation Enter/Space
└── shared/
    ├── useControllableState.ts  # NOUVEAU : prop contrôlée OU état interne + emit
    │                            # (pattern `open` + `update:open` généralisé)
    └── ids.ts                   # wrapper useId + sanitation (`:` → `-`)
```

Écarts à connaître entre ce que le moteur fournit et ce que la cible décrit :

- `dom.ts` **existe déjà** et se remonte sans découpage — c'est l'extraction la moins chère, à faire en premier.
- `alignSelected` / `alignmentOffset` (aligner le popup sur l'option sélectionnée) et `clickOutsideFilter` ont été **retirés** du moteur faute de consommateur. `useAnchorPosition` et `usePopoverState` ne les réintroduisent que si DuDropdown/DuTooltip en ont besoin — pas avant.
- Le pendant de `focusNextOutside` n'est pas un utilitaire : c'est `focusPastList`, interne à la closure et dépendant du ref de liste. Sa généralisation (« focus le prochain tabbable hors de ce conteneur ») est un vrai petit travail de conception, pas un copier-coller.

Règles :

- [ ] `core/` n'importe **rien** de DaisyUI/Tailwind ni des façades. Dépendances : Vue uniquement.
- [ ] Chaque module extrait a son fichier de tests dédié (`tests/core-popover.spec.ts`, etc.), en plus des tests combobox qui le couvrent indirectement.
- [ ] `useFocusTrap` : implémentation minimale maison (listage des focusables visibles via `dom.ts`, wrap Tab), ~80 lignes + tests. Pas de dépendance externe.
- [ ] `useControllableState(propRef, emit, internalDefault)` : si la prop est fournie (non `undefined`), mode contrôlé (l'état suit la prop, les mutations émettent seulement) ; sinon état interne. C'est le contrat de tous les `open`/`modelValue` de la suite du plan.

### 2.0 Deux corrections préalables (avant toute extraction)

- [ ] **Déplacer le moteur** : `git mv components/DataInput/core components/core`. Le chemin actuel devient un contresens dès que DuDropdown ou DuModal en consomment. Met à jour 2 imports de façade et 3 imports de tests. `core/` n'étant pas exporté depuis `index.ts`, le plugin Vite n'est pas censé le voir — le confirmer par `plugin-vite.spec.ts` et un `npm run build`.
- [ ] **Écouteurs document attachés à l'ouverture** dans `useCombobox.ts` : aujourd'hui `mousedown` et `keydown` sont posés sur `document` dans `onMounted` et sortent immédiatement si le popup est fermé. Passer à un `watch(isOpen)` qui attache à l'ouverture et retire à la fermeture (`onUnmounted` gardé en filet). Sur une page à 50 selects : 0 écouteur au repos au lieu de 100. C'est la règle que §10.3 énonce déjà et que le moteur ne respecte pas encore ; `usePopoverState` en hérite ensuite. Les tests de clic-extérieur et d'Escape (`core-combobox.spec.ts`, « popup lifecycle ») couvrent les deux chemins et doivent rester verts sans modification.

### 2.2 Définition de done de la phase

- [ ] §2.0 fait : moteur à `components/core/`, écouteurs document attachés à l'ouverture.
- [ ] Primitives extraites **uniquement pour les consommateurs de G3–G5** (popover, positioning, focus, shared) ; `useRovingIndex` peut attendre G6 si Menu ne le réclame pas avant.
- [ ] Moteur combobox reposant sur les primitives extraites, **ses 103 tests verts sans modification des assertions**.
- [ ] Tests dédiés des primitives (~40 tests : popover open/close/outside/escape/popover-API, roving index avec wrap/skip/typeahead, focus trap, focus return, controllable state).
- [ ] Doc courte par primitive dans `docs/architecture.md` (contrat, exemple d'usage).

## 3. Phase 2.b — Standards transversaux outillés

### 3.1 `docs/architecture.md`

- [ ] Rédiger le document de conventions : structure de dossier d'un composant (`du-x.vue`, `du-x.types.ts`, `du-x.stories.ts`, `composables/` locaux interdits pour la logique popup/focus/clavier → primitives `core/`), nommage (props booléens sans préfixe `is`, emits `update:x` pour tout état contrôlable, slots kebab-case avec scope typé), typage (générique dès que des données traversent, `defineSlots` typé, zéro `any`), ARIA (référencer le pattern APG visé en commentaire de tête de template), data-attributes pour l'état (`data-open`, `data-highlighted`, `data-active`), règle Tailwind-scanner (T8), barre de tests.

### 3.2 useId partout (T1)

- [ ] Remplacer `Math.random()` dans les **5 occurrences restantes** (vérifié) : `du-accordion.vue` l. 17, `du-collapse.vue` l. 15, `du-filter.vue` l. 19, `du-rating.vue` l. 30, `du-drawer/composables/useDrawerClasses.ts` l. 18. Utiliser `core/shared/ids.ts`. DuSelect/DuSearch sont déjà passés à `useId()` en Phase 1.
- [ ] Attention aux `provide` : du-filter fournit **la string, pas la ref** (commentaire existant dans le code : DuButton lit via `inject` sans unwrap). Conserver ce contrat en passant `useId()` résolu.
- [ ] Test SSR simple : monter deux instances du même composant, vérifier l'absence de collision d'ids et le déterminisme (pas de random).

### 3.3 Passe de typage (T2)

La dette est bien plus faible qu'annoncé initialement, mais elle est mal mesurée par un compte d'`any` : ce qui manque surtout, ce sont les **génériques**.

- [ ] **Les 14 `any` de production**, tous dans des `.types.ts` sauf un : du-stat (3), du-fab (3), du-tabs (2), du-dock (2), du-drawer (2), du-table (1), du-radial-progress (1, dans le `.vue`). Quelques heures de travail : ce sont des props d'items → interfaces dédiées exportées des `.types.ts`.
- [ ] **Le vrai chantier** : rendre génériques les composants dont les données utilisateur traversent des slots — du-table (`Row`), du-timeline, du-list, du-menu, du-chat — sur le modèle des façades de Phase 1 (`generic="O = any, V = any"` + `defineSlots` typé). Aucun compte d'`any` ne le signale, d'où l'oubli facile.
- [ ] Activer `@typescript-eslint/no-explicit-any` en `error` sur `components/` **une fois les deux points ci-dessus faits**, avec `// eslint-disable-next-line` justifiés pour les rares survivants. La règle est aujourd'hui `off` dans `eslint.config.js`, sous un commentaire (« DuSelect, DuSearch, DuTable accept arbitrary user data ») devenu **faux pour DuSelect et DuSearch**, désormais génériques : le réécrire en même temps.
- [ ] Exclure les `.stories.ts` de la règle : `render: (args: any)` fait partie de la signature Storybook — c'est la confusion qui avait gonflé T2 à « ~60 ».
- [ ] `strict: true` (dont `strictNullChecks`) vérifié dans le tsconfig de build lib ; typecheck bloquant en CI.

### 3.4 Lint & CI a11y

- [ ] Ajouter `eslint-plugin-vuejs-accessibility` (config recommended, dérogations justifiées au cas par cas).
- [ ] Job CI : axe-core exécuté sur chaque story (via test-runner Storybook ou vitest + axe sur les montages des specs). Seuil : zéro violation `serious`/`critical`.

### 3.5 Invariant Tailwind-scanner (T8)

**Déjà couvert** : `tests/class-literals-invariant.spec.ts` exige, pour chaque appel `useSizeMapping`/`useVariantMapping(props, 'X')`, que `X-xs`…`X-xl` soient atteignables dans le dossier du composant ou d'une dépendance directe. Éprouvé en Phase 1 : c'est lui qui a imposé les constantes `badge-*`/`btn-*`/`checkbox-*` ajoutées pour les tailles imbriquées (T9).

Restent :

- [ ] Documenter la règle dans `docs/architecture.md` (le test la fait respecter, il ne l'explique pas).
- [ ] Build de contrôle « embedded » : une app témoin qui importe un seul composant, build, et diff des classes générées vs classes utilisées.

### 3.6 Tailles imbriquées (T9)

- [ ] Utiliser `nestedSize()` de `composables/useSizeProps.ts` pour les contrôles rendus **à l'intérieur** d'un composant dimensionné, au lieu d'une classe figée : `du-modal` (bouton de fermeture `btn-sm`), `du-alert` (bouton dismiss `btn-sm`). Le patron est dans DuSelect/DuSearch : `reactive({ get size() { return nestedSize(props.size) } })` passé à `useSizeMapping`, ce qui déclenche aussi l'invariant scanner et force les constantes correspondantes.
- [ ] Auditer les autres composants au moment de leur passe d'hygiène (§7) : toute classe DaisyUI suffixée en dur dans un composant qui expose `size` est suspecte.

---

## 4. Phase 3 — Widgets popup sur primitives `core/`

Ordre choisi pour maximiser la réutilisation : dropdown → menu (dépend du dropdown pour le pattern menu-button) → tooltip → modal → drawer → toast.

### 4.1 DuDropdown

**État actuel** : purement CSS (classes `dropdown`, `dropdown-open`, `dropdown-hover`, placement par classes), prop `open` sans emit, `provide('isDropdownTrigger')`, aucun dismiss ni clavier ; le commentaire du template promet des `triggerProps` qui n'existent pas.

**Cible** :
- [ ] État via `useControllableState` : prop `open?: boolean` + emit `update:open` + emits `open`/`close`. Défaut : non contrôlé, toggle au clic du trigger.
- [ ] `core/popover` : click-outside (`closeOnClickOutside` défaut `true`, et `clickOutsideFilter` — **à réintroduire ici**, il a été retiré du moteur faute de consommateur), Escape ferme + rend le focus au trigger (`useFocusReturn`).
- [ ] Slots : `trigger` (scope `{ open, toggle, triggerProps }` — **fournir enfin les `triggerProps` promis** : `aria-expanded`, `aria-haspopup`, `aria-controls`, `onClick`, `onKeydown` ArrowDown ouvre) et défaut (contenu, scope `{ open, close }`).
- [ ] Prop `hover` conservée (délai d'ouverture/fermeture ~100 ms géré en JS, plus par CSS seul, pour que l'état JS et le visuel restent synchrones) ; `hover` implique aussi ouverture au focus clavier.
- [ ] Prop `popover?: boolean` : rendu top-layer via Popover API + `useAnchorPosition` (sinon classes de placement DaisyUI actuelles conservées — mapper la prop `placement` existante, dont la forme string/array/objet est conservée telle quelle).
- [ ] Contenu : `tabindex` non forcé ; Tab depuis le contenu sort et ferme (comportement `focusNextOutside` si `popover`, natif sinon).
- [ ] Tests (~15) : contrôlé/non contrôlé, outside/Escape/focus return, hover + focus, aria du trigger, placement classes, popover mode (mocks Popover API).
- [ ] Stories : cas dans un conteneur `overflow: hidden` (démo `popover`).

### 4.2 DuMenu

**État actuel** : rendu `menu` DaisyUI (ul/li), `useMenuKeyboardNav` local, emits `itemClick`/`subItemClick`, items typés `DuMenuItemData`, sous-menus via `du-menu-item.vue`.

**Cible** :
- [ ] Décision de sémantique **explicite via prop `role`** : `'menu'` (pattern APG menu : `role="menu"`/`menuitem`, roving tabindex, typeahead) ou `'nav'` (défaut : liste de liens de navigation, PAS de rôle menu — c'est l'usage sidebar). L'erreur classique à éviter : mettre `role="menu"` sur de la navigation.
- [ ] En mode `'menu'` : remplacer `useMenuKeyboardNav` par `core/navigation/useRovingIndex` (flèches selon `direction`, Home/End, typeahead premières lettres, skip `disabled`), items `role="menuitem"` `tabindex` géré, sous-menus `aria-haspopup="menu"` + `aria-expanded`, ouverture ArrowRight/fermeture ArrowLeft.
- [ ] Ajouter `disabled` par item (nouveau concept, aligné combobox : clé `disabled` sur l'objet).
- [ ] Intégration menu-button : story + doc du combo `DuDropdown(trigger) + DuMenu(role="menu")` — le dropdown passe `aria-haspopup="menu"`, ArrowDown ouvre et focus le premier item, Escape referme et rend le focus.
- [ ] Emits : conserver `itemClick`/`subItemClick` ; supprimer les callbacks props `onItemClick`/`onSubItemClick` (doublon emit/prop — breaking assumé).
- [ ] Tests (~15) et mise à jour des specs existantes (`du-menu.spec.ts`).

### 4.3 DuTooltip

**État actuel** : classes DaisyUI (`tooltip`, `data-tip`, `tooltip-open`, positions), contenu riche via slot, aucun ARIA, aucun déclencheur clavier.

**Cible** :
- [ ] `aria-describedby` : id (`useId`) sur le contenu du tooltip, référencé par l'élément déclencheur (slot par défaut = déclencheur ; slot `content` = contenu riche, sinon `dataTip`).
- [ ] Déclenchement : hover **et** focus-visible ; fermeture au blur/mouseleave et sur **Escape** (exigence WCAG 1.4.13 « dismissable ») ; props `openDelay`/`closeDelay` (défauts 300/100 ms). Le contenu reste survolable (« hoverable » WCAG) : ne pas fermer quand la souris passe du trigger au tooltip.
- [ ] Prop `open` contrôlable via `useControllableState` (mode manuel conservé).
- [ ] Option `popover` (top-layer + `useAnchorPosition`) pour sortir des `overflow: hidden` — cas fréquent des tooltips dans des cards/tables.
- [ ] Le tooltip reste non focusable et purement descriptif : ne jamais y mettre de contenu interactif (documenter ; si besoin interactif → DuDropdown).
- [ ] Typage : purger les 8 `any`.
- [ ] Tests (~10) : describedby, hover, focus clavier, Escape, delays (fake timers), hoverable.

### 4.4 DuModal

**État actuel** : `<dialog>` natif + `showModal`/`close`, prop `open` + `update:open`, `closeOnEscape`/`closeBackdrop`, placements DaisyUI, `defineExpose({ showModal, closeModal })`. Base saine.

**Cible (consolidation, pas refonte)** :
- [ ] Synchroniser l'état sur l'événement natif `close` du `<dialog>` (Escape natif, `form method="dialog"`) → emit `update:open` fiable dans tous les chemins de fermeture ; emits `open`/`close` ajoutés.
- [ ] `useFocusReturn` : rendre le focus à l'élément déclencheur au close (le natif le fait pour showModal dans la plupart des cas — tester, ne câbler la primitive que si nécessaire, notamment quand l'ouverture vient d'un changement de prop).
- [ ] Prop `initialFocus?: string | HTMLElement` (sélecteur CSS ou élément) appliquée à l'ouverture ; défaut : comportement natif (`autofocus` sinon premier focusable).
- [ ] `aria-labelledby` automatique : si slot `title` présent, id généré et câblé ; sinon exiger `ariaLabel` (warning dev si aucun des deux).
- [ ] `closeBackdrop` : vérifier l'implémentation clic-sur-backdrop (clic sur `::backdrop` = clic sur le dialog lui-même hors box — tester la géométrie plutôt que `target === dialog` si la box remplit le dialog).
- [ ] Pas de focus trap maison : `showModal()` + top-layer + inert natif suffisent. Documenter que le mode non-modal (`show()`) n'est pas supporté.
- [ ] Tests : étendre `du-modal.spec.ts` (fermetures natives synchronisées, labelledby, initialFocus, focus return).

### 4.5 DuDrawer

**État actuel** : composables locaux `useDrawerClasses` (contient un `Math.random`), `useDrawerDismiss`, `useDrawerOpenState` ; pattern DaisyUI checkbox/overlay.

**Cible** :
- [ ] `useDrawerOpenState` → `useControllableState` ; `useDrawerDismiss` → `core/popover` (outside + Escape) ; `Math.random` → `useId` (§3.2). API publique inchangée autant que possible (`open`/`update:open` s'ils existent, sinon les introduire).
- [ ] Mode overlay (mobile) : `useFocusTrap` sur le panneau + `useFocusReturn` au close + `aria-modal="true"` `role="dialog"` sur le panneau + fond `inert` (attribut sur le contenu principal pendant l'ouverture — prop `inertTarget?: string` sélecteur, défaut : sibling contenu du drawer).
- [ ] Mode latéral persistant (desktop) : aucun trap, `role` néant — la prop existante qui distingue les modes pilote tout ça.
- [ ] Tests : étendre `du-drawer.spec.ts` (trap actif seulement en overlay, Escape, focus return, ids déterministes).

### 4.6 DuToast

**État actuel** : conteneur de positionnement CSS pur (`toast-*`), prop `to` (téléport ?), aucun `aria-live`, pas de gestion de file/durée.

**Cible** :
- [ ] Conteneur : `role="status"` + `aria-live="polite"` par défaut ; variante `assertive` pour les erreurs (prop `politeness` par toast, le conteneur agrège — pattern : deux régions live, une polite une assertive).
- [ ] Introduire une gestion d'affichage : composable public `useToasts()` (état module-scope : `push({ title, message, variant, duration, politeness })`, `dismiss(id)`) + `<DuToast>` qui rend la file. Durée par défaut 5000 ms, `duration: 0` = persistant, **pause des timers au hover et au focus-within** (WCAG 2.2.1).
- [ ] Chaque toast : bouton de fermeture accessible (`aria-label` paramétrable), animations d'entrée/sortie respectant `prefers-reduced-motion`.
- [ ] Rétrocompat markup : le mode « slot manuel » actuel (toasts posés en enfants) reste supporté ; `useToasts` est additif.
- [ ] Tests (~12) : live regions, file, durées (fake timers), pause hover/focus, dismiss.

## 5. Phase 4 — Widgets sélection & valeur

### 5.1 DuTabs

**État actuel** : pattern radio-group DaisyUI (`<label><input type="radio"></label>`), flèches natives entre radios, `modelValue` = index, `name` défaut `"my_tabs"` (collision si deux instances !), items ou slot.

**Cible** — passage au pattern APG tabs :
- [ ] Markup : `role="tablist"` (avec `aria-label`), boutons `role="tab"` `aria-selected` `aria-controls`, panneaux `role="tabpanel"` `aria-labelledby` `tabindex="0"`. Ids via `useId` (règle également le défaut `name` collisif, qui disparaît).
- [ ] Clavier : `useRovingIndex` (flèches selon orientation, Home/End) ; prop `activation: 'automatic' | 'manual'` (défaut `automatic` : le focus sélectionne, comme les radios actuels — pas de régression UX).
- [ ] `modelValue` : passer de l'index à une **valeur stable** `item.value` (fallback : index si non fournie). Breaking assumé, documenté.
- [ ] Panneaux : slot `panel` scopé par item + rendu associé (aujourd'hui les tabs n'affichent pas de contenu ? vérifier le mode `type="lift"` avec contenu — si les panneaux n'existaient pas, les ajouter en option sans les rendre obligatoires).
- [ ] Prop `disabled` par item (skip clavier via la primitive).
- [ ] Styles : conserver `tabs-lift/border/box` et sizes ; l'état sélectionné passe de `:checked` CSS à `aria-selected` (`.aria-selected:tab-active` ou classe conditionnelle) — vérifier le rendu DaisyUI qui cible `input:checked` : ajouter la classe `tab-active` conditionnelle.
- [ ] Tests : réécrire `du-tabs.spec.ts` (rôles, roving, activation manuel/auto, v-model par valeur, disabled).

### 5.2 DuAccordion / DuCollapse

**État actuel** : accordion = `<input type="radio">` cachés + `Math.random` name, titre non focusable (`div.collapse-title`), pas d'ARIA ; collapse = idem en checkbox.

**Cible** :
- [ ] Markup : le titre devient un `<button>` avec `aria-expanded` + `aria-controls`, région de contenu avec `id` + `role="region"` + `aria-labelledby`. Clavier natif (bouton) suffisant — pas de roving requis par l'APG (Tab entre les en-têtes).
- [ ] État : `v-model` — DuCollapse : `open: boolean` (`update:open`) ; DuAccordion : `modelValue: string | string[] | null` (valeurs d'items ouverts), prop `multiple` (défaut `false` = comportement radio actuel), prop `collapsible` (autoriser tout-fermé en single ; défaut `true`).
- [ ] `useControllableState` pour les deux ; suppression totale des inputs radio/checkbox et du `name`.
- [ ] Styles : DaisyUI `collapse-open`/`collapse-close` pilotés par l'état JS (classes conditionnelles), `collapse-arrow`/`collapse-plus` conservés.
- [ ] Slots conservés (`title`, `title-${index}`, contenu) ; scope enrichi `{ open, toggle }`.
- [ ] Animation : DaisyUI anime via grid-rows — vérifier que ça survit au passage classes-pilotées ; sinon transition height maison avec `prefers-reduced-motion`.
- [ ] Tests (~12 par composant) : v-model single/multiple/collapsible, aria, clavier bouton, deux instances sans collision d'ids.

### 5.3 DuFilter

**État actuel** : boutons radio via DuButton, `provide('filterName', string)` avec `Math.random`, emit `change` sans v-model, bouton reset `×` en dur, 4 `any`.

**Cible** :
- [ ] Générique `O` sur les items ; `modelValue?: O | null` + `update:modelValue` (le `change` reste, aligné). `useId` (§3.2, en respectant le contrat provide-string documenté dans le code).
- [ ] Markup : envelopper dans `<fieldset>` + `<legend>` (prop `legend`, sr-only par défaut) — c'est un radio-group de filtrage, la sémantique radio DaisyUI est ici correcte et conservée.
- [ ] Bouton reset : `aria-label` paramétrable (`resetLabel`, défaut 'Reset filters'), affichage conditionnel (masqué si rien de sélectionné — prop `alwaysShowReset` pour l'ancien comportement).
- [ ] Tests : étendre `du-filter.spec.ts`.

### 5.4 DuRating

**Cible** : conserver le pattern radio-group DaisyUI (correct pour un rating) mais : `useId` pour `name` (§3.2) ; chaque input avec `aria-label` « n sur max » (props `itemLabel: (n, max) => string` pour i18n) ; prop `readonly` (rend des éléments non-input) ; vérifier le clavier natif radios (flèches OK) ; `modelValue` number strict, demi-valeurs si `half` ; purger les `any` ; étendre `du-rating.spec.ts`.

### 5.5 DuRange

**Cible** : input range natif conservé ; ajouter `aria-valuetext` (prop `valueText: (v) => string`, ex. unités) ; `list`/ticks accessibles ; vérifier `aria-label`/labelledby ; option double curseur **hors scope** (noter comme feature future, nécessiterait `core/` dédié) ; tests.

### 5.6 DuPagination

**Cible** : `<nav aria-label>` autour, `aria-current="page"` sur la page active, boutons prev/next avec labels i18n (`prevLabel`/`nextLabel`), `usePaginationPages` conservé (déjà testé) mais typé strict ; ellipses non focusables `aria-hidden` ; tests étendus.

## 6. Phase 5.a — Data display riches

### 6.1 DuTable
- [ ] Générique `Row` (colonnes typées `keyof Row` quand items structurés), purge des 4 `any`, slots scopés typés.
- [ ] Vérifier `<caption>`/`scope="col"` sur les th.
- [ ] Tri/sélection : **hors scope** — si demandé plus tard, créer `core/table` (ne pas bricoler dans la façade).

### 6.2 DuCarousel
- [ ] `role="region"` + `aria-roledescription="carousel"` + `aria-label` ; chaque slide `role="group"` + `aria-roledescription="slide"` + `aria-label` « i / n ».
- [ ] Boutons prev/next optionnels intégrés (aujourd'hui navigation par ancres/scroll ?) accessibles au clavier ; si autoplay ajouté un jour : bouton pause obligatoire (WCAG 2.2.2) — noter, hors scope.
- [ ] Tests de rôles.

### 6.3 DuChat / DuTimeline / DuList / DuDiff
- [ ] Typage générique des items (purge des `any` restants), slots scopés typés, stories complètes. DuDiff : vérifier que le slider de comparaison est atteignable clavier (`tabindex`, flèches) — sinon le câbler sur l'input range sous-jacent DaisyUI. Pas d'autre changement structurel.

## 7. Phase 5.b — Hygiène des présentationnels & form plumbing

### 7.1 Passe standard (tous les composants de la catégorie « présentationnels »)
Checklist par composant (une PR peut en grouper plusieurs) :
- [ ] Zéro `any` ; props/emits/slots conformes aux conventions de `docs/architecture.md` ; `defineSlots` typé si slots scopés.
- [ ] Attributs ARIA élémentaires quand pertinent : du-progress/du-radial-progress (`role="progressbar"` + `aria-valuenow/min/max` — vérifier), du-countdown (`role="timer"`), du-status (`role="status"` optionnel + texte sr-only), du-swap (si interactif : bouton + `aria-pressed`), du-steps (`aria-current="step"`), du-breadcrumbs (`<nav aria-label>` + `aria-current="page"` — vérifier l'existant), du-loading/du-skeleton (`aria-hidden` par défaut + prop `label` sr-only).
- [ ] Stories couvrant toutes les variantes ; constantes scanner à jour (T8).

### 7.2 du-dock (9 `any`, le plus chargé)
- [ ] Typage des items, `aria-label` sur la nav, `aria-current` sur l'item actif, tests (spec existante à étendre).

### 7.3 Form plumbing — cohérence de validation
- [ ] Inventorier le contrat actuel de `du-label-input-validator` et `du-input-field` (7 `any`).
- [ ] Aligner sur le modèle de validation introduit par le combobox (Phase 1) : mêmes codes d'erreur/props (`required`, `errorMessages`), même slot `error`, même timing « touched au premier blur/close ». Objectif : un formulaire mixant DuInputField/DuSelect/DuSearch/DuTextArea a un rendu et une API d'erreurs uniformes.
- [ ] du-checkbox/du-radio : vérifier label câblé (for/id via `useId`), état `indeterminate` pour checkbox (prop), groupes radio dans fieldset/legend (doc).
- [ ] du-file-input : typage (5 `any`), emits typés `File[]`.

---

## 8. Stratégie de tests & CI (récapitulatif des exigences)

| Niveau | Contenu | Seuil |
|---|---|---|
| `core/` | Tests unitaires par primitive + tests combobox inchangés | ≥ 80 % lignes |
| Façades interactives (§4–§5) | Boîte noire : v-model contrôlé/non contrôlé, emits, clavier complet, snapshot des attributs ARIA, deux instances sans collision d'ids | tous les parcours du plan |
| Transversal | `class-literals-invariant` étendu, axe sur stories, typecheck strict, `no-explicit-any` | bloquant CI |
| SSR | Rendu déterministe (ids), pas d'accès `document` hors lifecycle client (audit : les primitives montent leurs listeners dans `onMounted`) | smoke test |

Mocks d'environnement à centraliser dans un setup vitest partagé : Popover API (`showPopover`/`hidePopover`/`:popover-open`), `scrollIntoView`, `HTMLDialogElement.showModal/close` (jsdom incomplet), `matchMedia` (reduced motion), fake timers pour tooltip/toast.

## 9. Ordonnancement et jalons

| Jalon | Contenu | Dépend de | Estimation |
|---|---|---|---|
| G1 | §2.0 (déplacement + écouteurs) puis §2 extraction à la demande + tests | Phase 1 finie ✅ | 4-5 j (revu à la hausse : découpage d'une closure, pas une remontée de modules) |
| G2 | §3 Standards (docs, useId, typage, lint, CI, tailles imbriquées) | — (parallélisable avec G1 sauf 3.2 qui veut `core/shared/ids`) | 2-3 j (revu à la baisse : la dette de typage était surévaluée) |
| G3 | §4.1–4.2 Dropdown + Menu | G1, G2 | 3 j |
| G4 | §4.3–4.4 Tooltip + Modal | G1 | 2-3 j |
| G5 | §4.5–4.6 Drawer + Toast | G1 | 2-3 j |
| G6 | §5.1–5.2 Tabs + Accordion/Collapse | G1, G2 | 3 j |
| G7 | §5.3–5.6 Filter, Rating, Range, Pagination | G2 | 2 j |
| G8 | §6 Data display | G2 | 2 j |
| G9 | §7 Hygiène + form plumbing | G2 (+ Phase 1 pour 7.3) | 3 j |
| G10 | §8 verrouillage CI, revue de cohérence finale | tout | 1-2 j |

Total ≈ **24-29 jours**, largement parallélisable : G3–G9 sont indépendants entre eux ; chaque composant est une PR autonome laissant la lib shippable. Prioriser G3 (dropdown/menu) : c'est le gain a11y le plus visible et la première validation des primitives hors combobox.

## 10. Points de vigilance globaux

1. **Ne jamais casser un pattern DaisyUI qui rend un service natif sans le remplacer par mieux** : les radios de du-tabs donnaient les flèches gratuites — la refonte APG doit les réimplémenter via `useRovingIndex` avant de supprimer les radios (§5.1). Idem l'animation grid de collapse (§5.2).
2. **`useControllableState` est le contrat unique** pour toute prop `open`/`modelValue` : pas de variantes locales, sinon la lib redevient incohérente en six mois.
3. **Les listeners document** (click-outside, Escape) ne sont montés que quand l'overlay est ouvert. À noter : le moteur combobox ne le fait **pas encore** — il les pose dans `onMounted` et sort si fermé ; c'est une des deux corrections préalables du §2.0, à faire avant que `usePopoverState` n'hérite du défaut.
4. **`role="menu"` est réservé aux vrais menus d'actions** (§4.2) — l'anti-pattern « role menu sur une sidebar de navigation » est explicitement interdit par `docs/architecture.md`.
5. **Chaque suppression de comportement est un item de changelog** : tout ce qui figure dans « État actuel » des sections §4–§7 doit se retrouver soit dans la cible, soit dans le changelog comme retrait volontaire.
6. **Vérifier le plugin Vite maison** avant tout renommage d'exports/chemins (il a ses propres tests — `plugin-vite.spec.ts` — qui peuvent dépendre de la structure des dossiers).
7. Les estimations supposent un développeur connaissant la codebase ; les jalons G3–G9 peuvent être livrés dans n'importe quel ordre après G1/G2 si les priorités produit changent.
