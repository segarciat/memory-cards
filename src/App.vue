<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import GameArea, { type GameAreaProps } from './components/GameArea.vue'
import PageFooter from './components/PageFooter.vue'
import { onBeforeMount, ref } from 'vue'

const CARD_IMAGES_PATH = '/kenney-cards/PNG/cards-large/'
const CARD_BACK_HREF = `${CARD_IMAGES_PATH}/card_back.png`
const AUDIO_DIR = '/kenney-casino-sfx'

const cardFrontHrefs = ref<GameAreaProps['cardFrontHrefs'] | null>(null)
let sounds = ref<GameAreaProps['sounds'] | null>(null)

async function loadCardImageHrefs() {
  const res = await fetch(`${CARD_IMAGES_PATH}/_cards.csv`)
  const data = await res.text()
  cardFrontHrefs.value = data.split(/\s+/).map((cardName) => ({
    cardName,
    cardFrontHref: `${CARD_IMAGES_PATH}/${cardName}.png`,
  }))
}

async function loadSounds() {
  sounds.value = {
    flip: new Audio(`${AUDIO_DIR}/card-slide-4.ogg`),
    shuffle: new Audio(`${AUDIO_DIR}/card-shove-1.ogg`),
  }

  sounds.value.flip.playbackRate = 1.5
  sounds.value.shuffle.playbackRate = 1.5
}

onBeforeMount(async () => {
  await loadCardImageHrefs()
  await loadSounds()
})
</script>

<template>
  <PageHeader />
  <template v-if="sounds && cardFrontHrefs">
    <GameArea
      :card-back-href="CARD_BACK_HREF"
      :card-front-hrefs="cardFrontHrefs"
      :sounds="sounds"
    />
    <PageFooter />
  </template>
</template>

<style scoped></style>
