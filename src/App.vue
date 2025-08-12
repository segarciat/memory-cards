<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import GameArea, { type GameAreaProps } from './components/GameArea.vue'
import PageFooter from './components/PageFooter.vue'
import { onBeforeMount } from 'vue'

const CARD_IMAGES_PATH = '/kenney-cards/PNG/cards-large/'
const CARD_BACK_HREF = `${CARD_IMAGES_PATH}/card_back.png`

const cardFrontHrefs: GameAreaProps['cardFrontHrefs'] = []

async function loadCardImageHrefs() {
  const res = await fetch(`${CARD_IMAGES_PATH}/_cards.csv`)
  const data = await res.text()
  data.split(/\s+/).forEach((cardName) => {
    cardFrontHrefs.push({
      cardName,
      cardFrontHref: `${CARD_IMAGES_PATH}/${cardName}.png`,
    })
  })
}

onBeforeMount(async () => {
  await loadCardImageHrefs()
})
</script>

<template>
  <PageHeader />
  <GameArea :card-back-href="CARD_BACK_HREF" :card-front-hrefs="cardFrontHrefs" />
  <PageFooter />
</template>

<style scoped></style>
