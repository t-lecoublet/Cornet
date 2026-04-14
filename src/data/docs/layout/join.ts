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
      preview: `<DuJoin direction="horizontal">
  <DuButton customClass="join-item">Left</DuButton>
  <DuButton customClass="join-item">Center</DuButton>
  <DuButton customClass="join-item">Right</DuButton>
</DuJoin>`,
      code: `<DuJoin direction="horizontal">
  <DuButton customClass="join-item">Left</DuButton>
  <DuButton customClass="join-item">Center</DuButton>
  <DuButton customClass="join-item">Right</DuButton>
</DuJoin>`,
    },
    {
      title: 'Input + button (search bar)',
      preview: `<DuJoin direction="horizontal" class="w-72">
  <DuInputField placeholder="Search..." customClass="join-item flex-1" />
  <DuButton variant="primary" customClass="join-item">Go</DuButton>
</DuJoin>`,
      code: `<DuJoin direction="horizontal">
  <DuInputField v-model="query" class="join-item flex-1" placeholder="Search..." />
  <DuButton variant="primary" customClass="join-item">Go</DuButton>
</DuJoin>`,
    },
    {
      title: 'Vertical group',
      preview: `<DuJoin direction="vertical">
  <DuButton customClass="join-item">Top</DuButton>
  <DuButton customClass="join-item">Middle</DuButton>
  <DuButton customClass="join-item">Bottom</DuButton>
</DuJoin>`,
      code: `<DuJoin direction="vertical">
  <DuButton customClass="join-item">Top</DuButton>
  <DuButton customClass="join-item">Middle</DuButton>
  <DuButton customClass="join-item">Bottom</DuButton>
</DuJoin>`,
    },
  ],
} satisfies DocPageData
