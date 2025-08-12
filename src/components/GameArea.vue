<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MemoryCard, { type CardHrefType } from './MemoryCard.vue'

const CARD_IMAGES_PATH = '/kenney-cards/PNG/cards-large/'
const CARD_BACK_HREF = `${CARD_IMAGES_PATH}/card_back.png`
const isPlaying = ref(false)
let cardImageHrefs: Array<CardHrefType> = []
let shuffledCards: Array<CardHrefType> = []

function play() {
  isPlaying.value = true
  // TODO: Shuffle array of cards when game starts
}

onMounted(async () => {
  const res = await fetch(`${CARD_IMAGES_PATH}/_cards.csv`)
  const data = await res.text()
  cardImageHrefs = data.split(/\s+/).map((cardName) => ({
    cardName,
    cardBackHref: CARD_BACK_HREF,
    cardFrontHref: `${CARD_IMAGES_PATH}/${cardName}.png`,
  }))
})
</script>

<template>
  <main class="game-area" :class="{ playing: isPlaying }">
    <button type="button" class="game-area__play-button" @click="play">Play</button>
    <div class="cards-container">
      <MemoryCard
        v-for="c in cardImageHrefs"
        :key="c.cardName"
        :card-front-href="c.cardFrontHref"
        :card-name="c.cardName"
        :card-back-href="c.cardBackHref"
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
