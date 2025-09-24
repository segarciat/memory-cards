<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MemoryCard, { type MemoryCardProps } from './MemoryCard.vue'
import { shuffleArray, subset } from '@/lib/utils'

export interface CardData {
  backCard: { name: string; href: string }
  frontCards: Array<{ name: string; href: string }>
}

export interface Sounds {
  flip: () => void
  shuffle: () => void
  wrong: () => void
  correct: () => void
  victory: () => void
}

const MISMATCH_FLIP_DELAY = 1_000

const emit = defineEmits(['victory'])
const props = defineProps<{
  cardData: CardData
  sounds: Sounds
  numCards: number
}>()

const selectedFrontCards = computed(() => subset(props.cardData.frontCards, props.numCards))
const unmatchedCards = ref(new Set(selectedFrontCards.value.map((c) => c.name)))
const memoryCards = ref(initializeMemoryCards())
const revealedCards = ref({
  cards: [] as Array<MemoryCardProps>,
  timeoutId: undefined as number | undefined,
})

function initializeMemoryCards(): Array<MemoryCardProps> {
  let cards = [...selectedFrontCards.value, ...selectedFrontCards.value]
  shuffleArray(cards)
  return cards.map(({ name, href }) => ({
    backCard: props.cardData.backCard,
    frontCard: { name, href },
    isRevealed: false,
    isMatched: false,
    isMismatched: false,
  }))
}

function flipCard(currentCard: MemoryCardProps) {
  // Hide flipped cards, if any
  if (revealedCards.value.timeoutId) {
    hideMismatchedCards()
  }

  // Flip clicked card
  if (currentCard.isRevealed) {
    revealedCards.value.cards.pop()
  } else {
    revealedCards.value.cards.push(currentCard)
    props.sounds.flip()
  }
  currentCard.isRevealed = !currentCard.isRevealed

  testMatch()
}

function testMatch() {
  if (revealedCards.value.cards.length !== 2) {
    return
  }
  const [previousCard, currentCard] = revealedCards.value.cards

  // Wrong match
  if (previousCard.frontCard.name !== currentCard.frontCard.name) {
    props.sounds.wrong()
    revealedCards.value.cards.forEach((c) => (c.isMismatched = true))
    revealedCards.value.timeoutId = setTimeout(hideMismatchedCards, MISMATCH_FLIP_DELAY)
    return
  }

  // It's a match!
  props.sounds.correct()
  revealedCards.value.cards.forEach((c) => (c.isMatched = true))
  unmatchedCards.value.delete(currentCard.frontCard.name)
  revealedCards.value.cards = []

  // Is game over?
  if (unmatchedCards.value.size === 0) {
    setTimeout(() => {
      props.sounds.victory()
      emit('victory')
    }, 500)
  }
}

function hideMismatchedCards() {
  clearTimeout(revealedCards.value.timeoutId)
  // Hide cards
  revealedCards.value.cards.forEach((c) => {
    c.isRevealed = false
    c.isMismatched = false
  })
  revealedCards.value = {
    cards: [],
    timeoutId: undefined,
  }
}

onMounted(() => {
  props.sounds.shuffle()
})
</script>

<template>
  <div class="memory-cards">
    <MemoryCard v-for="card in memoryCards" v-bind="card" class="shake" @click="flipCard(card)" />
  </div>
</template>

<style scoped>
.memory-cards {
  --card-size: 112px;

  display: grid;
  grid-template-columns: repeat(auto-fit, var(--card-size));
  justify-content: center;
  gap: 1rem;

  width: 100%;
}

.shake {
  animation: shake 0.25s ease-out 3;
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
