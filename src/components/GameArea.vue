<script setup lang="ts">
import { ref } from 'vue'
import PreGameForm from './PreGameForm.vue'
import InGameForm from './InGameForm.vue'
import MemoryCards, { type CardAssets } from './MemoryCards.vue'

export interface GameAreaProps extends CardAssets {}
enum GameState {
  PreGame,
  SettingUp,
  InProgress,
}

const props = defineProps<GameAreaProps>()

const DIFFICULTIES = {
  easy: Math.min(2, props.cardFrontHrefs.length),
  medium: Math.min(24, props.cardFrontHrefs.length),
  hard: Math.min(36, props.cardFrontHrefs.length),
}
const gameState = ref<GameState>(GameState.PreGame)
const gameDifficulty = ref(Object.keys(DIFFICULTIES)[0] as keyof typeof DIFFICULTIES)

function setupGame(difficulty: keyof typeof DIFFICULTIES) {
  gameState.value = GameState.SettingUp
  gameDifficulty.value = difficulty
}

function quit() {
  gameState.value = GameState.PreGame
}

function restart() {
  gameState.value = GameState.SettingUp
}

function completeSetup() {
  gameState.value = GameState.InProgress
}
</script>

<template>
  <main class="game-area" :class="{ playing: gameState }">
    <PreGameForm
      v-if="gameState === GameState.PreGame"
      :game-difficulties="Object.keys(DIFFICULTIES)"
      :current-difficulty="gameDifficulty"
      @play-game="setupGame"
    />
    <InGameForm v-if="gameState === GameState.InProgress" @quit="quit" @restart="restart" />
    <MemoryCards
      v-if="gameState === GameState.SettingUp || gameState === GameState.InProgress"
      :card-back-href="props.cardBackHref"
      :card-front-hrefs="props.cardFrontHrefs"
      :num-cards="DIFFICULTIES[gameDifficulty]"
      :sounds="props.sounds"
      :do-shuffle="gameState === GameState.SettingUp"
      @shuffled="completeSetup"
    />
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
</style>
