<script setup lang="ts">
import { ref } from 'vue'
import MemoryCard, { type MemoryCardProps } from './MemoryCard.vue'
import { shuffleArray, subset } from '@/utils'
import PreGameForm from './PreGameForm.vue'
import InGameForm from './InGameForm.vue'

export interface GameAreaProps {
  cardBackHref: string
  cardFrontHrefs: Array<{
    cardName: string
    cardFrontHref: string
  }>
  sounds: {
    flip: HTMLAudioElement
    shuffle: HTMLAudioElement
  }
}
const props = defineProps<GameAreaProps>()

const DIFFICULTIES = {
  easy: Math.max(12, props.cardFrontHrefs.length),
  medium: Math.max(24, props.cardFrontHrefs.length),
  hard: Math.max(36, props.cardFrontHrefs.length),
}
const MISMATCH_FLIP_DELAY = 1000

const isPlaying = ref(false)
const flippedCards = ref({
  indices: [] as number[],
  timeoutId: undefined as number | undefined,
})
const gameDifficulty = ref(Object.keys(DIFFICULTIES)[0] as keyof typeof DIFFICULTIES)
const shuffledCards = ref<Array<MemoryCardProps>>([])

function play(difficulty: keyof typeof DIFFICULTIES) {
  gameDifficulty.value = difficulty
  let cards = subset(props.cardFrontHrefs, DIFFICULTIES[difficulty])
  cards = [...cards, ...cards]
  shuffleArray(cards)
  shuffledCards.value = cards.map((c, index) => ({
    cardName: c.cardName,
    cardFrontHref: c.cardFrontHref,
    cardBackHref: props.cardBackHref,
    index,
    isRevealed: false,
    isMisMatched: false,
    isMatched: false,
  }))
  isPlaying.value = true
  clearFlippedCards()
  // props.sounds.shuffle.currentTime = 0.18
  props.sounds.shuffle.play()
}

function clearFlippedCards() {
  clearTimeout(flippedCards.value.timeoutId)
  flippedCards.value.indices.splice(0)
  flippedCards.value.timeoutId = undefined
}

function hideMismatchedCards() {
  clearTimeout(flippedCards.value.timeoutId)
  if (shuffledCards.value) {
    flippedCards.value.indices.forEach((idx) => {
      const card = shuffledCards.value[idx]
      card.isRevealed = false
      card.isMisMatched = false
    })
  }
  flippedCards.value.indices.splice(0)
  flippedCards.value.timeoutId = undefined
}

function flipCard(cardIndex: number) {
  if (flippedCards.value.indices.length == 2) {
    hideMismatchedCards()
  }

  const current = shuffledCards.value[cardIndex]
  current.isRevealed = !current.isRevealed

  if (flippedCards.value.indices.length === 0) {
    flippedCards.value.indices.push(cardIndex)
    props.sounds.flip.play()
  } else if (cardIndex === flippedCards.value.indices[0]) {
    flippedCards.value.indices.pop()
  } else {
    flippedCards.value.indices.push(cardIndex)
    tryMatch()
  }
}

function tryMatch() {
  const first = shuffledCards.value[flippedCards.value.indices[0]]
  const second = shuffledCards.value[flippedCards.value.indices[1]]
  if (first.cardName === second.cardName) {
    first.isMatched = true
    second.isMatched = true
    flippedCards.value.indices.splice(0)
  } else {
    first.isMisMatched = true
    second.isMisMatched = true
    flippedCards.value.timeoutId = setTimeout(hideMismatchedCards, MISMATCH_FLIP_DELAY)
  }
}

function quit() {
  isPlaying.value = false
  shuffledCards.value = []
}

function restart() {
  play(gameDifficulty.value)
}
</script>

<template>
  <main class="game-area" :class="{ playing: isPlaying }">
    <div class="game-area__pre-game-form">
      <PreGameForm
        :game-difficulties="Object.keys(DIFFICULTIES)"
        :current-difficulty="gameDifficulty"
        @play-game="play"
      />
    </div>
    <div class="game-area__in-game-form">
      <InGameForm @quit="quit" @restart="restart" />
    </div>
    <template v-if="isPlaying">
      <div class="game-area__cards-container">
        <MemoryCard
          v-for="c in shuffledCards"
          :card-front-href="c.cardFrontHref"
          :card-name="c.cardName"
          :card-back-href="props.cardBackHref"
          :index="c.index"
          :is-revealed="c.isRevealed"
          :is-matched="c.isMatched"
          :is-mis-matched="c.isMisMatched"
          @flip-card="flipCard"
        />
      </div>
    </template>
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

.game-area__in-game-form {
  display: none;
}

.game-area__cards-container {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (min-width: 578px) {
  .game-area__cards-container {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 768px) {
  .game-area__cards-container {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (min-width: 1024px) {
  .game-area__cards-container {
    grid-template-columns: repeat(12, 1fr);
  }
}

.game-area.playing .game-area__pre-game-form {
  display: none;
}

.game-area.playing .game-area__in-game-form {
  display: block;
}
</style>
