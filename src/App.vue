<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import GameArea, { type GameAreaProps } from './components/GameArea.vue'
import PageFooter from './components/PageFooter.vue'
import { onBeforeMount, ref } from 'vue'

const CARD_IMAGES_PATH = '/kenney-cards/PNG/cards-large/'
const CARD_BACK_HREF = `${CARD_IMAGES_PATH}/card_back.png`
const KENNEY_AUDIO_DIR = '/kenney-casino-sfx'
const FREESOUND_DIR = '/freesound'

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
    flip: () => {
      const sound = new Audio(`${KENNEY_AUDIO_DIR}/card-slide-4.ogg`)
      sound.playbackRate = 1.5
      return sound
    },
    shuffle: () => {
      const sound = new Audio(`${KENNEY_AUDIO_DIR}/card-shove-1.ogg`)
      sound.playbackRate = 1.5
      return sound
    },
    wrong: () => new Audio(`${FREESOUND_DIR}/timgormly_mismatch.ogg`),
    correct: () => new Audio(`${FREESOUND_DIR}/unadamlar_match.wav`),
    victory: () => new Audio(`${FREESOUND_DIR}/Breviceps_confetti.wav`),
  }
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
