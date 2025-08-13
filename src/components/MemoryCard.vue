<script setup lang="ts">
export interface MemoryCardProps {
  cardName: string
  cardBackHref: string
  cardFrontHref: string
  index: number
  isRevealed: boolean
  isMatched: boolean
  isMisMatched: boolean
}
const props = defineProps<MemoryCardProps>()
const emit = defineEmits(['flipCard'])
</script>

<template>
  <button
    type="button"
    class="memory-card"
    :class="{ revealed: props.isRevealed, matched: props.isMatched, mismatched: isMisMatched }"
    :disabled="props.isMatched"
    @click="$emit('flipCard', props.index)"
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
  border: 1px solid var(--accent-color);
  border-radius: 0.25rem;
  position: relative;
  perspective: 1000px;
  background-color: transparent;
  transition: background-color var(--flip-animation-duration);
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
  background-color: var(--warning-color);

  .memory-card__front {
    transform: rotateY(0deg);
  }
  .memory-card__back {
    transform: rotateY(180deg);
    /* Hide back while front is shown */
    backface-visibility: hidden;
  }
}

.memory-card.matched {
  background-color: var(--success-color);
}

.memory-card.mismatched {
  background-color: var(--danger-color);
}
</style>
