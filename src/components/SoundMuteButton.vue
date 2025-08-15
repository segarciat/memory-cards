<script setup lang="ts">
import VolumeOnIcon from './icons/VolumeOnIcon.vue'
import VolumeOffIcon from './icons/VolumeOffIcon.vue'
import isMuted, { toggleIsMuted } from '@/shared-state/isMuted'
</script>

<template>
  <button class="sound-btn" :class="{ muted: isMuted }" @click="toggleIsMuted">
    <VolumeOffIcon v-if="isMuted" />
    <VolumeOnIcon v-else />
  </button>
</template>

<style scoped>
.sound-btn {
  display: inline-block;
  padding: 0.5rem;
  background: var(--success-color);
  border: none;
  border-radius: 0.25rem;
  color: var(--gray-90);
}

.sound-btn.muted {
  background-color: var(--danger-color);
}
</style>
