<script setup lang="ts">
import MemoryCard from './MemoryCard.vue'
</script>

<template>
  <main class="game-area">
    <button type="button" class="game-area__play-button">Play</button>
    <MemoryCard />
  </main>
</template>

<style scoped>
.game-area {
  border-block: 1px solid #000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-area__play-button {
  display: block;
  font-size: 1.1rem;
  padding: 0.8rem 1.7rem;
  background-color: var(--brand-color-90);
  color: var(--gray-30);
  border-radius: 0.5rem;
  border: none;
}
</style>
