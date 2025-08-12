<script setup lang="ts">
import { ref } from 'vue'
import MemoryCard from './MemoryCard.vue'
import { shuffleArray, subset } from '@/utils'
import GameOptionsForm from './GameOptionsForm.vue'

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
let shuffledCards: GameAreaProps['cardFrontHrefs'] = []

function play(difficulty: keyof typeof DIFFICULTIES) {
  isPlaying.value = true
  shuffledCards = subset(props.cardFrontHrefs, DIFFICULTIES[difficulty])
  shuffledCards = [...shuffledCards, ...shuffledCards]
  shuffleArray(shuffledCards)
}
</script>

<template>
  <main class="game-area" :class="{ playing: isPlaying }">
    <GameOptionsForm
      class="game-area__game-options-form"
      :game-difficulties="Object.keys(DIFFICULTIES)"
      @play-game="play"
    />
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

.game-area.playing .game-area__game-options-form {
  display: none;
}

.game-area__cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
