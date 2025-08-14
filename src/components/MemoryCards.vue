<script setup lang="ts">
import { shuffleArray, subset } from '@/utils'
import { computed, nextTick, ref, watch } from 'vue'

export interface CardAssets {
  cardBackHref: string
  cardFrontHrefs: Array<{
    cardName: string
    cardFrontHref: string
  }>
  sounds: {
    flip: () => HTMLAudioElement
    shuffle: () => HTMLAudioElement
    wrong: () => HTMLAudioElement
    correct: () => HTMLAudioElement
    victory: () => HTMLAudioElement
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
const emit = defineEmits(['shuffled'])

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
  props.sounds.shuffle().play()
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
    props.sounds.flip().play()
  }

  if (flippedCards.value.indices.length == 2) {
    const prev = cards.value[flippedCards.value.indices[0]]
    if (prev.cardName === current.cardName) {
      prev.isMatched = true
      current.isMatched = true
      flippedCards.value.indices.splice(0)
      unmatchedCards.value.delete(current.cardName)
      if (unmatchedCards.value.size === 0) {
        props.sounds.victory().play()
      } else {
        props.sounds.correct().play()
      }
    } else {
      prev.isMisMatched = true
      current.isMisMatched = true
      flippedCards.value.timeoutId = setTimeout(hideMismatchedCards, MISMATCH_FLIP_DELAY)
      props.sounds.wrong().play()
    }
  }
}

function doneShuffling(index: number) {
  cards.value[index].doShake = false
}
</script>

<template>
  <div ref="memory-cards" class="memory-cards">
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
        <div class="memory-cards__card-front">
          <img :src="c.cardFrontHref" :alt="c.cardName" />
        </div>
        <div class="memory-cards__card-back">
          <img :src="props.cardBackHref" alt="Back of a card" />
        </div>
      </div>
    </button>
  </div>
</template>

<style scoped>
.memory-cards {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (min-width: 578px) {
  .memory-cards {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 768px) {
  .memory-cards {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (min-width: 1024px) {
  .memory-cards {
    grid-template-columns: repeat(12, 1fr);
  }
}

.memory-cards__card {
  --flip-animation-duration: 0.5s;
  padding-block: 0.5rem;
  border: 1px solid var(--accent-color);
  border-radius: 0.25rem;
  position: relative;
  perspective: 1000px;
  background-color: transparent;
  transition: background-color var(--flip-animation-duration);
}

.memory-cards__card-inner.shake {
  animation: shake 0.25s ease-out 3;
}

/* This enables adding padding in .memory-cards__card in spite of the absolute positioning of the back card */
.memory-cards__card-inner {
  position: relative;
}

.memory-cards__card-front {
  position: relative;
  transform: rotateY(180deg);
  transition: transform var(--flip-animation-duration);
}

.memory-cards__card-back {
  position: absolute;
  top: 0;

  /* Immediately show back as soon as front is hidden */
  backface-visibility: visible;
  transition: transform var(--flip-animation-duration);
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
