import type { DocPageData } from '@/types/docs'

export default {
  title: 'Kbd',
  description: 'Kbd is used to display keyboard shortcuts in a styled badge.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/kbd/',
  props: [
    {
      title: 'size',
      description: 'Size of the key cap',
      type: 'Size',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  ],
  classnames: {
    component: [
      { class: 'kbd', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    size: [
      { class: 'kbd-xs', desc: 'size="xs"' },
      { class: 'kbd-sm', desc: 'size="sm"' },
      { class: 'kbd-md', desc: 'size="md"' },
      { class: 'kbd-lg', desc: 'size="lg"' },
      { class: 'kbd-xl', desc: 'size="xl"' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuKbd>K</DuKbd>`,
      code: `<DuKbd>K</DuKbd>`,
    },
    {
      title: 'Key combination',
      preview: `<div class="flex items-center gap-1">
  <DuKbd>⌘</DuKbd>
  <span class="text-sm">+</span>
  <DuKbd>K</DuKbd>
</div>`,
      code: `<DuKbd>⌘</DuKbd>
<span>+</span>
<DuKbd>K</DuKbd>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex items-center gap-2">
  <DuKbd size="xs">Ctrl</DuKbd>
  <DuKbd size="sm">Ctrl</DuKbd>
  <DuKbd size="md">Ctrl</DuKbd>
  <DuKbd size="lg">Ctrl</DuKbd>
</div>`,
      code: `<DuKbd size="xs">Ctrl</DuKbd>
<DuKbd size="sm">Ctrl</DuKbd>
<DuKbd size="md">Ctrl</DuKbd>
<DuKbd size="lg">Ctrl</DuKbd>`,
    },
    {
      title: 'Inline with text',
      preview: `<p class="text-sm">Press <DuKbd size="sm">Ctrl</DuKbd> + <DuKbd size="sm">C</DuKbd> to copy.</p>`,
      code: `<p>Press <DuKbd size="sm">Ctrl</DuKbd> + <DuKbd size="sm">C</DuKbd> to copy.</p>`,
    },
  ],
} satisfies DocPageData
