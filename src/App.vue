<script setup>
import {
  DuButton, 
  DuBadge
  } from "daisyui-vue-kit";
</script>

<template>
<div>
  <h1>Vue 3 + Vite + Tailwind CSS</h1>
  <h2>Button</h2>
  <div class="flex flex-wrap gap-4">
    <DuButton>Default</DuButton>
    <DuButton variant="primary">Primary</DuButton>
    <DuButton variant="secondary">Secondary</DuButton>
    <DuButton variant="success">Success</DuButton>
    <DuButton variant="error">Error</DuButton>
    <DuButton variant="warning">Warning</DuButton>
    <DuButton variant="info">Info</DuButton>
  </div>
  <div class="flex gap-2 items-center">
    <DuBadge size="xs">Xsmall</DuBadge>
    <DuBadge size="sm">Small</DuBadge>
    <DuBadge size="md">Medium</DuBadge>
    <DuBadge size="lg">Large</DuBadge>
    <DuBadge size="xl">Xlarge</DuBadge>
  </div>
</div>
</template>