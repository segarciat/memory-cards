<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import GameArea, { type GameAreaProps } from './components/GameArea.vue'
import PageFooter from './components/PageFooter.vue'
import { onBeforeMount, ref } from 'vue'
import isMuted from './shared-state/isMuted'

const CARD_IMAGES_PATH = '/img/cards/'
const CARD_BACK_HREF = `${CARD_IMAGES_PATH}/card_back.png`
const KENNEY_AUDIO_DIR = '/sound/kenney-casino-sfx'
const FREESOUND_DIR = '/sound/freesound'

const cardFrontHrefs = ref<GameAreaProps['cardFrontHrefs'] | null>(null)
let sounds = ref<GameAreaProps['sounds'] | null>(null)

function playSound(soundFilePath: string, playbackRate: number = 1) {
  if (!isMuted.value) {
    const sound = new Audio(soundFilePath)
    sound.playbackRate = playbackRate
    sound.play()
  }
}

async function loadCardImageHrefs() {
  const res = await fetch(`${CARD_IMAGES_PATH}/_cards.csv`)
  const data = await res.text()
  cardFrontHrefs.value = data.split(/\s+/).map((cardName) => ({
    cardName,
    cardFrontHref: `${CARD_IMAGES_PATH}/${cardName}.png`,
  }))
}

function setSounds() {
  sounds.value = {
    flip: () => playSound(`${KENNEY_AUDIO_DIR}/card-slide-4.ogg`, 1.5),
    shuffle: () => playSound(`${KENNEY_AUDIO_DIR}/card-shove-1.ogg`, 1.5),
    wrong: () => playSound(`${FREESOUND_DIR}/timgormly_mismatch.ogg`),
    correct: () => playSound(`${FREESOUND_DIR}/unadamlar_match.wav`),
    victory: () => playSound(`${FREESOUND_DIR}/Breviceps_confetti.wav`),
  }
}

onBeforeMount(async () => {
  await loadCardImageHrefs()
  setSounds()
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
