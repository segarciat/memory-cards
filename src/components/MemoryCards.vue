<script setup lang="ts">
import { shuffleArray, subset } from '@/lib/utils'
import { computed, nextTick, ref, watch } from 'vue'

export interface CardAssets {
  cardBackHref: string
  cardFrontHrefs: Array<{
    cardName: string
    cardFrontHref: string
  }>
  sounds: {
    flip: () => void
    shuffle: () => void
    wrong: () => void
    correct: () => void
    victory: () => void
  }
}

export interface MemoryCards extends CardAssets {
  numCards: number
  doShuffle: boolean
}
interface MemoryCard {
  cardName: string
  cardFrontHref: string
  cardBackHref: string
  index: number
  isRevealed: boolean
  isMisMatched: boolean
  isMatched: boolean
  doShake: boolean
}

const props = defineProps<MemoryCards>()
const emit = defineEmits(['shuffled', 'victory'])

const MISMATCH_FLIP_DELAY = 1000
const doShuffle = computed(() => props.doShuffle)
const cards = ref<MemoryCard[]>([])
const flippedCards = ref({
  indices: [] as number[],
  timeoutId: undefined as number | undefined,
})
const unmatchedCards = ref<Set<string>>(new Set())

watch(
  doShuffle,
  (newShuffle) => {
    if (newShuffle) {
      shuffleCards()
    }
  },
  { immediate: true },
)

async function shuffleCards() {
  let cardHrefs = subset(props.cardFrontHrefs, props.numCards)
  unmatchedCards.value = new Set(cardHrefs.map((c) => c.cardName))
  cardHrefs = [...cardHrefs, ...cardHrefs]
  shuffleArray(cardHrefs)
  cards.value = cardHrefs.map((c, index) => ({
    cardName: c.cardName,
    cardFrontHref: c.cardFrontHref,
    cardBackHref: props.cardBackHref,
    index,
    isRevealed: false,
    isMisMatched: false,
    isMatched: false,
    doShake: true,
  }))
  hideMismatchedCards()
  await nextTick()
  props.sounds.shuffle()
  emit('shuffled')
}

function hideMismatchedCards() {
  clearTimeout(flippedCards.value.timeoutId)
  if (cards.value) {
    flippedCards.value.indices.forEach((idx) => {
      const card = cards.value[idx]
      card.isRevealed = false
      card.isMisMatched = false
    })
  }
  flippedCards.value.indices.splice(0)
  flippedCards.value.timeoutId = undefined
}

function flipCard(cardIndex: number) {
  const current = cards.value[cardIndex]
  if (flippedCards.value.timeoutId) {
    hideMismatchedCards()
  }

  if (current.isRevealed) {
    current.isRevealed = false
    flippedCards.value.indices.pop()
  } else {
    current.isRevealed = true
    flippedCards.value.indices.push(cardIndex)
    props.sounds.flip()
  }

  if (flippedCards.value.indices.length == 2) {
    const prev = cards.value[flippedCards.value.indices[0]]
    if (prev.cardName === current.cardName) {
      prev.isMatched = true
      current.isMatched = true
      flippedCards.value.indices.splice(0)
      unmatchedCards.value.delete(current.cardName)
      if (unmatchedCards.value.size === 0) {
        setTimeout(() => {
          props.sounds.victory()
          emit('victory')
        }, 500)
      } else {
        props.sounds.correct()
      }
    } else {
      prev.isMisMatched = true
      current.isMisMatched = true
      flippedCards.value.timeoutId = setTimeout(hideMismatchedCards, MISMATCH_FLIP_DELAY)
      props.sounds.wrong()
    }
  }
}

function doneShuffling(index: number) {
  cards.value[index].doShake = false
}
</script>

<template>
  <div class="memory-cards">
    <button
      v-for="c in cards"
      type="button"
      class="memory-cards__card"
      :class="{ revealed: c.isRevealed, matched: c.isMatched, mismatched: c.isMisMatched }"
      :disabled="c.isMatched || (c.isRevealed && !c.isMisMatched)"
      @click="flipCard(c.index)"
    >
      <div
        class="memory-cards__card-inner"
        :class="{ shake: c.doShake }"
        @animationend="doneShuffling(c.index)"
      >
        <img class="memory-cards__card-front" :src="c.cardFrontHref" :alt="c.cardName" />
        <img class="memory-cards__card-back" :src="props.cardBackHref" alt="Back of a card" />
      </div>
    </button>
  </div>
</template>

<style scoped>
.memory-cards {
  --card-size: 112px;
  --flip-animation-duration: 0.5s;

  display: grid;
  grid-template-columns: repeat(auto-fit, var(--card-size));
  justify-content: center;
  gap: 1rem;

  width: 100%;
}

.memory-cards__card {
  border: 1px solid var(--accent-color);
  border-radius: 0.25rem;

  perspective: 1000px;
  background-color: transparent;
  transition: background-color var(--flip-animation-duration);
}

.memory-cards__card-inner {
  width: 100%;
  aspect-ratio: 1;
  position: relative;
}

.memory-cards__card-inner.shake {
  animation: shake 0.25s ease-out 3;
}

.memory-cards__card-front,
.memory-cards__card-back {
  position: absolute;
  width: 100%;
  padding: 0.75rem;
  transition: transform var(--flip-animation-duration);
}

.memory-cards__card-front {
  transform: rotateY(180deg);
}

.memory-cards__card-back {
  /* Immediately show back as soon as front is hidden */
  backface-visibility: visible;
}

.memory-cards__card.revealed {
  background-color: var(--warning-color);

  .memory-cards__card-front {
    transform: rotateY(0deg);
  }
  .memory-cards__card-back {
    transform: rotateY(180deg);
    /* Hide back while front is shown */
    backface-visibility: hidden;
  }
}

.memory-cards__card.matched {
  background-color: var(--success-color);
}

.memory-cards__card.mismatched {
  background-color: var(--danger-color);
}

@keyframes shake {
  0%,
  100% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(2%);
  }

  75% {
    transform: translateY(-1%);
  }
}
</style>
