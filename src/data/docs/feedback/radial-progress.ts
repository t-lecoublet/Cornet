import type { DocPageData } from '@/types/docs'

export default {
  title: 'RadialProgress',
  description: 'Radial progress shows a circular progress indicator.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/radial-progress/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuRadialProgress :value="70" variant="primary" />`,
      code: `<DuRadialProgress :value="70" variant="primary" />`,
    },
    {
      title: 'Custom size and thickness',
      preview: `<DuRadialProgress :value="60" variant="secondary" size="8rem" thickness="0.6rem">
  60%
</DuRadialProgress>`,
      code: `<DuRadialProgress :value="60" variant="secondary" size="8rem" thickness="0.6rem">
  60%
</DuRadialProgress>`,
    },
    {
      title: 'Multiple variants',
      preview: `<div class="flex gap-4 flex-wrap justify-center">
  <DuRadialProgress :value="70" variant="primary" />
  <DuRadialProgress :value="40" variant="success" />
  <DuRadialProgress :value="15" variant="error" />
</div>`,
      code: `<DuRadialProgress :value="70" variant="primary" />
<DuRadialProgress :value="40" variant="success" />
<DuRadialProgress :value="15" variant="error" />`,
    },
  ],
} satisfies DocPageData
