# Plan de refacto global — Cornet-UI hors DuSelect/DuSearch

> **Document autoporteur**, exécutable dans une nouvelle conversation sans contexte. Il couvre les Phases 2 à 5 de `ROADMAP.md` : le socle transversal, la migration des widgets interactifs sur les primitives `core/`, et la passe d'hygiène. La refonte DuSelect/DuSearch (Phase 1) est **faite** : le moteur combobox existe, en code Cornet original (aucune dépendance ni code tiers), et sert de point de départ à ce plan.
>
> **État du moteur au démarrage de la Phase 2** — `components/DataInput/core/combobox/`, 4 fichiers :
> `useCombobox.ts` (la machine à états entière, en **une closure unique** de ~840 lignes : sélection, filtrage, entrée créable, surlignage, clavier, cycle du popup, commit à la fermeture, focus, positionnement par ancrage CSS, prop bags ARIA, validation), `dom.ts` (helpers DOM purs), `types.ts`, `index.ts`. **103 tests** (`core-combobox.spec.ts` + `core-combobox-dom.spec.ts`), sur 420 dans la lib.
>
> `PLAN-REFONTE-COMBOBOX.md` décrit une approche par *vendoring* d'une lib tierce qui a été **abandonnée en cours de route** au profit d'une réimplémentation native : il est conservé comme archive et ne doit plus servir de référence.
>
> **Avancement au 2026-08-28** — **G1 à G7 sont faits.** Phase 3 close (dropdown, menu, tooltip, drawer, toast ; DuModal écarté, son contrôle est natif et vérifié correct) et §5.1–5.2 avec elle : tabs, accordion et collapse ont perdu leurs `<input>` cachés. **Il ne reste aucune entrée dans l'allowlist axe.** DuModal (§4.4) et DuPagination (§5.6) ont été vérifiés puis écartés : leur cible était déjà atteinte. §2.0, les primitives §2.1–2.2, tout le socle §3, puis §4.1 à §4.6 et §5.1–5.6. La lib est à 39 specs / 673 tests + 32 skippés, zéro `any` en code livré, lint a11y + axe + build de contrôle CSS bloquants en CI. Prochain jalon : G8 (§6 Data display) puis G9 (§7 Hygiène).
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
| ~~T9~~ | ~~Classes de taille figées dans des composants eux-mêmes dimensionnés~~ — **audit fait, faux problème** : aucun composant exposant `size` ne code en dur une classe suffixée. `du-modal` et `du-alert` codent bien `btn-sm`, mais n'exposent pas `size` : il n'y a pas de taille parente à suivre | — | Résolu par la Phase 1. La règle reste écrite (§3.6, `docs/architecture.md` §8) |

| T10 | `tests/` n'est pas type-checké : le `include` du tsconfig s'arrête aux sources. L'y ajouter révèle ~20 erreurs préexistantes (contexte `this` des hooks Rollup dans `plugin-vite.spec.ts`, casts `VueNode`, un composant générique non assignable à `Component`) | `tsconfig.json` | Chantier isolé, hors G2 |
| T11 | Un `<style scoped>` de composant est une source de vérité invisible aux outils : `avatar-*` y est défini, pas dans daisyUI. Toute vérification de classes doit en tenir compte | du-avatar, du-tooltip | Pris en compte dans `check:css` (§3.5) |

### 1.3 Acquis à préserver

- `tests/` contient **30 specs / 461 tests (+22 skippés)** (alert, breadcrumbs, card, chat, checkbox, countdown, dock, drawer, dropdown, fab, fieldset, filter, menu, modal, pagination, rating, stats, tabs, timeline, composables, class-literals-invariant, plugin-vite, + `core-combobox`, `core-combobox-dom`, `du-select`, `du-search` issus de la Phase 1). **Ils servent de filet : chaque refonte commence par les lire et les étendre, jamais par les supprimer.**
- **Le patron livré par la Phase 1 est la référence des Phases 2+** : façade générique (`generic="O = any, V = any"`), zéro état local d'ouverture/surlignage, prop bags ARIA `v-bind`és, `useId()`, validation par `errorMessages` + slot `error` avec timing « touched », état stylé par `data-highlighted`/`aria-selected`. Les nouvelles façades s'y conforment plutôt que d'inventer.
- `composables/useIconSource.ts` expose **`IconSource` / `resolveIconKind` / `iconAsText`** : le type partagé des champs `icon` / `figure`. Ne jamais réécrire une chaîne de `typeof` dans un template — les trois qui existaient reconnaissaient chacune un sous-ensemble différent.
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

### 2.1 Arborescence cible — ✅ **faite pour les consommateurs de G3**

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

- [x] `core/` n'importe **rien** de DaisyUI/Tailwind ni des façades. Dépendances : Vue uniquement.
- [x] Chaque module extrait a son fichier de tests dédié : `core-popover.spec.ts` (18), `core-positioning.spec.ts` (10), `core-navigation.spec.ts` (18), `core-controllable-state.spec.ts` (8), `core-dom.spec.ts` (8).
- [x] `useFocusTrap` : **écrit** (`core/focus/`), avec `useFocusReturn`. Implémentation maison, ~100 lignes, `focusableWithin` en brique. Elle couvre les **deux** voies de sortie — Tab, et un focus qui arrive par ailleurs (clic, script) — parce qu'un piège qui ne gère que Tab n'en est pas un. Les tests ont fait apparaître un troisième cas : **deux pièges actifs se renvoient le focus jusqu'à saturer la pile** ; un garde de ré-entrance transforme la boucle infinie en simple conflit borné, mais c'est au consommateur de n'en activer qu'un.
  - `useFocusReturn` remplace la copie manuscrite qui vivait dans `useDrawerDismiss` — c'était la seule implémentation de la lib.
  - **Le piège n'a pas encore de consommateur** : c'est une entorse assumée à la règle « extraire à la demande », pas un oubli de celle-ci. Il atterrit en G5 sur le mode overlay du drawer, où rien n'empêche aujourd'hui Tab de sortir du panneau ouvert vers la page derrière. DuModal (`showModal()`) n'en voudra jamais : le top layer rend le reste du document inerte gratuitement.
- [x] `useControllableState(propRef, emit, internalDefault)` : fait. Deux ajouts par rapport au contrat annoncé — il **n'émet pas** quand on lui réassigne la valeur qu'il porte déjà, et `usePopoverState` accepte ce ref comme `state` pour que la prop contrôlée soit la seule vérité (en mode contrôlé, une demande d'ouverture émet et rien ne s'affiche).

### 2.0 Deux corrections préalables (avant toute extraction) — ✅ **fait**

- [x] **Déplacer le moteur** : `git mv components/DataInput/core components/core`. Le chemin actuel devient un contresens dès que DuDropdown ou DuModal en consomment. Met à jour 2 imports de façade et 3 imports de tests. `core/` n'étant pas exporté depuis `index.ts`, le plugin Vite n'est pas censé le voir — le confirmer par `plugin-vite.spec.ts` et un `npm run build`.
- [x] **Écouteurs document attachés à l'ouverture** dans `useCombobox.ts` : aujourd'hui `mousedown` et `keydown` sont posés sur `document` dans `onMounted` et sortent immédiatement si le popup est fermé. Passer à un `watch(isOpen)` qui attache à l'ouverture et retire à la fermeture (`onUnmounted` gardé en filet). Sur une page à 50 selects : 0 écouteur au repos au lieu de 100. C'est la règle que §10.3 énonce déjà et que le moteur ne respecte pas encore ; `usePopoverState` en hérite ensuite. Les tests de clic-extérieur et d'Escape (`core-combobox.spec.ts`, « popup lifecycle ») couvrent les deux chemins et doivent rester verts sans modification.

### 2.2 Définition de done de la phase

- [x] §2.0 fait : moteur à `components/core/`, écouteurs document attachés à l'ouverture. Un test dédié vérifie la souscription elle-même (`core-combobox.spec.ts`, « only listens to the document while open »).
- [x] Primitives extraites pour leurs consommateurs réels : `popover`, `positioning`, `shared/useControllableState` (DuDropdown), `navigation/useRovingIndex` (DuMenu). `focus/` attend G4.
- [x] Moteur combobox reposant sur `usePopoverState` + `useAnchorPosition`, **ses 96 tests verts sans une assertion modifiée** — la seule preuve qui comptait.
- [x] Tests dédiés des primitives : **62 tests** (popover 18, roving 18, positioning 10, controllable state 8, dom 8).
- [x] Doc par primitive dans `docs/architecture.md` : tableau contrat / consommateurs, plus les trois pièges (le flag qu'on ne possède pas, le `position` jamais posé, la touche consommée sans `preventDefault`).

## 3. Phase 2.b — Standards transversaux outillés

### 3.1 `docs/architecture.md`

- [x] **Fait** — `lib/docs/architecture.md` (276 lignes). Rédigé : structure de dossier d'un composant (`du-x.vue`, `du-x.types.ts`, `du-x.stories.ts`, `composables/` locaux interdits pour la logique popup/focus/clavier → primitives `core/`), nommage (props booléens sans préfixe `is`, emits `update:x` pour tout état contrôlable, slots kebab-case avec scope typé), typage (générique dès que des données traversent, `defineSlots` typé, zéro `any`), ARIA (référencer le pattern APG visé en commentaire de tête de template), data-attributes pour l'état (`data-open`, `data-highlighted`, `data-active`), règle Tailwind-scanner (T8), barre de tests. Le document signale explicitement les règles pas encore appliquées partout plutôt que de décrire une bibliothèque idéale. `CONTRIBUTING.md` (qui disait l'inverse sur les composables locaux) et `.claude/CLAUDE.md` y renvoient.

### 3.2 useId partout (T1)

- [x] Remplacer `Math.random()` dans les **5 occurrences restantes** (vérifié) : `du-accordion.vue` l. 17, `du-collapse.vue` l. 15, `du-filter.vue` l. 19, `du-rating.vue` l. 30, `du-drawer/composables/useDrawerClasses.ts` l. 18. Utiliser `core/shared/ids.ts`. DuSelect/DuSearch sont déjà passés à `useId()` en Phase 1.
- [x] Attention aux `provide` : du-filter fournit **la string, pas la ref** (commentaire existant dans le code : DuButton lit via `inject` sans unwrap). Conserver ce contrat en passant `useId()` résolu.
- [x] Test SSR simple : `tests/generated-ids.spec.ts` — deux instances ne collisionnent pas, deux rendus identiques produisent la même valeur.

**Deux bugs trouvés au passage :**
- `du-accordion` avait `name: 'accordion'` en défaut littéral, donc la branche `Math.random` était morte et **deux accordions d'une même page partageaient leur groupe de radios** : ouvrir un panneau dans l'un fermait un panneau dans l'autre. Défaut retiré.
- `du-collapse` fournissait un `collapseId` que personne n'injectait. Supprimé.

### 3.3 Passe de typage (T2)

La dette est bien plus faible qu'annoncé initialement, mais elle est mal mesurée par un compte d'`any` : ce qui manque surtout, ce sont les **génériques**.

- [x] **Les `any` de production** — 16 au décompte final (les 14 annoncés plus `du-button` (1, `Record<string, any>`) et un second dans `du-radial-progress`). Tous traités. Le point commun des `icon` / `figure` / `actions` était un type partagé qui manquait : `composables/useIconSource.ts` (`IconSource = Component | string | null`, `resolveIconKind`, `iconAsText`), exporté publiquement. Les index signatures `[key: string]: any` sont passées à `unknown`.
- [x] **Effet de bord du typage** : trois composants narrowaient `icon` différemment — du-dock ratait les composants fonctions, du-stats les chemins d'image racine-relatifs, du-menu-item les deux. Ils partagent désormais un seul helper.
- [x] **Le vrai chantier** : `du-table` (`R extends DuTableRowBase`, `DuTableColumn.key` vérifié contre le type de ligne), `du-timeline`, `du-chat`, `du-menu` (+ `du-menu-item`) sont génériques. `DuMenuItemData.subItems` est `this[]`, pour que les champs du consommateur survivent d'un niveau. **`du-list` n'a pas de prop `items` du tout** — c'est un pur conteneur à slots, il n'y avait rien à rendre générique : à retirer de la liste.
  - Contrainte à retenir : contraindre sur le **minimum nécessaire** (`DuTableRowBase`), pas sur la forme par défaut. Une interface consommateur n'a pas d'index signature implicite et ne satisferait pas `DuTableRow`.
- [x] Activer `@typescript-eslint/no-explicit-any` en `error` sur `components/` **une fois les deux points ci-dessus faits**, avec `// eslint-disable-next-line` justifiés pour les rares survivants. La règle est aujourd'hui `off` dans `eslint.config.js`, sous un commentaire (« DuSelect, DuSearch, DuTable accept arbitrary user data ») devenu **faux pour DuSelect et DuSearch**, désormais génériques : le réécrire en même temps.
- [x] Exclure les `.stories.ts` de la règle : `render: (args: any)` fait partie de la signature Storybook — c'est la confusion qui avait gonflé T2 à « ~60 ».
- [x] `strict: true` déjà hérité de `@vue/tsconfig` ; `type-check`, `lint`, `test`, `build` et `types-drift` sont déjà bloquants dans `.gitlab-ci.yml`. **Rien à faire.**
- [ ] **Reste ouvert** : `tests/` n'est pas type-checké (le `include` du tsconfig s'arrête à `components/`, `composables/`, `index.ts`, `plugin-vite.ts`, `types/`). L'ajouter fait apparaître ~20 erreurs préexistantes (contexte `this` des hooks Rollup dans `plugin-vite.spec.ts`, casts `VueNode`, un composant générique non assignable à `Component`). Chantier propre et isolé, à faire à part.

### 3.4 Lint & CI a11y

- [x] `eslint-plugin-vuejs-accessibility` (recommended). Dérogations ligne par ligne avec la raison écrite à côté ; une seule au niveau config (`form-control-has-label` sur les six primitives de formulaire, qui rendent le contrôle nu et laissent le label au consommateur — une frontière que la règle ne voit pas). `label-has-for` est configurée pour accepter l'imbrication, qui **est** une association valide.
- [x] axe-core en vitest sur un montage représentatif de chaque composant (`tests/a11y.spec.ts`), seuil `serious`/`critical`, bloquant en CI. Storybook n'est pas installé dans la lib, donc la route « test-runner Storybook » n'était pas disponible ; c'est la seconde option du plan.
  - Les composants qui échouent **structurellement** portent une entrée `knownIssues` nommant la règle et la section du plan — et le spec vérifie que chaque règle listée **échoue toujours**, pour qu'une entrée ne survive pas au bug qu'elle documente. Concernés : du-accordion et du-collapse (input caché, §5.2), du-menu et du-drawer qui l'embarque (sémantique listbox sur de la navigation, §4.2).

**Ce que les deux outils ont trouvé, et qui est corrigé :**
- `DuInputField` a une racine de template fragment (input + datalist optionnelle), donc Vue n'héritait pas les attributs : **un `aria-label` passé par le consommateur n'atterrissait nulle part** et le champ était innommable hors `<label>`. `inheritAttrs: false` + `v-bind="$attrs"` sur l'input.
- `DuSelect` / `DuSearch` tiraient le nom accessible du champ du placeholder ou de la sélection courante : sans l'un ni l'autre, aucun nom. Nouveaux props `ariaLabel` / `ariaLabelledby`.
- Le bouton de fermeture de `DuAlert` et `DuProgress` n'avaient aucun nom accessible (`dismissLabel`, `ariaLabel`).
- `DuSwap` en mode `useCheckbox: false` était un `<div @click>` : inatteignable au clavier, n'annonçant rien. C'est un `<button aria-pressed>` (breaking pour qui stylait `div.swap`).
- L'overlay de `DuDrawer` portait un `aria-label` sur un `<label>`, ce qu'ARIA interdit.

### 3.5 Invariant Tailwind-scanner (T8)

**Déjà couvert** : `tests/class-literals-invariant.spec.ts` exige, pour chaque appel `useSizeMapping`/`useVariantMapping(props, 'X')`, que `X-xs`…`X-xl` soient atteignables dans le dossier du composant ou d'une dépendance directe. Éprouvé en Phase 1 : c'est lui qui a imposé les constantes `badge-*`/`btn-*`/`checkbox-*` ajoutées pour les tailles imbriquées (T9).

Restent :

- [x] Documenter la règle dans `docs/architecture.md` (§9) — avec la raison, pas seulement la règle.
- [x] Build de contrôle « embedded » : `scripts/check-embedded-css.mjs` (`npm run check:css`, bloquant en CI). Plutôt qu'une app témoin, il compile **le vrai pipeline** — Tailwind 4 + le plugin daisyUI, sur les candidats que le scanner de Tailwind trouve dans les sources, exactement comme un build embedded — et échoue sur toute classe construite à l'exécution qui ne produit **aucune règle CSS**. Le `<style>` d'un composant compte comme définition (l'échelle de tailles de DuAvatar y vit).
  - **Trouvé du premier coup** : `tooltip-neutral` n'existe pas dans daisyUI. `variant="neutral"` paraissait correct uniquement parce que neutral est le fond par défaut du tooltip — l'invariant unitaire ne pouvait pas le voir, il ne vérifie que la *scannabilité*. Règle désormais écrite dans le composant.
  - Bilan : 218 classes construites à l'exécution sur 114 fichiers source, toutes scannées, toutes stylées.

### 3.6 Tailles imbriquées (T9) — ⚠️ **le constat était faux, rien à faire**

- [x] **Audit fait** : aucun composant exposant `size` ne code en dur une classe daisyUI suffixée. La seule occurrence (`avatar-xs`…`avatar-xl` dans du-avatar) est une **définition CSS** dans le `<style>` du composant, pas une classe figée dans le markup.
- [x] `du-modal` et `du-alert` codent bien `btn-sm` en dur, **mais aucun des deux n'expose de prop `size`** — il n'y a pas de taille parente à suivre, et `nestedSize()` n'a rien à dériver. daisyUI 5.6 ne définit ni `modal-*` ni `alert-*` en tailles, donc leur en ajouter une n'affecterait que ce bouton : ce serait une feature discutable, pas de l'hygiène. Leur `btn-sm` est un choix de taille, pas un bug.
- **T9 est donc entièrement résolu par la Phase 1.** Ce qui reste utile est la règle, pas le chantier : elle est écrite dans `docs/architecture.md` §8 (« un `btn-sm` codé en dur dans un composant qui expose `size` est un bug ») et rappelée en §7 pour les passes d'hygiène à venir.

---

## 4. Phase 3 — Widgets popup sur primitives `core/`

Ordre choisi pour maximiser la réutilisation : dropdown → menu (dépend du dropdown pour le pattern menu-button) → tooltip → modal → drawer → toast.

### 4.1 DuDropdown — ✅ **fait**

**État de départ** : purement CSS (classes `dropdown`, `dropdown-open`, `dropdown-hover`, placement par classes), prop `open` sans emit, `provide('isDropdownTrigger')`, aucun dismiss ni clavier ; le commentaire du template promet des `triggerProps` qui n'existent pas.

**Cible** :
- [x] État via `useControllableState` : prop `open?: boolean` + emit `update:open` + emits `open`/`close`. Défaut : non contrôlé, toggle au clic du trigger.
- [x] `core/popover` : click-outside (`closeOnClickOutside` défaut `true`, et `clickOutsideFilter` — **à réintroduire ici**, il a été retiré du moteur faute de consommateur), Escape ferme + rend le focus au trigger (`useFocusReturn`).
- [x] Slots : `trigger` (scope `{ open, toggle, triggerProps }` — **fournir enfin les `triggerProps` promis** : `aria-expanded`, `aria-haspopup`, `aria-controls`, `onClick`, `onKeydown` ArrowDown ouvre) et défaut (contenu, scope `{ open, close }`).
- [x] Prop `hover` conservée (délai d'ouverture/fermeture ~100 ms géré en JS, plus par CSS seul, pour que l'état JS et le visuel restent synchrones) ; `hover` implique aussi ouverture au focus clavier.
- [x] Prop `popover?: boolean` : rendu top-layer via Popover API + `useAnchorPosition` (sinon classes de placement DaisyUI actuelles conservées — mapper la prop `placement` existante, dont la forme string/array/objet est conservée telle quelle).
- [x] Contenu : `tabindex` non forcé ; Tab depuis le contenu sort et ferme (comportement `focusNextOutside` si `popover`, natif sinon).
- [x] Tests (~15) : contrôlé/non contrôlé, outside/Escape/focus return, hover + focus, aria du trigger, placement classes, popover mode (mocks Popover API).
- [x] Stories : cas dans un conteneur `overflow: hidden` (démo `popover`).

### 4.2 DuMenu — ✅ **fait**

**État de départ** : rendu `menu` DaisyUI (ul/li), `useMenuKeyboardNav` local, emits `itemClick`/`subItemClick`, items typés `DuMenuItemData`, sous-menus via `du-menu-item.vue`.

**Cible** :
- [x] Décision de sémantique **explicite via prop `role`** : `'menu'` (pattern APG menu : `role="menu"`/`menuitem`, roving tabindex, typeahead) ou `'nav'` (défaut : liste de liens de navigation, PAS de rôle menu — c'est l'usage sidebar). L'erreur classique à éviter : mettre `role="menu"` sur de la navigation.
- [x] En mode `'menu'` : remplacer `useMenuKeyboardNav` par `core/navigation/useRovingIndex` (flèches selon `direction`, Home/End, typeahead premières lettres, skip `disabled`), items `role="menuitem"` `tabindex` géré, sous-menus `aria-haspopup="menu"` + `aria-expanded`, ouverture ArrowRight/fermeture ArrowLeft.
- [x] ~~Ajouter `disabled` par item~~ — la clé `disabled` **existait déjà** sur `DuMenuItemData`. Ce qui manquait, c'est qu'elle soit honorée : un item désactivé sort du parcours clavier (`aria-disabled`, enjambé par le roving index) et n'a plus de `href`, donc plus de tab stop.
- [x] Intégration menu-button : story + doc du combo `DuDropdown(trigger) + DuMenu(role="menu")` — le dropdown passe `aria-haspopup="menu"`, ArrowDown ouvre et focus le premier item, Escape referme et rend le focus.
- [x] Emits : conserver `itemClick`/`subItemClick` ; supprimer les callbacks props `onItemClick`/`onSubItemClick` (doublon emit/prop — breaking assumé).
- [x] Tests (~15) et mise à jour des specs existantes (`du-menu.spec.ts`).

### 4.3 DuTooltip — ✅ **fait**

**État de départ** : classes DaisyUI (`tooltip`, `data-tip`, `tooltip-open`, positions), contenu riche via slot, aucun ARIA, aucun déclencheur clavier.

**Cible** :
- [x] `aria-describedby` : id (`useId`) sur le contenu du tooltip, référencé par l'élément déclencheur. **Le déclencheur arrive par un slot**, donc le composant ne peut pas lui poser l'attribut de façon déclarative : il le pose sur le premier focusable du slot, qui est aussi le seul élément capable d'ouvrir le tip au clavier — les deux coïncident par construction.
  - **Découverte structurante** : l'attribut `data-tip` de daisyUI n'est plus posé. daisyUI révèle le tip sur `:hover` à partir de cet attribut seul, instantanément et sans dismiss possible. Les délais, Escape et l'état contrôlé ne sont réels que si **le tip est absent du DOM à la fermeture**, sans quoi le CSS décide avant le JS. La prop `dataTip` ne change pas ; le style qui visait `[data-tip]` vise `.tooltip-content`.
- [x] Déclenchement : hover **et** focus-visible ; fermeture au blur/mouseleave et sur **Escape** (exigence WCAG 1.4.13 « dismissable ») ; props `openDelay`/`closeDelay` (défauts 300/100 ms). Le contenu reste survolable (« hoverable » WCAG) : ne pas fermer quand la souris passe du trigger au tooltip.
- [x] Prop `open` contrôlable via `useControllableState` (mode manuel conservé).
- [x] Option `popover` (top-layer + `useAnchorPosition`) pour sortir des `overflow: hidden` — cas fréquent des tooltips dans des cards/tables.
- [x] Le tooltip reste non focusable et purement descriptif : ne jamais y mettre de contenu interactif (documenter ; si besoin interactif → DuDropdown).
- [x] ~~Typage : purger les 8 `any`~~ — **il n'y en avait aucun** dans le composant ; les 8 étaient dans `du-tooltip.stories.ts` (`render: (args: any)`). Déjà réglé par §3.3.
- [x] Tests (~10) : describedby, hover, focus clavier, Escape, delays (fake timers), hoverable.

### 4.4 DuModal — ⛔ **hors périmètre, décision produit**

**Vérifié le 2026-08-28, puis écarté** : le mécanisme est natif et il fonctionne. `showModal()` donne le top layer, l'inertie de l'arrière-plan, le piège de focus et le retour de focus, gratuitement et correctement. `@close` sur le `<dialog>` émet déjà `update:open` sur **tous** les chemins de fermeture (Escape natif, `form method="dialog"`, `.close()`), et le clic sur le fond passe par le `<form method="dialog" class="modal-backdrop">` de daisyUI. axe ne remonte rien, même sans `ariaLabel`.

Ce qui reste ci-dessous relève du confort, pas du défaut — conservé pour mémoire, non planifié :
- [~] Synchroniser l'état sur l'événement natif `close` du `<dialog>` (Escape natif, `form method="dialog"`) → emit `update:open` fiable dans tous les chemins de fermeture ; emits `open`/`close` ajoutés.
- [~] `useFocusReturn` : rendre le focus à l'élément déclencheur au close (le natif le fait pour showModal dans la plupart des cas — tester, ne câbler la primitive que si nécessaire, notamment quand l'ouverture vient d'un changement de prop).
- [~] Prop `initialFocus?: string | HTMLElement` (sélecteur CSS ou élément) appliquée à l'ouverture ; défaut : comportement natif (`autofocus` sinon premier focusable).
- [~] `aria-labelledby` automatique : si slot `title` présent, id généré et câblé ; sinon exiger `ariaLabel` (warning dev si aucun des deux).
- [~] `closeBackdrop` : vérifier l'implémentation clic-sur-backdrop (clic sur `::backdrop` = clic sur le dialog lui-même hors box — tester la géométrie plutôt que `target === dialog` si la box remplit le dialog).
- [~] Pas de focus trap maison : `showModal()` + top-layer + inert natif suffisent. Documenter que le mode non-modal (`show()`) n'est pas supporté.
- [~] Tests : étendre `du-modal.spec.ts` (fermetures natives synchronisées, labelledby, initialFocus, focus return).

### 4.5 DuDrawer — ✅ **fait**

**État de départ** : composables locaux `useDrawerClasses` (contient un `Math.random`), `useDrawerDismiss`, `useDrawerOpenState` ; pattern DaisyUI checkbox/overlay.

**Cible** :
- [x] `useDrawerOpenState` → `useControllableState` ; `useDrawerDismiss` → `core/popover` (outside + Escape) ; `Math.random` → `useId` (§3.2). API publique inchangée autant que possible (`open`/`update:open` s'ils existent, sinon les introduire).
- [x] Mode overlay (mobile) : `useFocusTrap` sur le panneau + `useFocusReturn` au close + `aria-modal="true"` `role="dialog"` sur le panneau + fond `inert` (attribut sur le contenu principal pendant l'ouverture — prop `inertTarget?: string` sélecteur, défaut : sibling contenu du drawer).
- [x] Mode latéral persistant (desktop) : aucun trap, `role` néant. **La prop ne suffisait pas** : `responsive`/`alwaysOpenOnLarge` ne disent que la classe CSS (`lg:drawer-open`), pas si le point de rupture est *actuellement* franchi. Il a fallu évaluer la même media query en JS (`useDrawerPinned`, breakpoints Tailwind en `rem`). Sans `matchMedia` (SSR, tests) la réponse est « flottant » — le sens sûr : du comportement overlay sur une sidebar épinglée est redondant, l'inverse enferme un utilisateur clavier.
- [x] Tests : étendre `du-drawer.spec.ts` (trap actif seulement en overlay, Escape, focus return, ids déterministes).

### 4.6 DuToast — ✅ **fait**

**État de départ** : conteneur de positionnement CSS pur (`toast-*`), prop `to` (téléport ?), aucun `aria-live`, pas de gestion de file/durée.

**Cible** :
- [x] Conteneur : `role="status"` + `aria-live="polite"` par défaut ; variante `assertive` pour les erreurs (prop `politeness` par toast, le conteneur agrège — pattern : deux régions live, une polite une assertive).
- [x] Introduire une gestion d'affichage : composable public `useToasts()` (état module-scope : `push({ title, message, variant, duration, politeness })`, `dismiss(id)`) + `<DuToast>` qui rend la file. Durée par défaut 5000 ms, `duration: 0` = persistant, **pause des timers au hover et au focus-within** (WCAG 2.2.1).
- [x] Chaque toast : bouton de fermeture accessible (`aria-label` paramétrable), animations d'entrée/sortie respectant `prefers-reduced-motion`.
- [x] Rétrocompat markup : le mode « slot manuel » actuel (toasts posés en enfants) reste supporté ; `useToasts` est additif.
- [x] Tests (~12) : live regions, file, durées (fake timers), pause hover/focus, dismiss.

## 5. Phase 4 — Widgets sélection & valeur

### 5.1 DuTabs — ✅ **fait**

**État de départ** : pattern radio-group DaisyUI (`<label><input type="radio"></label>`), flèches natives entre radios, `modelValue` = index, `name` défaut `"my_tabs"` (collision si deux instances !), items ou slot.

**Cible** — passage au pattern APG tabs :
- [x] Markup : `role="tablist"` (avec `aria-label`), boutons `role="tab"` `aria-selected` `aria-controls`, panneaux `role="tabpanel"` `aria-labelledby` `tabindex="0"`. Ids via `useId` (règle également le défaut `name` collisif, qui disparaît).
- [x] Clavier : `useRovingIndex` (flèches selon orientation, Home/End) ; prop `activation: 'automatic' | 'manual'` (défaut `automatic` : le focus sélectionne, comme les radios actuels — pas de régression UX).
- [x] `modelValue` : passer de l'index à une **valeur stable** `item.value` (fallback : index si non fournie). Breaking assumé, documenté.
- [x] Panneaux : les slots `content` / `content-${index}` existants font déjà office de slot `panel` — conservés plutôt que renommés. `role="tabpanel"` + `aria-labelledby` + `tabindex="0"` ajoutés.
  - **Trouvé au passage** : `aria-controls` pointait vers un panneau non rendu pour un onglet sans contenu — une référence cassée, qu'axe signale. Il n'est posé que si le panneau existe.
  - **Trouvé aussi** : la prop `bottom` était déclarée et jamais utilisée ; elle applique `tabs-bottom` maintenant. Et un slot indexé perdait contre le slot global, ce qui rendait `content-0` inutilisable dès qu'on fournissait `content`.
- [x] Prop `disabled` par item (skip clavier via la primitive).
- [x] Styles : `tabs-lift/border/box` et sizes conservés. **Aucune classe `tab-active` n'a été nécessaire** : daisyUI 5 stylise déjà `.tab[aria-selected=true]` et révèle le `.tab-content` adjacent. L'état sélectionné est donc porté par l'attribut que lit le lecteur d'écran, sans miroir de classe à faire diverger. Contrainte à retenir : **le `.tab-content` doit rester le frère adjacent de son `.tab`**.
- [x] Tests : réécrire `du-tabs.spec.ts` (rôles, roving, activation manuel/auto, v-model par valeur, disabled).

### 5.2 DuAccordion / DuCollapse — ✅ **fait**

**État de départ** : accordion = `<input type="radio">` cachés + `Math.random` name, titre non focusable (`div.collapse-title`), pas d'ARIA ; collapse = idem en checkbox.

**Cible** :
- [x] Markup : le titre devient un `<button>` avec `aria-expanded` + `aria-controls`, région de contenu avec `id` + `role="region"` + `aria-labelledby`. Clavier natif (bouton) suffisant — pas de roving requis par l'APG (Tab entre les en-têtes).
- [x] État : `v-model`. **Correction au plan** : DuCollapse n'est pas un panneau unique mais une *liste de disclosures indépendantes*, donc `open: boolean` ne convenait pas — c'est `modelValue: (string|number)[]`, toujours un tableau. DuAccordion : `modelValue: value | value[] | null`, avec `multiple` et `collapsible`. C'est précisément cette différence (l'un ferme les autres, l'autre non) qui n'apparaissait nulle part dans les deux APIs.
- [x] `useControllableState` pour les deux ; suppression totale des inputs radio/checkbox et du `name`.
- [x] Styles : DaisyUI `collapse-open`/`collapse-close` pilotés par l'état JS (classes conditionnelles), `collapse-arrow`/`collapse-plus` conservés.
- [x] Slots conservés (`title`, `title-${index}`, contenu) ; scope enrichi `{ open, toggle }`.
- [x] Animation : elle survit. `.collapse-open` pose `grid-template-rows: max-content 1fr` et la transition est déjà sur `.collapse` sous `@media (prefers-reduced-motion: no-preference)` — rien à réécrire.
- [x] Tests (~12 par composant) : v-model single/multiple/collapsible, aria, clavier bouton, deux instances sans collision d'ids.

### 5.3 DuFilter — ✅ **fait**

**État de départ** : boutons radio via DuButton, `provide('filterName', string)` avec `Math.random`, emit `change` sans v-model, bouton reset `×` en dur, 4 `any`.

**Cible** :
- [x] Générique `O` sur les items ; `modelValue?: O | null` + `update:modelValue` (le `change` reste, aligné). `useId` (§3.2, en respectant le contrat provide-string documenté dans le code).
- [x] Markup : envelopper dans `<fieldset>` + `<legend>` (prop `legend`, sr-only par défaut) — c'est un radio-group de filtrage, la sémantique radio DaisyUI est ici correcte et conservée.
- [x] Bouton reset : `aria-label` paramétrable (`resetLabel`), retiré du DOM quand rien n'est sélectionné.
  - **`alwaysShowReset` n'existe pas**, et ne peut pas exister : daisyUI masque `.filter-reset` avec `visibility: hidden` via `.filter:not(:has(:checked:not(.filter-reset)))`. Une prop promettant de le garder visible ne pourrait pas tenir — la feuille de style le cacherait quand même. Le retirer du DOM à la même condition ne fait qu'aligner le markup sur ce qui était déjà vrai visuellement.
- [x] Tests : étendre `du-filter.spec.ts`.

### 5.4 DuRating — ✅ **fait**

**Cible** : conserver le pattern radio-group DaisyUI (correct pour un rating) mais : `useId` pour `name` (§3.2) ; chaque input avec `aria-label` « n sur max » (props `itemLabel: (n, max) => string` pour i18n) ; prop `readonly` (rend des éléments non-input) ; vérifier le clavier natif radios (flèches OK) ; `modelValue` number strict, demi-valeurs si `half` ; purger les `any` ; étendre `du-rating.spec.ts`.

### 5.5 DuRange — ✅ **fait**

**Cible** : input range natif conservé ; ajouter `aria-valuetext` (prop `valueText: (v) => string`, ex. unités) ; `list`/ticks accessibles ; vérifier `aria-label`/labelledby ; option double curseur **hors scope** (noter comme feature future, nécessiterait `core/` dédié) ; tests.

### 5.6 DuPagination — ⛔ **rien à faire, vérifié**

**Vérifié le 2026-08-28** : tout ce que la cible demandait est déjà là. `<nav :aria-label>`, `aria-current="page"` sur la page active, labels i18n (`previousAriaLabel`, `nextAriaLabel`, `firstAriaLabel`, `lastAriaLabel`), ellipses en `aria-hidden` **et** `tabindex="-1"`, `usePaginationPages` sans aucun `any`, 16 tests répartis sur `du-pagination.spec.ts` et `use-pagination-pages.spec.ts`, et axe propre. La cible décrivait un travail déjà accompli.

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
| G1 | §2.0 + §2 extraction à la demande + tests — ✅ **fait** (reste `focus/`, qui attend G4) | Phase 1 finie ✅ | — |
| G2 | §3 Standards — ✅ **fait** (docs, useId, typage + génériques, lint a11y + axe, build de contrôle CSS ; T9 clos par audit) | — | — |
| G3 | §4.1–4.2 Dropdown + Menu — ✅ **fait** | G1, G2 | — |
| G4 | §4.3 Tooltip — ✅ **fait**. §4.4 Modal — ⛔ écarté : le contrôle est natif et correct | G1 | — |
| G5 | §4.5–4.6 Drawer + Toast — ✅ **fait** | G1 | — |
| G6 | §5.1–5.2 Tabs + Accordion/Collapse — ✅ **fait** | G1, G2 | — |
| G7 | §5.3–5.6 Filter, Rating, Range — ✅ **fait**. Pagination : rien à faire, vérifié | G2 | — |
| G8 | §6 Data display | G2 | 2 j |
| G9 | §7 Hygiène + form plumbing | G2 (+ Phase 1 pour 7.3) | 3 j |
| G10 | §8 verrouillage CI, revue de cohérence finale | tout | 1-2 j |

Total ≈ **24-29 jours**, largement parallélisable : G3–G9 sont indépendants entre eux ; chaque composant est une PR autonome laissant la lib shippable. Prioriser G3 (dropdown/menu) : c'est le gain a11y le plus visible et la première validation des primitives hors combobox.

## 10. Points de vigilance globaux

1. **Ne jamais casser un pattern DaisyUI qui rend un service natif sans le remplacer par mieux.** Vérifié aux deux endroits : les flèches des radios de du-tabs sont remplacées par `useRovingIndex` (et vont plus loin — elles enjambent les onglets désactivés), et l'animation grid de collapse survit intacte, `.collapse-open` posant le `grid-template-rows` que les radios posaient. **Corollaire trouvé en chemin** : daisyUI stylise souvent déjà l'attribut ARIA (`.tab[aria-selected=true]`, `.collapse-open`) — regarder son CSS *avant* d'inventer une classe miroir.
2. **`useControllableState` est le contrat unique** pour toute prop `open`/`modelValue` : pas de variantes locales, sinon la lib redevient incohérente en six mois.
3. **Les listeners document** (click-outside, Escape) ne sont montés que quand l'overlay est ouvert. Le moteur combobox s'y conforme depuis §2.0 (`watch(isOpen)`, `onUnmounted` en filet, test dédié) : `usePopoverState` hérite de la bonne règle, pas du défaut.
4. **`role="menu"` est réservé aux vrais menus d'actions** (§4.2) — l'anti-pattern « role menu sur une sidebar de navigation » est explicitement interdit par `docs/architecture.md`.
5. **Chaque suppression de comportement est un item de changelog** : tout ce qui figure dans « État actuel » des sections §4–§7 doit se retrouver soit dans la cible, soit dans le changelog comme retrait volontaire.
6. **Vérifier le plugin Vite maison** avant tout renommage d'exports/chemins (il a ses propres tests — `plugin-vite.spec.ts` — qui peuvent dépendre de la structure des dossiers).
7. **Un outil qu'on configure jusqu'au silence ne sert à rien.** Le lint a11y et axe ont été pointés sur la lib puis triés finding par finding : chaque dérogation porte sa raison à côté, et les échecs structurels portent une entrée qui **expire toute seule** (le test échoue si la règle allowlistée cesse d'échouer). Reproduire ce schéma pour tout nouvel outil de vérification.
8. **Un compte d'`any` ne mesure pas la dette de typage.** Les 16 `any` réels étaient quelques heures ; ce qui manquait vraiment, c'étaient les génériques — que rien ne signale. Chercher plutôt : quelles données du consommateur traversent un slot ou un emit en étant aplaties ?
9. **Un allowlist de dette doit expirer tout seul.** Les quatre entrées écrites en G2 sont toutes mortes en G3 et G5, chacune en faisant rougir le test au moment où le bug était réparé.
9bis. **Une réécriture de fichier emporte ce qui n'était pas dans sa tête.** La refonte de DuTooltip a supprimé son `<style scoped>` — et avec lui la règle `.tooltip-neutral` ajoutée en G2. `npm run check:css` l'a rattrapé. C'est l'argument pour que ce genre de vérification existe : elle ne sert pas à trouver le bug une fois, elle sert à le retrouver.
10bis. **Un allowlist de dette doit expirer tout seul (suite).** Le spec axe vérifie que chaque règle tolérée **échoue toujours** : quand DuMenu a cessé de violer les quatre règles listées, le test est passé au rouge jusqu'à ce que l'entrée soit supprimée. Sans ça, un allowlist survit au bug qu'il documente et devient une couverture permanente.
10. **Une classe safelistée n'est pas une classe qui existe.** L'invariant unitaire prouve la scannabilité, pas la réalité (`tooltip-neutral`). `npm run check:css` compile le vrai pipeline ; le lancer après toute modification d'un `useSizeMapping`/`useVariantMapping` ou d'une constante `*_SIZES`/`*_VARIANTS`.
7. Les estimations supposent un développeur connaissant la codebase ; les jalons G3–G9 peuvent être livrés dans n'importe quel ordre après G1/G2 si les priorités produit changent.
