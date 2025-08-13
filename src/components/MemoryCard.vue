<script setup lang="ts">
export interface MemoryCardProps {
  cardName: string
  cardBackHref: string
  cardFrontHref: string
  index: number
  isRevealed: boolean
  isMatched: boolean
}
const props = defineProps<MemoryCardProps>()
const emit = defineEmits(['flipCard'])
</script>

<template>
  <button
    type="button"
    class="memory-card"
    :class="{ revealed: props.isRevealed }"
    :disabled="props.isMatched"
    @click="$emit('flipCard', props)"
  >
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
  transform: rotateY(180deg);
  transition: transform var(--flip-animation-duration);
}

.memory-card__back {
  position: absolute;
  top: 0;

  /* Immediately show back as soon as front is hidden */
  backface-visibility: visible;
  transition: transform var(--flip-animation-duration);
}

.memory-card.revealed {
  .memory-card__front {
    transform: rotateY(0deg);
  }
  .memory-card__back {
    transform: rotateY(180deg);
    /* Hide back while front is shown */
    backface-visibility: hidden;
  }
}
</style>
