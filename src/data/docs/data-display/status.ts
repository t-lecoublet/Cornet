import type { DocPageData } from '@/types/docs'

export default {
  title: 'Status',
  description: 'Status is a small coloured indicator dot. Pass `ariaLabel` to say what it **means** — without one the dot is hidden from assistive tech rather than announced as a blank.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/status/',
  props: [
    {
      title: 'size',
      description: 'Size of the component',
      type: 'Size',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'variant',
      description: 'Color variant of the component',
      type: 'Variant',
      default: '"default"',
      options: ['default', 'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'ping',
      description: 'Animate the indicator with a ping effect',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'bounce',
      description: 'Animate the indicator with a bounce effect',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'ariaLabel',
      description: 'What the dot means — "Online", "3 unread". The automatic label derived from the variant is gone: it named the colour rather than the meaning, and sat on a plain `<div>` where no assistive tech would read it. Without an `ariaLabel` the dot is now hidden.',
      type: 'string',
    },
  ],
  classnames: {
    component: [
      { class: 'status', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    color: [
      { class: 'status-primary', desc: 'variant="primary"' },
      { class: 'status-secondary', desc: 'variant="secondary"' },
      { class: 'status-accent', desc: 'variant="accent"' },
      { class: 'status-neutral', desc: 'variant="neutral"' },
      { class: 'status-info', desc: 'variant="info"' },
      { class: 'status-success', desc: 'variant="success"' },
      { class: 'status-warning', desc: 'variant="warning"' },
      { class: 'status-error', desc: 'variant="error"' },
    ],
    size: [
      { class: 'status-xs', desc: 'size="xs"' },
      { class: 'status-sm', desc: 'size="sm"' },
      { class: 'status-md', desc: 'size="md"' },
      { class: 'status-lg', desc: 'size="lg"' },
      { class: 'status-xl', desc: 'size="xl"' },
    ],
    animation: [
      { class: 'animate-ping', desc: 'Pulsing halo — ping (a Tailwind utility, not status-ping)' },
      { class: 'animate-bounce', desc: 'Bouncing dot — bounce' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="flex items-center gap-3">
  <DuStatus variant="success" />
  <DuStatus variant="warning" />
  <DuStatus variant="error" />
  <DuStatus variant="info" />
</div>`,
      code: `<DuStatus variant="success" />
<DuStatus variant="warning" />
<DuStatus variant="error" />
<DuStatus variant="info" />`,
    },
    {
      title: 'Ping animation',
      description: 'The `ping` prop adds a pulsing ring animation.',
      preview: `<div class="flex items-center gap-3">
  <DuStatus variant="success" ping />
  <DuStatus variant="error" ping />
</div>`,
      code: `<DuStatus variant="success" ping />
<DuStatus variant="error" ping />`,
    },
    {
      title: 'Bounce animation',
      description: 'The `bounce` prop adds a bouncing animation.',
      preview: `<div class="flex items-center gap-3">
  <DuStatus variant="info" bounce />
  <span class="text-sm">Unread messages</span>
</div>`,
      code: `<DuStatus variant="info" bounce />
<span>Unread messages</span>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex items-center gap-3">
  <DuStatus variant="success" size="xs" />
  <DuStatus variant="success" size="sm" />
  <DuStatus variant="success" />
  <DuStatus variant="success" size="lg" />
  <DuStatus variant="success" size="xl" />
</div>`,
      code: `<DuStatus variant="success" size="xs" />
<DuStatus variant="success" size="sm" />
<DuStatus variant="success" />
<DuStatus variant="success" size="lg" />
<DuStatus variant="success" size="xl" />`,
    },
    {
      title: 'Inline with text',
      description: 'When the meaning is already written next to the dot, leave `ariaLabel` off — the dot is decoration, and hiding it stops a screen reader saying the same thing twice.',
      preview: `<div class="flex items-center gap-2">
  <DuStatus variant="success" />
  <span class="text-sm">Server online</span>
</div>`,
      code: `<div class="flex items-center gap-2">
  <DuStatus variant="success" />
  <span>Server online</span>
</div>`,
    },
    {
      title: 'A dot on its own needs a name',
      description: 'When the dot is the *only* thing carrying the information — a row of servers, a badge on an avatar — `ariaLabel` is what makes it readable. Name the meaning, not the colour: "Online", not "success".',
      preview: `<div class="flex items-center gap-4">
  <div class="flex items-center gap-2">
    <span class="text-sm">api-01</span>
    <DuStatus variant="success" ariaLabel="Online" />
  </div>
  <div class="flex items-center gap-2">
    <span class="text-sm">api-02</span>
    <DuStatus variant="warning" ariaLabel="Degraded" />
  </div>
  <div class="flex items-center gap-2">
    <span class="text-sm">api-03</span>
    <DuStatus variant="error" ariaLabel="Down" />
  </div>
</div>`,
      code: `<DuStatus variant="success" ariaLabel="Online" />
<DuStatus variant="warning" ariaLabel="Degraded" />
<DuStatus variant="error" ariaLabel="Down" />`,
    },
  ],
} satisfies DocPageData
