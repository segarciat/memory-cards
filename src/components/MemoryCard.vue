<script setup lang="ts">
export interface MemoryCardProps {
  backCard: { name: string; href: string }
  frontCard: { name: string; href: string }
  isRevealed: boolean
  isMatched: boolean
  isMismatched: boolean
}
const props = defineProps<MemoryCardProps>()
</script>

<template>
  <button
    type="button"
    class="memory-card"
    :class="{
      revealed: props.isRevealed,
      matched: props.isMatched,
      mismatched: props.isMismatched,
    }"
    :disabled="props.isMatched || (props.isRevealed && !props.isMismatched)"
  >
    <div class="memory-card__inner">
      <img class="memory-card__front" :src="props.frontCard.href" :alt="props.frontCard.name" />
      <img class="memory-card__back" :src="props.backCard.href" :alt="props.backCard.name" />
    </div>
  </button>
</template>

<style scoped>
.memory-card {
  --flip-animation-duration: 0.5s;

  border: 1px solid var(--accent-color);
  border-radius: 0.25rem;

  perspective: 1000px;
  background-color: transparent;
  transition: background-color var(--flip-animation-duration);
}

.memory-card__inner {
  width: 100%;
  aspect-ratio: 1;
  position: relative;
}

.memory-card__front,
.memory-card__back {
  position: absolute;
  width: 100%;
  padding: 0.75rem;
  transition: transform var(--flip-animation-duration);
}

.memory-card__front {
  transform: rotateY(180deg);
}

.memory-card__back {
  /* Immediately show back as soon as front is hidden */
  backface-visibility: visible;
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
