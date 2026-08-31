import type { DocPageData } from '@/types/docs'

export default {
  title: 'Menu',
  description: 'Menu renders a list of links or a set of actions, with optional sub-menus. The `role` prop decides which of the two it is — and they are not interchangeable.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/menu/',
  props: [
    {
      title: 'direction',
      description: 'Controls the orientation and responsive behavior of the menu',
      type: 'string',
      default: '"default"',
      options: ['default', 'vertical', 'horizontal', 'responsive'],
    },
    {
      title: 'size',
      description: 'Size of menu items',
      type: 'string',
      default: '"default"',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'rounded',
      description: 'Apply rounded corners to menu items',
      type: 'boolean',
      default: 'true',
    },
    {
      title: 'items',
      description: 'Menu items: `label`, `href`, `as`, `value`, `disabled`, `isTitle`, `icon`, `active`, `onClick`, `subItems`, and `checked` / `multiple` in `menu` mode. `subItems` is typed `this[]`, so your own fields survive one level down.',
      type: 'DuMenuItemData[]',
    },
    {
      title: 'role',
      description: 'What the menu **is**. `nav` (the default) is a list of links: a plain `<ul>`, no ARIA role, walked with Tab. `menu` is the APG menu pattern: `role="menu"` over presentational list items, one tab stop, arrow keys, typeahead, collapsible submenus. Picking the wrong one is the classic ARIA mistake — `role="menu"` on navigation tells a screen-reader user to expect application-menu behaviour a list of links does not have.',
      type: 'DuMenuRole',
      default: '"nav"',
      options: ['nav', 'menu'],
    },
    {
      title: 'activeItem',
      description: 'The `value` (or `label`) of the item to mark as current. In `nav` mode it renders `aria-current="page"`.',
      type: 'string',
    },
    {
      title: 'ariaLabel',
      description: 'Accessible name of the menu. Required by the APG in `menu` mode.',
      type: 'string',
    },
  ],
  slots: [
    {
      title: 'Item slots (#item, #item-{index})',
      description: 'Customize individual items with slot props: item, index',
      preview: `<DuMenu
  :items="[{ label: 'Dashboard', href: '/' }, { label: 'Settings', href: '/settings' }]"
  direction="vertical"
  class="w-64"
>
  <template #item="{ item }">
    <li>
      <a :href="item.href" class="flex items-center gap-2">
        <span class="w-2 h-2 bg-success rounded-full"></span>
        {{ item.label }}
      </a>
    </li>
  </template>
</DuMenu>`,
      code: `<DuMenu
  :items="items"
  direction="vertical"
>
  <template #item="{ item, index }">
    <li>
      <a :href="item.href" class="flex items-center gap-2">
        <span class="w-2 h-2 bg-success rounded-full"></span>
        {{ item.label }}
      </a>
    </li>
  </template>
</DuMenu>`,
    },
    {
      title: 'Title slots (#title, #title-{index})',
      description: 'Customize title/section headers with slot props: item, index',
      preview: `<DuMenu
  :items="[{ label: 'Navigation', isTitle: true }, { label: 'Dashboard', href: '/' }, { label: 'Actions', isTitle: true }, { label: 'Settings', href: '/settings' }]"
  direction="vertical"
  class="w-64"
>
  <template #title="{ item, index }">
    <li class="menu-title text-primary">
      <span class="badge badge-primary badge-sm">{{ index + 1 }}</span>
      {{ item.label }}
    </li>
  </template>
</DuMenu>`,
      code: `<DuMenu
  :items="items"
  direction="vertical"
>
  <template #title="{ item, index }">
    <li class="menu-title text-primary">
      <span class="badge badge-primary badge-sm">{{ index + 1 }}</span>
      {{ item.label }}
    </li>
  </template>
</DuMenu>`,
    },
    {
      title: 'Submenu slots (#submenu, #submenu-{index})',
      description: 'Customize items with submenus with slot props: item, index',
      preview: `<DuMenu
  :items="[{ label: 'Home', href: '/' }, { label: 'Products', subItems: [{ label: 'List', href: '/products' }, { label: 'Add', href: '/products/new' }] }]"
  direction="vertical"
  class="w-64"
>
  <template #submenu="{ item }">
    <li>
      <details open>
        <summary class="font-semibold text-accent">{{ item.label }}</summary>
        <ul>
          <li v-for="sub in item.subItems" :key="sub.label">
            <a :href="sub.href">{{ sub.label }}</a>
          </li>
        </ul>
      </details>
    </li>
  </template>
</DuMenu>`,
      code: `<DuMenu
  :items="items"
  direction="vertical"
>
  <template #submenu="{ item, index }">
    <li>
      <details open>
        <summary class="font-semibold text-accent">{{ item.label }}</summary>
        <ul>
          <li v-for="sub in item.subItems" :key="sub.label">
            <a :href="sub.href">{{ sub.label }}</a>
          </li>
        </ul>
      </details>
    </li>
  </template>
</DuMenu>`,
    },
    {
      title: 'Manual mode (slot)',
      description: 'Use default slot for manual HTML content',
      preview: `<DuMenu direction="vertical" class="w-56">
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li class="menu-disabled"><a>Disabled</a></li>
</DuMenu>`,
      code: `<DuMenu direction="vertical" class="w-56">
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li class="menu-disabled"><a>Disabled</a></li>
</DuMenu>`,
    },
  ],
  sections: [
    {
      title: 'Basic vertical',
      preview: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Settings', href: '/settings' },
  ]"
  direction="vertical"
/>`,
      code: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Settings', href: '/settings' },
  ]"
  direction="vertical"
/>`,
    },
    {
      title: 'Horizontal',
      preview: `<DuMenu
  :items="[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]"
  direction="horizontal"
/>`,
      code: `<DuMenu
  :items="[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]"
  direction="horizontal"
/>`,
    },
    {
      title: 'Responsive',
      description: 'Menu that switches from vertical on mobile to horizontal on larger screens',
      preview: `<DuMenu
  :items="[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
  ]"
  direction="responsive"
/>`,
      code: `<DuMenu
  :items="menuItems"
  direction="responsive"
/>`,
    },
    {
      title: 'With section titles',
      description: 'Use isTitle to create section headers in the menu',
      preview: `<DuMenu
  :items="[
    { label: 'Navigation', isTitle: true },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Products', href: '/products' },
    { label: 'Actions', isTitle: true },
    { label: 'Settings', href: '/settings' },
    { label: 'Logout', href: '/logout' },
  ]"
  direction="vertical"
/>`,
      code: `<DuMenu
  :items="[
    { label: 'Navigation', isTitle: true },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Products', href: '/products' },
    { label: 'Actions', isTitle: true },
    { label: 'Settings', href: '/settings' },
    { label: 'Logout', href: '/logout' },
  ]"
  direction="vertical"
/>`,
    },
    {
      title: 'With sub-menus',
      preview: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/' },
    {
      label: 'Products',
      subItems: [
        { label: 'List', href: '/products' },
        { label: 'Add new', href: '/products/new' },
      ],
    },
    { label: 'Settings', href: '/settings', disabled: true },
  ]"
  direction="vertical"
/>`,
      code: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/' },
    {
      label: 'Products',
      subItems: [
        { label: 'List', href: '/products' },
        { label: 'Add new', href: '/products/new' },
        { label: 'Categories', href: '/products/categories' },
      ],
    },
    { label: 'Settings', href: '/settings', disabled: true },
  ]"
  direction="vertical"
  :activeItem="currentRoute"
/>`,
    },
    {
      title: 'Nested sub-menus',
      description: 'Sub-menus can be deeply nested',
      preview: `<DuMenu
  :items="[
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      subItems: [
        { label: 'Web Design', href: '/web-design' },
        {
          label: 'Development',
          subItems: [
            { label: 'Frontend', href: '/frontend' },
            { label: 'Backend', href: '/backend' },
          ],
        },
      ],
    },
  ]"
  direction="vertical"
/>`,
      code: `<DuMenu
  :items="[
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      subItems: [
        { label: 'Web Design', href: '/web-design' },
        {
          label: 'Development',
          subItems: [
            { label: 'Frontend', href: '/frontend' },
            { label: 'Backend', href: '/backend' },
          ],
        },
      ],
    },
  ]"
  direction="vertical"
/>`,
    },
    {
      title: 'Active item',
      links: [
        { label: 'Vue Router docs', href: 'https://router.vuejs.org/guide/' },
      ],
      preview: `<DuMenu
  :items="[
    { label: 'Dashboard', value: '/dashboard', href: '#' },
    { label: 'Settings', value: '/settings', href: '#' },
    { label: 'Profile', value: '/profile', href: '#' },
  ]"
  activeItem="/dashboard"
  direction="vertical"
/>`,
      code: `<DuMenu
  :items="navItems"
  :activeItem="$route.path"
  direction="vertical"
/>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-4">
  <DuMenu size="xs" class="w-56">
    <li><a>XSmall</a></li>
    <li><a>Item 2</a></li>
  </DuMenu>
  <DuMenu size="sm" class="w-56">
    <li><a>Small</a></li>
    <li><a>Item 2</a></li>
  </DuMenu>
  <DuMenu size="md" class="w-56">
    <li><a>Medium</a></li>
    <li><a>Item 2</a></li>
  </DuMenu>
</div>`,
      code: `<div class="flex flex-col gap-4">
  <DuMenu size="xs" class="w-56">
    <li><a>XSmall</a></li>
    <li><a>Item 2</a></li>
  </DuMenu>
  <DuMenu size="sm" class="w-56">
    <li><a>Small</a></li>
    <li><a>Item 2</a></li>
  </DuMenu>
  <DuMenu size="md" class="w-56">
    <li><a>Medium</a></li>
    <li><a>Item 2</a></li>
  </DuMenu>
</div>`,
    },
    {
      title: 'Without rounded corners',
      preview: `<DuMenu
  :items="[
    { label: 'Item 1', href: '#' },
    { label: 'Item 2', href: '#' },
    { label: 'Item 3', href: '#' },
  ]"
  :rounded="false"
  direction="vertical"
/>`,
      code: `<DuMenu
  :items="items"
  :rounded="false"
  direction="vertical"
/>`,
    },
    {
      title: 'With icons',
      description: 'The `icon` property accepts a Vue component object or an SVG HTML string.',
      links: [
        { label: 'Heroicons', href: 'https://heroicons.com/' },
      ],
      preview: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '#', icon: '<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25\\' /></svg>' },
    { label: 'Products', href: '#', icon: '<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z\\' /></svg>' },
    { label: 'Settings', href: '#', icon: '<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z\\' /><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M15 12a3 3 0 11-6 0 3 3 0 016 0z\\' /></svg>' },
  ]"
  direction="vertical"
  class="w-56"
/>`,
      code: `<script setup lang="ts">
import HomeIcon from '@heroicons/vue/24/outline/HomeIcon'
import ShoppingBagIcon from '@heroicons/vue/24/outline/ShoppingBagIcon'
import Cog6ToothIcon from '@heroicons/vue/24/outline/Cog6ToothIcon'
</script>

<template>
  <DuMenu
    :items="[
      { label: 'Dashboard', href: '/', icon: HomeIcon },
      { label: 'Products', href: '/products', icon: ShoppingBagIcon },
      { label: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    ]"
    direction="vertical"
  />
</template>`,
    },
    {
      title: 'nav mode: a list of links',
      description: 'The default. The menu is a plain `<ul>` with no ARIA role, and every link is its own tab stop — you walk it with **Tab**, which is what a sidebar has always been. Submenus are always visible. The current item carries `aria-current="page"`.',
      preview: `<div class="flex flex-col gap-3 items-center">
  <p class="text-xs text-base-content/60">Tab through the links.</p>
  <DuMenu
    ariaLabel="Main navigation"
    activeItem="Projects"
    :items="[
      { label: 'Dashboard', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'Settings', href: '#' },
    ]"
    direction="vertical"
    class="w-48 bg-base-200"
  />
</div>`,
      code: `<DuMenu
  ariaLabel="Main navigation"
  :activeItem="route.name"
  :items="[
    { label: 'Dashboard', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Team', href: '/team' },
    { label: 'Settings', href: '/settings' },
  ]"
  direction="vertical"
/>`,
    },
    {
      title: 'menu mode: a set of actions',
      description: 'Set `role="menu"` and the menu becomes the APG menu pattern: `role="menu"` / `menuitem` over presentational list items, **one** tab stop for the whole menu, arrow keys and `Home` / `End` between items, typeahead by first letter, and `Enter` / `Space` to activate. Submenus start collapsed behind `aria-expanded` — ArrowRight opens one and focuses its first child, ArrowLeft closes it and steps back. Use it for actions, never for navigation.',
      links: [
        { label: 'APG menu pattern', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/' },
        { label: 'DuDropdown docs', href: '/docs/actions/dropdown' },
      ],
      preview: `<div class="flex flex-col gap-3 items-center">
  <p class="text-xs text-base-content/60">Tab in once, then use ↑ ↓ → and type a letter.</p>
  <DuMenu
    role="menu"
    ariaLabel="Document actions"
    :items="[
      { label: 'New' },
      { label: 'Open' },
      { label: 'Export', subItems: [{ label: 'PDF' }, { label: 'CSV' }] },
      { label: 'Delete', disabled: true },
    ]"
    direction="vertical"
    class="w-48 bg-base-200"
  />
</div>`,
      code: `<DuMenu
  role="menu"
  ariaLabel="Document actions"
  :items="[
    { label: 'New', onClick: create },
    { label: 'Open', onClick: open },
    { label: 'Export', subItems: [
      { label: 'PDF', onClick: exportPdf },
      { label: 'CSV', onClick: exportCsv },
    ] },
    { label: 'Delete', disabled: true },
  ]"
  direction="vertical"
/>`,
    },
    {
      title: 'Menu button (dropdown + menu)',
      description: 'A menu that appears from a button is the APG menu-button pattern: pair `DuDropdown` with `<DuMenu role="menu">`. The trigger gets `aria-haspopup` and `aria-expanded` from `triggerProps`; Escape closes the panel and hands focus back.',
      links: [
        { label: 'APG menu button pattern', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/' },
      ],
      preview: `<DuDropdown>
  <template #trigger="{ triggerProps }">
    <DuButton soft v-bind="triggerProps">Actions</DuButton>
  </template>
  <DuMenu
    role="menu"
    ariaLabel="Actions"
    :items="[{ label: 'Edit' }, { label: 'Duplicate' }, { label: 'Archive' }]"
    class="w-40"
  />
</DuDropdown>`,
      code: `<DuDropdown>
  <template #trigger="{ triggerProps }">
    <DuButton v-bind="triggerProps">Actions</DuButton>
  </template>
  <DuMenu
    role="menu"
    ariaLabel="Actions"
    :items="[
      { label: 'Edit', onClick: edit },
      { label: 'Duplicate', onClick: duplicate },
      { label: 'Archive', onClick: archive },
    ]"
    class="w-40"
  />
</DuDropdown>`,
    },
    {
      title: 'Checkable items',
      description: 'In `menu` mode, an item with `multiple: true` **and a `value`** renders as `role="menuitemcheckbox"` carrying `aria-checked` — a real announced state, where the hidden `<input type="checkbox">` it replaces announced nothing.',
      preview: `<DuMenu
  role="menu"
  ariaLabel="View options"
  :items="[
    { label: 'Show grid', value: 'grid', multiple: true, checked: true },
    { label: 'Show rulers', value: 'rulers', multiple: true },
    { label: 'Snap to grid', value: 'snap', multiple: true },
  ]"
  direction="vertical"
  class="w-48 bg-base-200"
/>`,
      code: `<DuMenu
  role="menu"
  ariaLabel="View options"
  :items="[
    { label: 'Show grid', value: 'grid', multiple: true, checked: showGrid },
    { label: 'Show rulers', value: 'rulers', multiple: true, checked: showRulers },
  ]"
  direction="vertical"
  @item-click="toggleOption"
/>`,
    },
    {
      title: 'With onClick per item',
      description: 'Attach an `onClick` callback on each item. Can be combined with `href` or used standalone.',
      script: `
      const last = ref('—')
      return { last }`,
      preview: `<div class="flex flex-col gap-3">
  <DuMenu
    :items="[
      { label: 'Save', onClick: () => { last.value = 'Save' } },
      { label: 'Duplicate', onClick: () => { last.value = 'Duplicate' } },
      { label: 'Delete', onClick: () => { last.value = 'Delete' } },
    ]"
    direction="vertical"
    class="w-48"
  />
  <p class="text-sm text-center text-base-content/60">Clicked: <strong class="text-base-content">{{ last }}</strong></p>
</div>`,
      code: `<DuMenu
  :items="[
    { label: 'Save', onClick: () => save() },
    { label: 'Duplicate', onClick: () => duplicate() },
    { label: 'Delete', onClick: () => confirmDelete() },
  ]"
  direction="vertical"
/>`,
    },
    {
      title: '@item-click event',
      description: 'The `@item-click` event fires on any top-level item click with the `DuMenuItemData` as payload.',
      links: [
        { label: 'Vue events docs', href: 'https://vuejs.org/guide/components/events.html' },
      ],
      script: `
      const selected = ref('—')
      return { selected }`,
      preview: `<div class="flex flex-col gap-3">
  <DuMenu
    :items="[
      { label: 'Dashboard', value: 'dashboard' },
      { label: 'Products', value: 'products' },
      { label: 'Settings', value: 'settings' },
    ]"
    direction="vertical"
    class="w-48"
    @item-click="(item) => selected = item.label"
  />
  <p class="text-sm text-center text-base-content/60">Active: <strong class="text-base-content">{{ selected }}</strong></p>
</div>`,
      code: `<script setup lang="ts">
import type { DuMenuItemData } from 'cornet-ui/types'

function handleItemClick(item: DuMenuItemData) {
  // item.label, item.value, item.href…
  router.push(item.href)
}
</script>

<template>
  <DuMenu
    :items="items"
    direction="vertical"
    @item-click="handleItemClick"
  />
</template>`,
    },
    {
      title: '@sub-item-click event',
      description: 'The `@sub-item-click` event fires when a submenu item is clicked.',
      script: `
      const selected = ref('—')
      return { selected }`,
      preview: `<div class="flex flex-col gap-3">
  <DuMenu
    :items="[
      { label: 'Dashboard' },
      { label: 'Products', subItems: [{ label: 'List', value: 'list' }, { label: 'Add new', value: 'add' }] },
      { label: 'Settings' },
    ]"
    direction="vertical"
    class="w-48"
    @sub-item-click="(item) => selected = item.label"
  />
  <p class="text-sm text-center text-base-content/60">Sub-item: <strong class="text-base-content">{{ selected }}</strong></p>
</div>`,
      code: `<DuMenu
  :items="items"
  direction="vertical"
  @sub-item-click="(item) => router.push(item.href)"
/>`,
    },
    {
      title: 'Custom styled items with slots',
      preview: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Settings', href: '#', disabled: true },
  ]"
  direction="vertical"
  class="w-64"
>
  <template #item="{ item }">
    <li>
      <a :href="item.href" class="flex items-center justify-between">
        <span>{{ item.label }}</span>
        <span v-if="item.disabled" class="badge badge-error badge-xs">Disabled</span>
      </a>
    </li>
  </template>
</DuMenu>`,
      code: `<DuMenu :items="items" direction="vertical">
  <template #item="{ item }">
    <li>
      <a :href="item.href" class="flex items-center justify-between">
        <span>{{ item.label }}</span>
        <span v-if="item.badge" class="badge badge-sm">{{ item.badge }}</span>
      </a>
    </li>
  </template>
</DuMenu>`,
    },
  ],
} satisfies DocPageData
