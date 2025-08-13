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
}
const props = defineProps<GameAreaProps>()

const DIFFICULTIES = {
  easy: 12,
  medium: 24,
  hard: 36,
}

const isPlaying = ref(false)
const gameDifficulty = ref(Object.keys(DIFFICULTIES)[0] as keyof typeof DIFFICULTIES)
const shuffledCards = ref<Array<MemoryCardProps> | null>(null)

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
    isMatched: false,
    isRevealed: false,
  }))
  isPlaying.value = true
}

function flipCard(card: MemoryCardProps) {
  if (shuffledCards.value != null) {
    shuffledCards.value[card.index].isRevealed = !shuffledCards.value[card.index].isRevealed
  }
}

function quit() {
  isPlaying.value = false
  shuffledCards.value = null
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
    <template v-if="isPlaying && shuffledCards">
      <div class="game-area__cards-container">
        <MemoryCard
          v-for="c in shuffledCards"
          :card-front-href="c.cardFrontHref"
          :card-name="c.cardName"
          :card-back-href="props.cardBackHref"
          :index="c.index"
          :is-revealed="c.isRevealed"
          :is-matched="c.isMatched"
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

.game-area.playing .game-area__pre-game-form {
  display: none;
}

.game-area.playing .game-area__in-game-form {
  display: block;
}
</style>
