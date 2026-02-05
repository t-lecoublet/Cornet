import type { Meta, StoryObj } from '@storybook/vue3'
import DuDrawer from './du-drawer.vue'
import DuButton from '../../Actions/du-button/du-button.vue'
import DuNavbar from '../../Navigation/du-navbar/du-navbar.vue'
import DuMenu from '../../Navigation/du-menu/du-menu.vue'
import { ref } from 'vue'

const meta: Meta<typeof DuDrawer> = {
    title: 'Components/Layout/Drawer',
    component: DuDrawer,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        position: {
            control: { type: 'select' },
            options: ['start', 'end'],
        },
        open: { control: 'boolean' },
        responsive: { control: 'boolean' },
        alwaysOpenOnLarge: { control: 'boolean' },
        iconOnly: { control: 'boolean' },
        sidebarClass: { control: 'text' },
        sidebarWrapperClass: { control: 'text' },
        contentClass: { control: 'text' },
        overlayClass: { control: 'text' },
    },
}

export default meta
type Story = StoryObj<typeof DuDrawer>

const basicTplStr = `
<DuDrawer v-bind="args">
  <template #content>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <DuButton as="label" for="my-drawer" variant="primary">
        Open drawer
      </DuButton>
      <p class="mt-4">Page content here</p>
    </div>
  </template>
  
  <template #sidebar>
    <DuMenu class="w-full">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <li><a>Sidebar Item 3</a></li>
    </DuMenu>
  </template>
</DuDrawer>
`

const basicSetupStr = `
<script setup>
// No setup needed for basic usage
</script>
`

const withItemsTplStr = `
<DuDrawer :items="items" id="my-drawer-items">
  <template #content>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <DuButton as="label" for="my-drawer-items" variant="primary">
        Open drawer with items
      </DuButton>
    </div>
  </template>
</DuDrawer>
`

const withItemsTplStrAndCustomMenu = `
<DuDrawer :items="items" id="my-drawer-items-icons">
  <!-- See /docs/components-navigation-menu for custom item examples -->
  <template #item="{ item, index }">
    <li :class="{ 'menu-disabled': item.disabled }">
      <a :href="item.href" class="flex items-center gap-2">
        <span v-if="item.icon" class="w-5 h-5">
          <component :is="item.icon" class="w-5 h-5" />
        </span>
        <span v-else class="w-2 h-2 bg-success rounded-full"></span>
        {{ item.label }} test
      </a>
    </li>
  </template>
  <template #content>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <DuButton as="label" for="my-drawer-items-icons" variant="primary">
        Open drawer with items
      </DuButton>
    </div>
  </template>
</DuDrawer>
`

const withItemsSetupStr = `
<script setup>
const items = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]
</script>
`

const drawerEndTplStr = `
<DuDrawer position="end" id="my-drawer-end">
  <template #content>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <DuButton as="label" for="my-drawer-end" variant="primary">
        Open drawer from right
      </DuButton>
    </div>
  </template>
  
  <template #sidebar>
    <DuMenu class="w-full">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <li><a>Sidebar Item 3</a></li>
    </DuMenu>
  </template>
</DuDrawer>
`

const drawerEndSetupStr = `
<script setup>
// Drawer opens from the right side with position="end"
</script>
`

const alwaysOpenTplStr = `
<DuDrawer alwaysOpenOnLarge id="my-drawer-open">
  <template #content>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <DuButton as="label" for="my-drawer-open" variant="primary" customClass="lg:hidden">
        Open drawer
      </DuButton>
      <p class="mt-4">Sidebar is always visible on large screens</p>
    </div>
  </template>
  
  <template #sidebar>
    <DuMenu class="w-full">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <li><a>Sidebar Item 3</a></li>
    </DuMenu>
  </template>
</DuDrawer>
`

const alwaysOpenSetupStr = `
<script setup>
// Sidebar is always visible on large screens (lg breakpoint)
// Can be toggled on small screens
</script>
`

const withNavbarTplStr = `
<DuDrawer id="my-drawer-navbar">
  <template #content>
    <div class="flex flex-col min-h-screen">
      <!-- Navbar -->
      <DuNavbar>
        <template #start>
          <div class="flex-none lg:hidden">
            <DuButton as="label" for="my-drawer-navbar" aria-label="open sidebar" variant="ghost" square>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </DuButton>
          </div>
          <div class="flex-1 px-2 mx-2">Navbar Title</div>
        </template>
        <template #end>
          <div class="flex-none hidden lg:block">
            <DuMenu class="w-full" direction="horizontal">
              <li><a>Navbar Item 1</a></li>
              <li><a>Navbar Item 2</a></li>
            </DuMenu>
          </div>
        </template>
      </DuNavbar>
      
      <!-- Page Content -->
      <div class="flex justify-center items-center grow">
        <p>Content</p>
      </div>
    </div>
  </template>
  
  <template #sidebar>
    <DuMenu class="w-full">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <li><a>Sidebar Item 3</a></li>
    </DuMenu>
  </template>
</DuDrawer>
`

const withNavbarSetupStr = `
<script setup>
import DuNavbar from '../../Navigation/du-navbar/du-navbar.vue'
import DuMenu from '../../Navigation/du-menu/du-menu.vue'
// Navbar with drawer for mobile, menu for desktop
</script>
`

const controlledTplStr = `
<div>
  <DuButton @click="isOpen = !isOpen">
    {{ isOpen ? 'Close' : 'Open' }} Drawer
  </DuButton>
  
  <DuDrawer v-model="isOpen" id="my-drawer-controlled">
    <template #content>
      <div class="flex flex-col items-center justify-center min-h-screen">
        <p>Drawer is {{ isOpen ? 'open' : 'closed' }}</p>
        <DuButton @click="isOpen = !isOpen" customClass="mt-4">
          Toggle Drawer
        </DuButton>
      </div>
    </template>
    
    <template #sidebar>
      <DuMenu class="w-full">
        <li><a @click="isOpen = false">Close drawer</a></li>
        <li><a>Sidebar Item 2</a></li>
        <li><a>Sidebar Item 3</a></li>
      </DuMenu>
    </template>
  </DuDrawer>
</div>
`

const controlledSetupStr = `
<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>
`

const customClassesTplStr = `
<DuDrawer 
  id="my-drawer-custom"
  sidebarClass="bg-primary text-primary-content"
  contentClass="bg-base-300"
>
  <template #content>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <DuButton as="label" for="my-drawer-custom" variant="primary">
        Open custom drawer
      </DuButton>
    </div>
  </template>
  
  <template #sidebar>
    <DuMenu class="w-full">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <li><a>Sidebar Item 3</a></li>
    </DuMenu>
  </template>
</DuDrawer>
`

const customClassesSetupStr = `
<script setup>
// Custom classes for sidebar and content
</script>
`

export const Basic: Story = {
    args: {
        id: 'my-drawer',
    },
    render: (args) => ({
        components: { DuDrawer, DuButton, DuMenu },
        setup() {
            return { args }
        },
        template: basicTplStr,
    }),
    parameters: {
        docs: {
            source: {
                code: basicSetupStr + '\n\n' + basicTplStr,
            },
        },
    },
}

export const WithItems: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Contact', href: '#contact' },
        ],
    },
    render: (args) => ({
        components: { DuDrawer, DuButton },
        setup() {
            return { args, items: args.items }
        },
        template: withItemsTplStr,
    }),
    parameters: {
        docs: {
            source: {
                code: withItemsSetupStr + '\n\n' + withItemsTplStr,
            },
        },
    },
}

export const WithItemsAndCustomMenu: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Contact', href: '#contact' },
        ],
    },
    render: (args) => ({
        components: { DuDrawer, DuButton },
        setup() {
            return { args, items: args.items }
        },
        template: withItemsTplStrAndCustomMenu,
    }),
    parameters: {
        docs: {
            source: {
                code: withItemsSetupStr + '\n\n' + withItemsTplStrAndCustomMenu,
            },
        },
    },
}

export const DrawerEnd: Story = {
    args: {
        position: 'end',
    },
    render: (args) => ({
        components: { DuDrawer, DuButton, DuMenu },
        setup() {
            return { args }
        },
        template: drawerEndTplStr,
    }),
    parameters: {
        docs: {
            source: {
                code: drawerEndSetupStr + '\n\n' + drawerEndTplStr,
            },
        },
    },
}

export const AlwaysOpenOnLarge: Story = {
    args: {
        alwaysOpenOnLarge: true,
    },
    render: (args) => ({
        components: { DuDrawer, DuButton, DuMenu },
        setup() {
            return { args }
        },
        template: alwaysOpenTplStr,
    }),
    parameters: {
        docs: {
            source: {
                code: alwaysOpenSetupStr + '\n\n' + alwaysOpenTplStr,
            },
        },
    },
}

export const WithNavbar: Story = {
    args: {},
    render: (args) => ({
        components: { DuDrawer, DuNavbar, DuButton, DuMenu },
        setup() {
            return { args }
        },
        template: withNavbarTplStr,
    }),
    parameters: {
        docs: {
            source: {
                code: withNavbarSetupStr + '\n\n' + withNavbarTplStr,
            },
        },
    },
}

export const Controlled: Story = {
    args: {},
    render: (args) => ({
        components: { DuDrawer, DuButton, DuMenu },
        setup() {
            const isOpen = ref(false)
            return { args, isOpen }
        },
        template: controlledTplStr,
    }),
    parameters: {
        docs: {
            source: {
                code: controlledSetupStr + '\n\n' + controlledTplStr,
            },
        },
    },
}

export const CustomClasses: Story = {
    args: {
        sidebarClass: 'bg-primary text-primary-content',
        contentClass: 'bg-base-300',
    },
    render: (args) => ({
        components: { DuDrawer, DuButton, DuMenu },
        setup() {
            return { args }
        },
        template: customClassesTplStr,
    }),
    parameters: {
        docs: {
            source: {
                code: customClassesSetupStr + '\n\n' + customClassesTplStr,
            },
        },
    },
}

const iconOnlyTplStr = `
<DuDrawer id="icon-only-drawer" alwaysOpenOnLarge iconOnly>
  <template #content>
    <DuNavbar customClass="bg-base-300">
      <template #start>
        <DuButton as="label" for="icon-only-drawer" aria-label="toggle sidebar" variant="ghost" square>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="inline-block size-5">
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </DuButton>
        <span class="px-4">Navbar Title</span>
      </template>
    </DuNavbar>
    <div class="p-4">Page Content</div>
  </template>
  
  <template #sidebar>
    <DuMenu class="w-full grow">
      <li>
        <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="inline-block size-5">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span class="is-drawer-close:hidden">Home</span>
        </button>
      </li>
      <li>
        <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Analytics">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="inline-block size-5">
            <path d="M3 3v18h18"></path>
            <path d="M20 18v3"></path>
            <path d="M16 16v5"></path>
            <path d="M12 13v8"></path>
            <path d="M8 21v-6"></path>
          </svg>
          <span class="is-drawer-close:hidden">Analytics</span>
        </button>
      </li>
      <li>
        <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="inline-block size-5">
            <path d="M20 7h-9"></path>
            <path d="M14 17H5"></path>
            <circle cx="17" cy="17" r="3"></circle>
            <circle cx="7" cy="7" r="3"></circle>
          </svg>
          <span class="is-drawer-close:hidden">Settings</span>
        </button>
      </li>
    </DuMenu>
  </template>
</DuDrawer>
`

const iconOnlySetupStr = `
<script setup>
// Icon-only collapsible drawer
// Uses is-drawer-close: and is-drawer-open: variants
// - is-drawer-close:hidden hides text when closed
// - is-drawer-close:tooltip shows tooltip when closed
// - Sidebar width transitions between w-14 (closed) and w-64 (open)
</script>
`

export const IconOnlyCollapsible: Story = {
    args: {
        alwaysOpenOnLarge: true,
        iconOnly: true,
    },
    render: (args) => ({
        components: { DuDrawer, DuButton, DuMenu, DuNavbar },
        setup() {
            return { args }
        },
        template: iconOnlyTplStr,
    }),
    parameters: {
        docs: {
            source: {
                code: iconOnlySetupStr + '\n\n' + iconOnlyTplStr,
            },
        },
    },
}
