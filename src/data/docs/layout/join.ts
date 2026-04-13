import type { DocPageData } from '@/types/docs'

export default {
  title: 'Join',
  description: 'Join merges adjacent elements visually, removing gaps and borders between them.',
  category: 'Layout',
  source: 'https://daisyui.com/components/join/',
  classnames: {
    modifier: [
      { class: 'join-horizontal', desc: 'Horizontal group', default: true },
      { class: 'join-vertical', desc: 'Vertical group' },
    ],
  },
  sections: [
    {
      title: 'Button group',
      preview: `<div class="join">
  <button class="btn join-item">Left</button>
  <button class="btn join-item">Center</button>
  <button class="btn join-item">Right</button>
</div>`,
      code: `<DuJoin direction="horizontal">
  <DuButton customClass="join-item">Left</DuButton>
  <DuButton customClass="join-item">Center</DuButton>
  <DuButton customClass="join-item">Right</DuButton>
</DuJoin>`,
    },
    {
      title: 'Input + button (search bar)',
      preview: `<div class="join w-72">
  <input class="input join-item flex-1" placeholder="Search..." />
  <button class="btn btn-primary join-item">Go</button>
</div>`,
      code: `<DuJoin direction="horizontal">
  <DuInputField v-model="query" class="join-item flex-1" placeholder="Search..." />
  <DuButton variant="primary" customClass="join-item">Go</DuButton>
</DuJoin>`,
    },
    {
      title: 'Vertical group',
      preview: `<div class="join join-vertical">
  <button class="btn join-item">Top</button>
  <button class="btn join-item">Middle</button>
  <button class="btn join-item">Bottom</button>
</div>`,
      code: `<DuJoin direction="vertical">
  <DuButton customClass="join-item">Top</DuButton>
  <DuButton customClass="join-item">Middle</DuButton>
  <DuButton customClass="join-item">Bottom</DuButton>
</DuJoin>`,
    },
  ],
} satisfies DocPageData
