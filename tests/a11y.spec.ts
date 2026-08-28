// axe-core over a representative mount of every component that renders
// something a screen reader has to make sense of.
//
// This is a floor, not a ceiling. Automated rules catch a minority of real
// accessibility problems — they see a missing accessible name, not a menu
// wearing the wrong role — so a clean run here does not mean a component is
// accessible. It means it has not regressed into the failures a machine can
// see. Keyboard behaviour and announced semantics are asserted in each
// component's own spec, and a screen-reader pass is still owed.
//
// The bar is `serious` and `critical`. `moderate`/`minor` findings are mostly
// contrast and landmark advice that depend on the page a consumer builds, not
// on the component.
import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import type { Component } from 'vue'

import DuAccordion from '../components/DataDisplay/du-accordion/du-accordion.vue'
import DuAlert from '../components/Feedback/du-alert/du-alert.vue'
import DuBreadcrumbs from '../components/Navigation/du-breadcrumbs/du-breadcrumbs.vue'
import DuButton from '../components/Actions/du-button/du-button.vue'
import DuChat from '../components/DataDisplay/du-chat/du-chat.vue'
import DuCheckbox from '../components/DataInput/du-checkbox/du-checkbox.vue'
import DuCollapse from '../components/DataDisplay/du-collapse/du-collapse.vue'
import DuDock from '../components/Navigation/du-dock/du-dock.vue'
import DuDrawer from '../components/Layout/du-drawer/du-drawer.vue'
import DuDropdown from '../components/Actions/du-dropdown/du-dropdown.vue'
import DuFab from '../components/Actions/du-fab/du-fab.vue'
import DuFilter from '../components/DataInput/du-filter/du-filter.vue'
import DuInputField from '../components/DataInput/du-input-field/du-input-field.vue'
import DuMenu from '../components/Navigation/du-menu/du-menu.vue'
import DuModal from '../components/Actions/du-modal/du-modal.vue'
import DuPagination from '../components/Navigation/du-pagination/du-pagination.vue'
import DuProgress from '../components/Feedback/du-progress/du-progress.vue'
import DuRating from '../components/DataInput/du-rating/du-rating.vue'
import DuSearch from '../components/DataInput/du-search/du-search.vue'
import DuSelect from '../components/DataInput/du-select/du-select.vue'
import DuSteps from '../components/Navigation/du-steps/du-steps.vue'
import DuSwap from '../components/Actions/du-swap/du-swap.vue'
import DuTable from '../components/DataDisplay/du-table/du-table.vue'
import DuTabs from '../components/Navigation/du-tabs/du-tabs.vue'
import DuTooltip from '../components/Feedback/du-tooltip/du-tooltip.vue'
import DuTextArea from '../components/DataInput/du-text-area/du-text-area.vue'
import DuTimeline from '../components/DataDisplay/du-timeline/du-timeline.vue'

const BLOCKING: axe.ImpactValue[] = ['serious', 'critical']

interface Case {
  name: string
  component: Component
  props?: Record<string, unknown>
  slots?: Record<string, string>
  /**
   * axe rule ids this component is known to fail, each one a structural bug
   * with a scheduled fix rather than something to paper over. The test also
   * asserts that every id listed still fires, so an entry cannot outlive the
   * bug it documents.
   */
  knownIssues?: { rules: string[], because: string }
}

const OPTIONS = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Grace' },
]

const cases: Case[] = [
  { name: 'DuButton', component: DuButton, props: { label: 'Save' } },
  { name: 'DuSwap', component: DuSwap, props: { useCheckbox: false, ariaLabel: 'Toggle theme' }, slots: { on: 'on', off: 'off' } },
  {
    name: 'DuDropdown',
    component: DuDropdown,
    props: { open: true },
    slots: {
      trigger: '<template #trigger="{ triggerProps }"><button type="button" v-bind="triggerProps">Open</button></template>',
      default: '<p>Panel</p>',
    },
  },
  { name: 'DuFab', component: DuFab, props: { mainAction: { label: 'Compose' }, items: [{ label: 'Photo' }] } },
  { name: 'DuModal', component: DuModal, props: { open: true, ariaLabel: 'Confirm' }, slots: { default: '<p>Sure?</p>' } },

  {
    name: 'DuAccordion',
    component: DuAccordion,
    props: { items: [{ title: 'One', content: 'a' }, { title: 'Two', content: 'b' }] },
    // The open/close state rides on hidden radio inputs nobody can label.
    // PLAN-REFACTO-GLOBAL.md §5.2 replaces them with a button + aria-expanded.
    knownIssues: { rules: ['label'], because: 'hidden radios drive the open state (§5.2)' },
  },
  {
    name: 'DuCollapse',
    component: DuCollapse,
    props: { items: [{ title: 'One', content: 'a' }] },
    knownIssues: { rules: ['label'], because: 'a hidden checkbox drives the open state (§5.2)' },
  },
  { name: 'DuChat', component: DuChat, props: { items: [{ message: 'Hi', header: 'Ada' }] } },
  { name: 'DuTable', component: DuTable, props: { columns: [{ key: 'name', label: 'Name' }], rows: [{ id: 1, name: 'Ada' }] } },
  { name: 'DuTimeline', component: DuTimeline, props: { items: [{ start: '2024', middle: '•', end: 'Shipped' }] } },

  { name: 'DuCheckbox', component: DuCheckbox, props: { 'aria-label': 'Subscribe' } },
  { name: 'DuInputField', component: DuInputField, props: { type: 'text', 'aria-label': 'Email' } },
  { name: 'DuTextArea', component: DuTextArea, props: { 'aria-label': 'Notes' } },
  { name: 'DuFilter', component: DuFilter, props: { items: [{ title: 'All' }, { title: 'Active' }] } },
  { name: 'DuRating', component: DuRating, props: { count: 5, modelValue: 3 } },
  { name: 'DuSelect', component: DuSelect, props: { options: OPTIONS, labelBy: 'name', trackBy: 'id', ariaLabel: 'Owner' } },
  { name: 'DuSearch', component: DuSearch, props: { options: OPTIONS, labelBy: 'name', trackBy: 'id', ariaLabel: 'Owner' } },

  { name: 'DuAlert', component: DuAlert, props: { variant: 'info', dismissible: true }, slots: { default: 'Saved.' } },
  { name: 'DuProgress', component: DuProgress, props: { value: 40, ariaLabel: 'Upload' } },
  {
    name: 'DuTooltip',
    component: DuTooltip,
    props: { open: true, dataTip: 'Saves the document' },
    slots: { default: '<button type="button">Save</button>' },
  },

  {
    name: 'DuDrawer',
    component: DuDrawer,
    props: { items: [{ label: 'Home', href: '/' }] },
    // The drawer's open state still rides on a hidden checkbox nobody can
    // label. PLAN-REFACTO-GLOBAL.md §4.5 replaces the pattern.
    knownIssues: { rules: ['label'], because: 'hidden checkbox toggle (§4.5)' },
  },

  { name: 'DuBreadcrumbs', component: DuBreadcrumbs, props: { items: [{ label: 'Home', href: '/' }, { label: 'Docs' }] } },
  { name: 'DuDock', component: DuDock, props: { items: [{ label: 'Home' }, { label: 'Search' }] } },
  { name: 'DuMenu (nav)', component: DuMenu, props: { items: [{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }] } },
  {
    name: 'DuMenu (menu)',
    component: DuMenu,
    props: {
      role: 'menu',
      ariaLabel: 'Actions',
      items: [{ label: 'Open', value: 'open' }, { label: 'Save', value: 'save' }],
    },
  },
  { name: 'DuPagination', component: DuPagination, props: { modelValue: 2, total: 50, perPage: 10 } },
  { name: 'DuSteps', component: DuSteps, props: { items: [{ label: 'Cart' }, { label: 'Pay' }] } },
  { name: 'DuTabs', component: DuTabs, props: { items: [{ label: 'One' }, { label: 'Two' }], ariaLabel: 'Sections' } },
]

let mounted: ReturnType<typeof mount> | null = null

afterEach(() => {
  mounted?.unmount()
  mounted = null
  document.body.innerHTML = ''
})

async function violationsOf({ component, props, slots }: Case) {
  const host = document.createElement('div')
  document.body.appendChild(host)
  mounted = mount(component, { props, slots, attachTo: host })

  const results = await axe.run(host, { resultTypes: ['violations'] })
  return results.violations.filter(
    (violation) => violation.impact != null && BLOCKING.includes(violation.impact),
  )
}

describe.each(cases)('$name', (testCase) => {
  const known = testCase.knownIssues?.rules ?? []

  it('has no serious or critical axe violation', async () => {
    const unexpected = (await violationsOf(testCase)).filter((v) => !known.includes(v.id))

    expect(unexpected.map((v) => `${v.id} (${v.impact}): ${v.nodes[0]?.html ?? ''}`)).toEqual([])
  })

  it.runIf(known.length > 0)('still fails only the issues it documents', async () => {
    const firing = (await violationsOf(testCase)).map((v) => v.id)

    // Every allowlisted rule must still fire. One that stopped means the bug is
    // fixed and the entry — along with its reason — belongs in the bin.
    expect([...known].sort()).toEqual([...new Set(firing)].sort())
  })
})
