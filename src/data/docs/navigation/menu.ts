import type { DocPageData } from '@/types/docs'

export default {
  title: 'Menu',
  description: 'Menu is used for navigation and list-style layouts with optional sub-menus.',
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
      description: 'Array of menu items with label, href, disabled, isTitle, and subItems properties',
      type: 'MenuItem[]',
    },
    {
      title: 'activeItem',
      description: 'Currently active item value to highlight',
      type: 'string',
    },
    {
      title: 'onItemClick',
      description: 'Callback when a top-level item is clicked',
      type: '(item: MenuItem) => void',
    },
    {
      title: 'onSubItemClick',
      description: 'Callback when a sub-item is clicked',
      type: '(item: MenuItem) => void',
    },
  ],
  slots: [
    {
      title: 'Item slots (#item, #item-{index})',
      description: 'Customize individual items with slot props: item, index',
      preview: `<DuMenu
  :items="items"
  direction="vertical"
  class="w-64"
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
  :items="items"
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
  :items="items"
  direction="vertical"
  class="w-64"
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
      description: 'Icons can be added via the icon property (SVG string or component)',
      preview: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/', icon: '<svg class=\"w-5 h-5\"><path d=\"..."/></svg>' },
    { label: 'Products', href: '/products', icon: '<svg class=\"w-5 h-5\"><path d=\"..."/></svg>' },
    { label: 'Settings', href: '/settings', icon: '<svg class=\"w-5 h-5\"><path d=\"..."/></svg>' },
  ]"
  direction="vertical"
/>`,
      code: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/', icon: dashboardIcon },
    { label: 'Products', href: '/products', icon: productsIcon },
    { label: 'Settings', href: '/settings', icon: settingsIcon },
  ]"
  direction="vertical"
/>`,
    },
    {
      title: 'With onClick handler',
      description: 'Handle item clicks with onClick callback in items',
      preview: `<DuMenu
  :items="[
    { label: 'Save', href: '#', onClick: () => save() },
    { label: 'Delete', href: '#', onClick: () => confirmDelete() },
  ]"
  direction="vertical"
/>`,
      code: `<DuMenu
  :items="[
    { label: 'Save', href: '#', onClick: () => save() },
    { label: 'Delete', href: '#', onClick: () => confirmDelete() },
  ]"
  direction="vertical"
/>`,
    },
    {
      title: 'With itemClick callback',
      description: 'Use onItemClick to handle any top-level item click',
      preview: `<DuMenu
  :items="items"
  direction="vertical"
  @item-click="handleItemClick"
/>`,
      code: `<DuMenu
  :items="items"
  direction="vertical"
  @item-click="handleItemClick"
/>`,
    },
    {
      title: 'With subItemClick callback',
      description: 'Use onSubItemClick to handle clicks on submenu items',
      preview: `<DuMenu
  :items="items"
  direction="vertical"
  @sub-item-click="handleSubItemClick"
/>`,
      code: `<DuMenu
  :items="items"
  direction="vertical"
  @sub-item-click="handleSubItemClick"
/>`,
    },
    {
      title: 'Custom styled items with slots',
      preview: `<DuMenu
  :items="items"
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
      code: `<DuMenu
  :items="items"
  direction="vertical"
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
    },
  ],
} satisfies DocPageData
