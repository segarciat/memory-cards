<script setup lang="ts">
import { ref } from 'vue'
import MemoryCard from './MemoryCard.vue'
import { shuffleArray, subset } from '@/utils'

export interface GameAreaProps {
  cardBackHref: string
  cardFrontHrefs: Array<{
    cardName: string
    cardFrontHref: string
  }>
  numPairs: number
}
const props = defineProps<GameAreaProps>()

const isPlaying = ref(false)
let shuffledCards: GameAreaProps['cardFrontHrefs'] = []

function play() {
  isPlaying.value = true
  shuffledCards = subset(props.cardFrontHrefs, props.numPairs)
  shuffledCards = [...shuffledCards, ...shuffledCards]
  shuffleArray(shuffledCards)
}
</script>

<template>
  <main class="game-area" :class="{ playing: isPlaying }">
    <button type="button" class="game-area__play-button" @click="play">Play</button>
    <div class="cards-container">
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

.game-area__play-button {
  display: block;
  font-size: 1.1rem;
  padding: 0.8rem 1.7rem;
  background-color: var(--brand-color-90);
  color: var(--gray-30);
  border-radius: 0.5rem;
  border: none;
}

.game-area.playing .game-area__play-button {
  display: none;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
