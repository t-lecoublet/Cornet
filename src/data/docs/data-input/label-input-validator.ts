import type { DocPageData } from '@/types/docs'

export default {
  title: 'LabelInputValidator',
  description: 'Label + input combo with built-in HTML5 constraint validation and an optional hint message. Supports floating-label, classic label, and input-with-icon layouts.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/validator/',
  props: [
    {
      title: 'type',
      description: 'Label layout style — same values as DuLabel',
      type: '"floating-label" | "label" | "input" | "fieldset-label"',
      default: '"floating-label"',
    },
    {
      title: 'inputType',
      description: 'HTML input type',
      type: '"text" | "email" | "password" | "number" | "date" | "tel" | "url" | "search" | ...',
      default: '"text"',
    },
    {
      title: 'placeholder',
      description: 'Input placeholder — required for the floating-label animation to work',
      type: 'string',
      default: '""',
    },
    {
      title: 'required',
      description: 'Makes the field mandatory (HTML required attribute)',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'pattern',
      description: 'Regex pattern for HTML5 constraint validation',
      type: 'string',
    },
    {
      title: 'minlength',
      description: 'Minimum number of characters',
      type: 'number',
    },
    {
      title: 'maxlength',
      description: 'Maximum number of characters',
      type: 'number',
    },
    {
      title: 'title',
      description: 'Tooltip shown by the browser when validation fails',
      type: 'string',
    },
    {
      title: 'variant',
      description: 'Input border color on focus',
      type: 'Variant',
      default: '"default"',
    },
    {
      title: 'size',
      description: 'Input size',
      type: 'Size',
      default: '"default"',
    },
    {
      title: 'ghost',
      description: 'Transparent ghost style',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'invalid',
      description: 'Force error styling on the input regardless of native validation state',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'disabled',
      description: 'Disables the input',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'suggestionName',
      description: 'HTML datalist id to enable native autocomplete suggestions',
      type: 'string',
    },
    {
      title: 'suggestionList',
      description: 'Array of suggestion strings for the datalist',
      type: 'string[]',
    },
  ],
  slots: [
    {
      title: 'Default slot',
      description: 'Label text. For `floating-label` it is wrapped in a `<span>` rendered after the input so the CSS float animation works. For other types it appears before the input.',
      preview: `<div class="flex flex-col gap-4 w-72">
  <DuLabelInputValidator placeholder="your@email.com" inputType="email">
    Email
  </DuLabelInputValidator>
  <DuLabelInputValidator type="label" placeholder="John Doe">
    Full name
  </DuLabelInputValidator>
</div>`,
      code: `<!-- floating-label (default): label floats above input on focus -->
<DuLabelInputValidator v-model="email" inputType="email" placeholder="your@email.com" required>
  Email
</DuLabelInputValidator>

<!-- label: text appears above the input -->
<DuLabelInputValidator v-model="name" type="label" placeholder="John Doe" required>
  Full name
</DuLabelInputValidator>`,
    },
    {
      title: 'Slot #before',
      description: 'Rendered before the input — typically a leading icon, used with `type="input"`.',
      preview: `<DuLabelInputValidator type="input" placeholder="Username" class="w-72">
  <template #before>
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  </template>
</DuLabelInputValidator>`,
      code: `<DuLabelInputValidator v-model="username" type="input" placeholder="Username">
  <template #before>
    <svg class="h-[1em] opacity-50"><!-- user icon --></svg>
  </template>
</DuLabelInputValidator>`,
    },
    {
      title: 'Slot #after',
      description: 'Rendered after the input — useful for a show/hide toggle on a password field.',
      code: `<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <DuLabelInputValidator
    v-model="password"
    type="input"
    :inputType="show ? 'text' : 'password'"
    placeholder="Password"
  >
    <template #before>
      <svg class="h-[1em] opacity-50"><!-- lock icon --></svg>
    </template>
    <template #after>
      <button type="button" @click="show = !show" class="opacity-50">
        {{ show ? '🙈' : '👁' }}
      </button>
    </template>
  </DuLabelInputValidator>
</template>`,
    },
    {
      title: 'Slot #hint',
      description: 'Renders a `<p class="validator-hint">` below the input. DaisyUI shows it only when the field fails HTML5 constraint validation (after user interaction).',
      preview: `<div class="flex flex-col gap-4 w-72">
  <DuLabelInputValidator inputType="email" placeholder="your@email.com" required>
    Email
    <template #hint>Please enter a valid email address.</template>
  </DuLabelInputValidator>
  <DuLabelInputValidator type="label" placeholder="Min 3 chars" required :minlength="3">
    Username
    <template #hint>Minimum 3 characters required.</template>
  </DuLabelInputValidator>
</div>`,
      code: `<DuLabelInputValidator
  v-model="email"
  inputType="email"
  placeholder="your@email.com"
  required
>
  Email
  <template #hint>Please enter a valid email address.</template>
</DuLabelInputValidator>`,
    },
  ],
  sections: [
    {
      title: 'Floating label (default)',
      description: 'The default `type="floating-label"` animates the label as a placeholder that floats above the input on focus. The `placeholder` prop must be non-empty for the animation to trigger.',
      links: [
        { label: 'DaisyUI floating-label', href: 'https://daisyui.com/components/label/#floating-label' },
        { label: 'MDN constraint validation', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation' },
        { label: 'Vue v-model', href: 'https://vuejs.org/guide/components/v-model.html' },
      ],
      preview: `<div class="flex flex-col gap-4 w-72">
  <DuLabelInputValidator inputType="email" placeholder="your@email.com">
    Email
  </DuLabelInputValidator>
  <DuLabelInputValidator placeholder="John Doe">
    Full name
  </DuLabelInputValidator>
  <DuLabelInputValidator inputType="tel" placeholder="+33 6 00 00 00 00">
    Phone
  </DuLabelInputValidator>
</div>`,
      code: `<DuLabelInputValidator
  v-model="email"
  inputType="email"
  placeholder="your@email.com"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
  title="Enter a valid email address"
>
  Email
  <template #hint>Invalid email address.</template>
</DuLabelInputValidator>`,
    },
    {
      title: 'Label type',
      description: 'With `type="label"`, the label text is placed above the input in a classic stacked layout.',
      links: [
        { label: 'DuLabel docs', href: '/docs/data-input/label' },
      ],
      preview: `<div class="flex flex-col gap-3 w-72">
  <DuLabelInputValidator type="label" inputType="email" placeholder="your@email.com">
    Email
  </DuLabelInputValidator>
  <DuLabelInputValidator type="label" placeholder="John Doe">
    Full name
  </DuLabelInputValidator>
  <DuLabelInputValidator type="label" inputType="password" placeholder="••••••••">
    Password
  </DuLabelInputValidator>
</div>`,
      code: `<DuLabelInputValidator
  v-model="email"
  type="label"
  inputType="email"
  placeholder="your@email.com"
  required
  title="Enter a valid email"
>
  Email
</DuLabelInputValidator>`,
    },
    {
      title: 'Input type with icon',
      description: 'With `type="input"`, the label becomes a styled input container. Use `#before` for a leading icon and `#after` for trailing content (e.g. a clear button). No default-slot label text needed.',
      links: [
        { label: 'DaisyUI input with icon', href: 'https://daisyui.com/components/input/#input-with-icon-inside' },
        { label: 'Vue named slots', href: 'https://vuejs.org/guide/components/slots.html#named-slots' },
      ],
      preview: `<div class="flex flex-col gap-4 w-72">
  <DuLabelInputValidator type="input" placeholder="Username" required :minlength="3" :maxlength="30" title="3–30 chars, letters, numbers, or dash">
    <template #before>
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </template>
    <template #hint>3–30 characters required.</template>
  </DuLabelInputValidator>
  <DuLabelInputValidator type="input" inputType="email" placeholder="your@email.com" required title="Enter a valid email">
    <template #before>
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    </template>
    <template #hint>Invalid email address.</template>
  </DuLabelInputValidator>
</div>`,
      code: `<DuLabelInputValidator
  v-model="username"
  type="input"
  placeholder="Username"
  pattern="[A-Za-z][A-Za-z0-9\\-]*"
  :minlength="3"
  :maxlength="30"
  required
  title="3–30 chars, letters, numbers, or dash"
>
  <template #before>
    <svg class="h-[1em] opacity-50"><!-- user icon --></svg>
  </template>
  <template #hint>3–30 characters. Letters, numbers, or dash only.</template>
</DuLabelInputValidator>`,
    },
    {
      title: 'Password with pattern',
      description: 'Combine `inputType="password"` with a `pattern` regex to enforce strong password rules. The `title` attribute is displayed by the browser as the error message.',
      links: [
        { label: 'MDN pattern attribute', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern' },
      ],
      preview: `<DuLabelInputValidator
  inputType="password"
  placeholder="••••••••"
  required
  pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
  title="Min 8 chars, one uppercase, one number"
  class="w-72"
>
  Password
  <template #hint>Min 8 chars, one uppercase, one number.</template>
</DuLabelInputValidator>`,
      code: `<DuLabelInputValidator
  v-model="password"
  inputType="password"
  placeholder="••••••••"
  required
  pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
  title="Min 8 chars, one uppercase, one number"
>
  Password
  <template #hint>Min 8 chars, one uppercase, one number.</template>
</DuLabelInputValidator>`,
    },
    {
      title: 'Variants',
      description: 'The `variant` prop sets the input border color on focus.',
      preview: `<div class="flex flex-col gap-3 w-72">
  <DuLabelInputValidator variant="primary" placeholder="Primary">Primary</DuLabelInputValidator>
  <DuLabelInputValidator variant="secondary" placeholder="Secondary">Secondary</DuLabelInputValidator>
  <DuLabelInputValidator variant="accent" placeholder="Accent">Accent</DuLabelInputValidator>
  <DuLabelInputValidator variant="success" placeholder="Success">Success</DuLabelInputValidator>
  <DuLabelInputValidator variant="error" placeholder="Error">Error</DuLabelInputValidator>
</div>`,
      code: `<DuLabelInputValidator v-model="val" variant="primary" placeholder="Primary">Primary</DuLabelInputValidator>
<DuLabelInputValidator v-model="val" variant="error" placeholder="Error">Error</DuLabelInputValidator>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-3 w-72">
  <DuLabelInputValidator size="xs" placeholder="XSmall">XSmall</DuLabelInputValidator>
  <DuLabelInputValidator size="sm" placeholder="Small">Small</DuLabelInputValidator>
  <DuLabelInputValidator placeholder="Medium (default)">Medium</DuLabelInputValidator>
  <DuLabelInputValidator size="lg" placeholder="Large">Large</DuLabelInputValidator>
  <DuLabelInputValidator size="xl" placeholder="XLarge">XLarge</DuLabelInputValidator>
</div>`,
      code: `<DuLabelInputValidator v-model="val" size="xs" placeholder="XSmall">XSmall</DuLabelInputValidator>
<DuLabelInputValidator v-model="val" size="sm" placeholder="Small">Small</DuLabelInputValidator>
<DuLabelInputValidator v-model="val" placeholder="Medium">Medium</DuLabelInputValidator>
<DuLabelInputValidator v-model="val" size="lg" placeholder="Large">Large</DuLabelInputValidator>
<DuLabelInputValidator v-model="val" size="xl" placeholder="XLarge">XLarge</DuLabelInputValidator>`,
    },
    {
      title: 'Ghost style',
      preview: `<DuLabelInputValidator ghost placeholder="Ghost input" class="w-72">
  Search
</DuLabelInputValidator>`,
      code: `<DuLabelInputValidator v-model="val" ghost placeholder="Ghost input">Search</DuLabelInputValidator>`,
    },
    {
      title: 'Disabled',
      preview: `<div class="flex flex-col gap-3 w-72">
  <DuLabelInputValidator disabled placeholder="Disabled floating label">
    Name
  </DuLabelInputValidator>
  <DuLabelInputValidator type="label" disabled placeholder="Disabled label">
    Name
  </DuLabelInputValidator>
</div>`,
      code: `<DuLabelInputValidator v-model="val" disabled placeholder="Disabled">Name</DuLabelInputValidator>`,
    },
    {
      title: 'Complete login form',
      description: 'A realistic sign-in form combining DuLabelInputValidator fields inside a DuFieldset, with full constraint validation and hint messages.',
      links: [
        { label: 'DuFieldset docs', href: '/docs/data-input/fieldset' },
        { label: 'DuButton docs', href: '/docs/actions/button' },
      ],
      preview: `<DuFieldset legend="Sign in" class="w-80">
  <DuLabelInputValidator
    inputType="email"
    placeholder="your@email.com"
    required
    title="Enter a valid email address"
  >
    Email
    <template #hint>Invalid email address.</template>
  </DuLabelInputValidator>
  <DuLabelInputValidator
    inputType="password"
    placeholder="••••••••"
    required
    :minlength="8"
    title="Minimum 8 characters"
  >
    Password
    <template #hint>Password must be at least 8 characters.</template>
  </DuLabelInputValidator>
  <DuButton variant="primary" class="w-full mt-2">Sign in</DuButton>
</DuFieldset>`,
      code: `<script setup lang="ts">
const email = ref('')
const password = ref('')

async function submit() {
  // handle login
}
</script>

<template>
  <form @submit.prevent="submit">
    <DuFieldset legend="Sign in">
      <DuLabelInputValidator
        v-model="email"
        inputType="email"
        placeholder="your@email.com"
        required
        title="Enter a valid email address"
      >
        Email
        <template #hint>Invalid email address.</template>
      </DuLabelInputValidator>
      <DuLabelInputValidator
        v-model="password"
        inputType="password"
        placeholder="••••••••"
        required
        :minlength="8"
        title="Minimum 8 characters"
      >
        Password
        <template #hint>Password must be at least 8 characters.</template>
      </DuLabelInputValidator>
      <DuButton type="submit" variant="primary" class="w-full">Sign in</DuButton>
    </DuFieldset>
  </form>
</template>`,
    },
  ],
} satisfies DocPageData
