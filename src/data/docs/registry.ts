import type { DocPageData } from '@/types/docs'

// ─── Guides ─────────────────────────────────────────────────
import installation from './guides/installation'
import quickStart from './guides/quick-start'
import theming from './guides/theming'
import copyComponents from './guides/copy-components'
import mcp from './guides/mcp'

// ─── Actions ────────────────────────────────────────────────
import button from './actions/button'
import modal from './actions/modal'
import dropdown from './actions/dropdown'
import swap from './actions/swap'
import fab from './actions/fab'

// ─── Data Display ───────────────────────────────────────────
import accordion from './data-display/accordion'
import avatar from './data-display/avatar'
import badge from './data-display/badge'
import card from './data-display/card'
import carousel from './data-display/carousel'
import chat from './data-display/chat'
import collapse from './data-display/collapse'
import countdown from './data-display/countdown'
import diff from './data-display/diff'
import kbd from './data-display/kbd'
import list from './data-display/list'
import stat from './data-display/stat'
import stats from './data-display/stats'
import status from './data-display/status'
import table from './data-display/table'
import timeline from './data-display/timeline'

// ─── Data Input ─────────────────────────────────────────────
import checkbox from './data-input/checkbox'
import fieldset from './data-input/fieldset'
import fileInput from './data-input/file-input'
import filter from './data-input/filter'
import inputField from './data-input/input-field'
import label from './data-input/label'
import labelInputValidator from './data-input/label-input-validator'
import radio from './data-input/radio'
import range from './data-input/range'
import rating from './data-input/rating'
import search from './data-input/search'
import select from './data-input/select'
import textarea from './data-input/textarea'

// ─── Feedback ───────────────────────────────────────────────
import alert from './feedback/alert'
import loading from './feedback/loading'
import progress from './feedback/progress'
import radialProgress from './feedback/radial-progress'
import skeleton from './feedback/skeleton'
import toast from './feedback/toast'
import tooltip from './feedback/tooltip'

// ─── Layout ─────────────────────────────────────────────────
import drawer from './layout/drawer'
import join from './layout/join'

// ─── Navigation ─────────────────────────────────────────────
import breadcrumbs from './navigation/breadcrumbs'
import buttonLink from './navigation/button-link'
import dock from './navigation/dock'
import link from './navigation/link'
import menu from './navigation/menu'
import navbar from './navigation/navbar'
import pagination from './navigation/pagination'
import steps from './navigation/steps'
import tabs from './navigation/tabs'

// ─── Registry ────────────────────────────────────────────────
export const docsRegistry: Record<string, DocPageData> = {
  // Guides
  '/docs/guides/installation': installation,
  '/docs/guides/quick-start': quickStart,
  '/docs/guides/theming': theming,
  '/docs/guides/copy-components': copyComponents,
  '/docs/guides/mcp': mcp,

  // Actions
  '/docs/actions/button': button,
  '/docs/actions/modal': modal,
  '/docs/actions/dropdown': dropdown,
  '/docs/actions/swap': swap,
  '/docs/actions/fab': fab,

  // Data Display
  '/docs/data-display/accordion': accordion,
  '/docs/data-display/avatar': avatar,
  '/docs/data-display/badge': badge,
  '/docs/data-display/card': card,
  '/docs/data-display/carousel': carousel,
  '/docs/data-display/chat': chat,
  '/docs/data-display/collapse': collapse,
  '/docs/data-display/countdown': countdown,
  '/docs/data-display/diff': diff,
  '/docs/data-display/kbd': kbd,
  '/docs/data-display/list': list,
  '/docs/data-display/stat': stat,
  '/docs/data-display/stats': stats,
  '/docs/data-display/status': status,
  '/docs/data-display/table': table,
  '/docs/data-display/timeline': timeline,

  // Data Input
  '/docs/data-input/checkbox': checkbox,
  '/docs/data-input/fieldset': fieldset,
  '/docs/data-input/file-input': fileInput,
  '/docs/data-input/filter': filter,
  '/docs/data-input/input-field': inputField,
  '/docs/data-input/label': label,
  '/docs/data-input/label-input-validator': labelInputValidator,
  '/docs/data-input/radio': radio,
  '/docs/data-input/range': range,
  '/docs/data-input/rating': rating,
  '/docs/data-input/search': search,
  '/docs/data-input/select': select,
  '/docs/data-input/textarea': textarea,

  // Feedback
  '/docs/feedback/alert': alert,
  '/docs/feedback/loading': loading,
  '/docs/feedback/progress': progress,
  '/docs/feedback/radial-progress': radialProgress,
  '/docs/feedback/skeleton': skeleton,
  '/docs/feedback/toast': toast,
  '/docs/feedback/tooltip': tooltip,

  // Layout
  '/docs/layout/drawer': drawer,
  '/docs/layout/join': join,

  // Navigation
  '/docs/navigation/breadcrumbs': breadcrumbs,
  // '/docs/navigation/button-link': buttonLink,
  '/docs/navigation/dock': dock,
  '/docs/navigation/link': link,
  '/docs/navigation/menu': menu,
  '/docs/navigation/navbar': navbar,
  '/docs/navigation/pagination': pagination,
  '/docs/navigation/steps': steps,
  '/docs/navigation/tabs': tabs,
}

// ─── Sidebar navigation ──────────────────────────────────────
export interface NavItem {
  label: string
  path: string
}

export interface NavCategory {
  category: string
  items: NavItem[]
}

export const docsNav: NavCategory[] = [
  {
    category: 'Guides',
    items: [
      { label: 'Installation', path: '/docs/guides/installation' },
      { label: 'Quick Start', path: '/docs/guides/quick-start' },
      { label: 'Theming', path: '/docs/guides/theming' },
      { label: 'Copy Components', path: '/docs/guides/copy-components' },
      { label: 'MCP Server', path: '/docs/guides/mcp' },
    ],
  },
  {
    category: 'Actions',
    items: [
      { label: 'Button', path: '/docs/actions/button' },
      { label: 'Dropdown', path: '/docs/actions/dropdown' },
      { label: 'FAB', path: '/docs/actions/fab' },
      { label: 'Modal', path: '/docs/actions/modal' },
      { label: 'Swap', path: '/docs/actions/swap' },
    ],
  },
  {
    category: 'Data Display',
    items: [
      { label: 'Accordion', path: '/docs/data-display/accordion' },
      { label: 'Avatar', path: '/docs/data-display/avatar' },
      { label: 'Badge', path: '/docs/data-display/badge' },
      { label: 'Card', path: '/docs/data-display/card' },
      { label: 'Carousel', path: '/docs/data-display/carousel' },
      { label: 'Chat', path: '/docs/data-display/chat' },
      { label: 'Collapse', path: '/docs/data-display/collapse' },
      { label: 'Countdown', path: '/docs/data-display/countdown' },
      { label: 'Diff', path: '/docs/data-display/diff' },
      { label: 'Kbd', path: '/docs/data-display/kbd' },
      { label: 'List', path: '/docs/data-display/list' },
      { label: 'Stat', path: '/docs/data-display/stat' },
      { label: 'Stats', path: '/docs/data-display/stats' },
      { label: 'Status', path: '/docs/data-display/status' },
      { label: 'Table', path: '/docs/data-display/table' },
      { label: 'Timeline', path: '/docs/data-display/timeline' },
    ],
  },
  {
    category: 'Data Input',
    items: [
      { label: 'Checkbox', path: '/docs/data-input/checkbox' },
      { label: 'Fieldset', path: '/docs/data-input/fieldset' },
      { label: 'FileInput', path: '/docs/data-input/file-input' },
      { label: 'Filter', path: '/docs/data-input/filter' },
      { label: 'InputField', path: '/docs/data-input/input-field' },
      { label: 'Label', path: '/docs/data-input/label' },
      { label: 'LabelInputValidator', path: '/docs/data-input/label-input-validator' },
      { label: 'Radio', path: '/docs/data-input/radio' },
      { label: 'Range', path: '/docs/data-input/range' },
      { label: 'Rating', path: '/docs/data-input/rating' },
      { label: 'Search', path: '/docs/data-input/search' },
      { label: 'Select', path: '/docs/data-input/select' },
      { label: 'TextArea', path: '/docs/data-input/textarea' },
    ],
  },
  {
    category: 'Feedback',
    items: [
      { label: 'Alert', path: '/docs/feedback/alert' },
      { label: 'Loading', path: '/docs/feedback/loading' },
      { label: 'Progress', path: '/docs/feedback/progress' },
      { label: 'RadialProgress', path: '/docs/feedback/radial-progress' },
      { label: 'Skeleton', path: '/docs/feedback/skeleton' },
      { label: 'Toast', path: '/docs/feedback/toast' },
      { label: 'Tooltip', path: '/docs/feedback/tooltip' },
    ],
  },
  {
    category: 'Layout',
    items: [
      { label: 'Drawer', path: '/docs/layout/drawer' },
      { label: 'Join', path: '/docs/layout/join' },
    ],
  },
  {
    category: 'Navigation',
    items: [
      { label: 'Breadcrumbs', path: '/docs/navigation/breadcrumbs' },
      // { label: 'ButtonLink', path: '/docs/navigation/button-link' },
      { label: 'Dock', path: '/docs/navigation/dock' },
      { label: 'Link', path: '/docs/navigation/link' },
      { label: 'Menu', path: '/docs/navigation/menu' },
      { label: 'Navbar', path: '/docs/navigation/navbar' },
      { label: 'Pagination', path: '/docs/navigation/pagination' },
      { label: 'Steps', path: '/docs/navigation/steps' },
      { label: 'Tabs', path: '/docs/navigation/tabs' },
    ],
  },
]
