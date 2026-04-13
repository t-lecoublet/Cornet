import type { DocPageData } from '@/types/docs'

export default {
  title: 'RadialProgress',
  description: 'Radial progress shows a circular progress indicator.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/radial-progress/',
  sections: [
    {
      title: 'Basic',
      preview: `<div class="radial-progress text-primary" style="--value:70; --size:5rem; --thickness:0.4rem;" role="progressbar">70%</div>`,
      code: `<DuRadialProgress :value="70" variant="primary" />`,
    },
    {
      title: 'Custom size and thickness',
      code: `<DuRadialProgress :value="60" variant="secondary" size="8rem" thickness="0.6rem">
  60%
</DuRadialProgress>`,
    },
    {
      title: 'Multiple variants',
      preview: `<div class="flex gap-4 flex-wrap justify-center">
  <div class="radial-progress text-primary" style="--value:70;" role="progressbar">70%</div>
  <div class="radial-progress text-success" style="--value:40;" role="progressbar">40%</div>
  <div class="radial-progress text-error" style="--value:15;" role="progressbar">15%</div>
</div>`,
      code: `<DuRadialProgress :value="70" variant="primary" />
<DuRadialProgress :value="40" variant="success" />
<DuRadialProgress :value="15" variant="error" />`,
    },
  ],
} satisfies DocPageData
