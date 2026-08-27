# Cornet-UI — Roadmap

> **Cornet-UI is in beta.** Breaking changes are expected and embraced until v1.0.
> This roadmap tracks the industrialization of the library: stronger typing, real accessibility, serious test coverage, and a two-layer architecture — **internal headless primitives** (`core/`) powering **DaisyUI-styled facades** (`du-*`).

---

## Vision

```
┌──────────────────────────────────────────────────────────┐
│  du-* facades — DaisyUI markup, variants, sizes          │  ← public API
├──────────────────────────────────────────────────────────┤
│  core/ headless primitives — state, keyboard, focus,     │  ← internal, zero CSS,
│  dismiss, positioning, ARIA prop bags                    │     zero npm dependency
└──────────────────────────────────────────────────────────┘
```

### Guiding principles

- **Zero `any`** — generics (`generic="O, V"`) wherever user data flows through a component
- **WAI-APG compliant ARIA**, applied through *prop bags* provided by `core/` (`v-bind="triggerProps"`), never hand-rolled in facades
- **Ids via `useId()`** — `Math.random()` is banned (SSR-safe)
- **State styled through data-attributes** (`data-open`, `data-highlighted`, ...), not class ternaries
- **One `core/` primitive** for every popup / dismiss / focus / keyboard behavior — no local reimplementations
- **Test bar** — every interactive component ships black-box tests covering v-model, emits, full keyboard support, and ARIA attributes
- **Tailwind scanner invariant** — class constants exported from `.types.ts` files (embedded mode) are maintained on all new markup

> Full conventions live in `docs/architecture.md` (deliverable of Phase 2).

---

## Phase 1 — Combobox engine + DuSelect / DuSearch rewrite

> The founding effort: it introduces `core/` and sets the standards.
> **Done.** `PLAN-REFONTE-COMBOBOX.md` planned this phase around vendoring a third-party engine; that approach was dropped mid-flight for an in-house implementation, so the document is kept only as an archive of the original intent.

- [x] **1.1** — Write the engine as original Cornet code in `core/combobox/`: one closure (`useCombobox.ts`, ~840 lines — selection, filtering, creatable entry, highlight, keyboard, popup lifecycle, commit-on-close, focus, CSS anchor positioning, ARIA prop bags, validation), plus pure DOM helpers (`dom.ts`), `types.ts` and an internal barrel. No dependency, no third-party code.
- [x] **1.2** — Engine behaviors beyond the base pattern: external filtering (`externalFilter`), creatable option, commit-on-close (`commitOnClose`), results limit, disabled options, select/remove/create callbacks — **103 tests** (`core-combobox.spec.ts` + `core-combobox-dom.spec.ts`)
- [x] **1.3** — Rewrite **DuSelect** as a thin facade over the engine (generics, ARIA prop bags, full keyboard support, validation, Popover API) — 50 tests
- [x] **1.4** — Rewrite **DuSearch** (canonical combobox-input pattern, creatable, chips-based multi mode) — 42 tests
- [x] **1.5** — Tailwind scanner audit, breaking-changes changelog, removal of the 12 legacy composables
- [ ] **1.6** — A11y audit still owed: axe on the stories + a screen-reader pass on both components

> **Exit criteria:** two reference components, a fully tested engine, conventions proven on the hardest case. Met — 420 tests across the library, `core/` holds zero `any` and zero CSS.

## Phase 2 — Cross-cutting foundation

> Generalize what Phase 1 established, without touching component behavior.

- [ ] **2.1** — Write `docs/architecture.md`: typing conventions, props/emits/slots naming, ARIA, data-attributes, folder structure, test bar, Tailwind scanner rule
- [ ] **2.2** — Move the engine from `components/DataInput/core/` to `components/core/`, switch its document listeners to open-time attachment, then extract reusable primitives out of `core/combobox/` — **one at a time, only when a second consumer actually needs one** (the engine is a single closure by design, so each extraction is a split, not a move):
  - `core/popover/` — open/close, click-outside, `clickOutsideFilter` (reintroduced), Popover API
  - `core/positioning/` — CSS anchor positioning
  - `core/focus/` — focus trap, focus return, generalized "focus past this container"
  - `core/navigation/` — generic roving index / highlight
  - The combobox engine becomes their first consumer; its 103 tests must stay green untouched
- [ ] **2.3** — Eradicate `Math.random()` → `useId()` (5 remaining: du-accordion, du-collapse, du-filter, du-rating, du-drawer's `useDrawerClasses` — combobox already handled in Phase 1)
- [ ] **2.4** — Typing pass: 14 `any` left in shipped code (du-stat, du-fab, du-tabs, du-dock, du-drawer, du-table, du-radial-progress — nearly all in `.types.ts`), then the real work: make du-table, du-timeline, du-list, du-menu and du-chat generic like the Phase 1 facades. Enable `no-explicit-any` + strict typecheck in CI afterwards, excluding `.stories.ts` (`render: (args: any)` is Storybook's own signature)
- [ ] **2.6** — Nested sizes: controls rendered inside a sized component must follow it via `nestedSize()` instead of a hardcoded class (du-modal's close button, du-alert's dismiss button)
- [ ] **2.5** — Automated a11y linting: `eslint-plugin-vuejs-accessibility` + axe-core on stories in CI

> **Exit criteria:** standards are tooled and enforced in CI; primitives are ready for migrations.

## Phase 3 — Popup widgets on `core/` primitives

> The components that share the combobox mechanics.
> Detailed plan: `PLAN-REFACTO-GLOBAL.md`

- [ ] **3.1** — **DuDropdown**: from CSS-only DaisyUI to `core/popover` (controlled/uncontrolled state, dismiss, Escape, `aria-expanded` / `aria-haspopup`, optional top-layer)
- [ ] **3.2** — **DuMenu**: `menu` / `menuitem` roles, roving-tabindex navigation via `core/navigation` (replaces `useMenuKeyboardNav`), accessible submenus — documented DuDropdown + DuMenu integration (APG menu-button pattern)
- [ ] **3.3** — **DuTooltip**: wired `aria-describedby`, hover + keyboard-focus triggers, Escape dismiss, delays, optional top-layer (escapes `overflow: hidden`)
- [ ] **3.4** — **DuModal**: consolidation around native `<dialog>` (focus return, `open` / native-event sync, automatic `aria-labelledby`, `initialFocus`)
- [ ] **3.5** — **DuDrawer**: migrate `useDrawerDismiss` / `useDrawerOpenState` onto `core/popover` + `core/focus` (overlay focus trap, Escape, inert background)
- [ ] **3.6** — **DuToast**: proper `aria-live` region, queue management, durations, pause on hover/focus

## Phase 4 — Selection & value widgets

- [ ] **4.1** — **DuTabs**: from the DaisyUI radio pattern to the APG tabs pattern (`tablist` / `tab` / `tabpanel`, roving tabindex via `core/navigation`), v-model by stable value (no longer by index), associated panels
- [ ] **4.2** — **DuAccordion / DuCollapse**: replace hidden `<input radio/checkbox>` with `aria-expanded` / `aria-controls` buttons, controllable single/multiple mode, v-model
- [ ] **4.3** — **DuFilter**: generic item typing, v-model (currently emit-only `change`), fieldset/legend
- [ ] **4.4** — **DuRating**: ARIA radio-group pattern, keyboard support (arrows, Home/End), half values, readonly
- [ ] **4.5** — **DuRange**: `aria-valuetext`, optional dual thumb (min/max), fine-grained keyboard (PageUp/Down, Home/End)
- [ ] **4.6** — **DuPagination**: `aria-current="page"`, keyboard navigation, i18n labels

## Phase 5 — Data display & polish

- [ ] **5.1** — **DuTable**: generic rows/columns — if sorting/selection lands, create `core/table` (out of scope otherwise)
- [ ] **5.2** — **DuCarousel**: keyboard support, `aria-roledescription="carousel"`, accessible prev/next buttons, auto-play pause
- [ ] **5.3** — Hygiene pass on presentational components (badge, card, avatar, stat, kbd, loading, skeleton, ...): typing, naming conventions, complete stories — no architectural change
- [ ] **5.4** — Test coverage: target ≥ 80% on `core/`, black-box tests on every interactive facade

## Phase 6 — Road to v1.0

- [ ] **6.1** — API freeze: cross-cutting consistency review (props/emits/slots naming across all 45 components)
- [ ] **6.2** — Documentation: beta → v1 migration guide, `core/` primitives docs (advanced internal usage), per-component a11y docs
- [ ] **6.3** — Final audit: axe on all stories, screen-reader walkthrough of interactive widgets, SSR/hydration testing
- [ ] **6.4** — Optional: merge DuSelect/DuSearch into a single `DuCombobox` with presets (decision deferred from Phase 1)

---

## Status

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Combobox engine + DuSelect/DuSearch | 🔲 Todo |
| 2 | Foundation — docs, `core/` primitives, lint, `useId` | 🔲 Todo |
| 3 | Popups — dropdown, menu, tooltip, modal, drawer, toast | 🔲 Todo |
| 4 | Selection — tabs, accordion, filter, rating, range, pagination | 🔲 Todo |
| 5 | Data display + hygiene + coverage | 🔲 Todo |
| 6 | API freeze, docs, audits, v1.0 | 🔲 Todo |

> Phases 3 and 4 are parallelizable component by component once Phase 2 is done.
> Within each phase, every checkbox maps to a self-contained PR that leaves the library shippable.
