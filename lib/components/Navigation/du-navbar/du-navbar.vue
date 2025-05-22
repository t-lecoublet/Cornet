<script setup lang="ts">
import { type NavbarProps } from './du-navbar.types';

// Le composant n'a pas besoin de propriétés pour l'instant
defineProps<NavbarProps>();
</script>

<template>
  <nav class="navbar bg-base-100 shadow-sm">
    <div v-if="$slots.start" class="navbar-start">
      <slot name="start"></slot>
    </div>
    <div v-if="$slots.center" class="navbar-center">
      <slot name="center"></slot>
    </div>
    <div v-if="$slots.end" class="navbar-end">
      <slot name="end"></slot>
    </div>

    <slot></slot>
  </nav>
</template> 