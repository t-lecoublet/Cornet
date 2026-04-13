import type { DocPageData } from '@/types/docs'

export default {
  title: 'Kbd',
  description: 'Kbd is used to display keyboard shortcuts in a styled badge.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/kbd/',
  classnames: {
    size: [
      { class: 'kbd-xs', desc: 'Extra small' },
      { class: 'kbd-sm', desc: 'Small' },
      { class: 'kbd-md', desc: 'Medium', default: true },
      { class: 'kbd-lg', desc: 'Large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<kbd class="kbd">K</kbd>`,
      code: `<DuKbd>K</DuKbd>`,
    },
    {
      title: 'Key combination',
      preview: `<div class="flex items-center gap-1">
  <kbd class="kbd">⌘</kbd>
  <span class="text-sm">+</span>
  <kbd class="kbd">K</kbd>
</div>`,
      code: `<DuKbd>⌘</DuKbd>
<span>+</span>
<DuKbd>K</DuKbd>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex items-center gap-2">
  <kbd class="kbd kbd-xs">Ctrl</kbd>
  <kbd class="kbd kbd-sm">Ctrl</kbd>
  <kbd class="kbd kbd-md">Ctrl</kbd>
  <kbd class="kbd kbd-lg">Ctrl</kbd>
</div>`,
      code: `<DuKbd size="xs">Ctrl</DuKbd>
<DuKbd size="sm">Ctrl</DuKbd>
<DuKbd size="md">Ctrl</DuKbd>
<DuKbd size="lg">Ctrl</DuKbd>`,
    },
    {
      title: 'Inline with text',
      preview: `<p class="text-sm">Press <kbd class="kbd kbd-sm">Ctrl</kbd> + <kbd class="kbd kbd-sm">C</kbd> to copy.</p>`,
      code: `<p>Press <DuKbd size="sm">Ctrl</DuKbd> + <DuKbd size="sm">C</DuKbd> to copy.</p>`,
    },
  ],
} satisfies DocPageData
