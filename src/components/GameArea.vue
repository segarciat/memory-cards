<script setup lang="ts">
import { ref } from 'vue'
import MemoryCard from './MemoryCard.vue'
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
let shuffledCards: GameAreaProps['cardFrontHrefs'] = []

function play(difficulty: keyof typeof DIFFICULTIES) {
  gameDifficulty.value = difficulty
  isPlaying.value = true
  shuffledCards = subset(props.cardFrontHrefs, DIFFICULTIES[difficulty])
  shuffledCards = [...shuffledCards, ...shuffledCards]
  shuffleArray(shuffledCards)
}

function quit() {
  isPlaying.value = false
  shuffledCards = []
}

function restart() {
  play(gameDifficulty.value)
}
</script>

<template>
  <main class="game-area" :class="{ playing: isPlaying }">
    <div class="game-area__pre-game-form">
      <PreGameForm :game-difficulties="Object.keys(DIFFICULTIES)" @play-game="play" />
    </div>
    <div class="game-area__in-game-form">
      <InGameForm @quit="quit" @restart="restart" />
    </div>
    <div class="game-area__cards-container">
      <MemoryCard
        v-for="c in shuffledCards"
        :key="c.cardName"
        :card-front-href="c.cardFrontHref"
        :card-name="c.cardName"
        :card-back-href="props.cardBackHref"
      />
    </div>
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
