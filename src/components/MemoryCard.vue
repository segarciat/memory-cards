<script setup lang="ts">
export interface MemoryCardProps {
  cardName: string
  cardBackHref: string
  cardFrontHref: string
}
const props = defineProps<MemoryCardProps>()
import { ref } from 'vue'
const isRevealed = ref(false)

function revealCard() {
  isRevealed.value = !isRevealed.value
}
</script>

<template>
  <button type="button" class="memory-card" :class="{ revealed: isRevealed }" @click="revealCard">
    <div class="memory-card__front">
      <img :src="props.cardFrontHref" :alt="props.cardName" />
    </div>
    <div class="memory-card__back">
      <img :src="props.cardBackHref" alt="Back of a card" />
    </div>
  </button>
</template>

<style lang="css" scoped>
.memory-card {
  --flip-animation-duration: 0.5s;
  /* background-color: transparent; */
  border: revert;
  position: relative;
  perspective: 1000px;
}

.memory-card__front {
  position: relative;
  transition: transform var(--flip-animation-duration);
  transform: rotateY(180deg);
}

.memory-card__back {
  position: absolute;
  top: 0;

  backface-visibility: hidden;
  transition: transform var(--flip-animation-duration);
}

.memory-card.revealed {
  .memory-card__front {
    transform: rotateY(0deg);
  }
  .memory-card__back {
    transform: rotateY(180deg);
  }
}
</style>
