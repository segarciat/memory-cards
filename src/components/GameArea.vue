<script setup lang="ts">
import { ref, onBeforeMount, nextTick } from 'vue'

import PreGameForm from './PreGameForm.vue'
import InGameForm from './InGameForm.vue'
import MemoryCards, { type CardData, type Sounds } from './MemoryCards.vue'
import VictoryImage from './VictoryImage.vue'
import SoundMuteButton from './SoundMuteButton.vue'

enum GameState {
  PreGame,
  SettingUp,
  InProgress,
  Victory,
}

enum GameDifficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

const DIFFICULTY_TO_NUMCARDS = {
  [GameDifficulty.easy]: 12,
  [GameDifficulty.medium]: 24,
  [GameDifficulty.hard]: 36,
}

const isMuted = ref(false)
const gameState = ref<GameState>(GameState.PreGame)
const selectedDifficulty = ref(GameDifficulty.easy)
const sounds = ref<Sounds | null>(null)
const cardData = ref<CardData | null>(null)

function toggleMute() {
  isMuted.value = !isMuted.value
}

function startGame(difficulty: GameDifficulty) {
  selectedDifficulty.value = difficulty
  gameState.value = GameState.InProgress
}

function quit() {
  gameState.value = GameState.PreGame
}

async function restart() {
  // Remount memory cards
  gameState.value = GameState.SettingUp
  await nextTick()
  gameState.value = GameState.InProgress
}

function handleVictory() {
  gameState.value = GameState.Victory
}

function playSound(soundFilePath: string, playbackRate: number = 1.0) {
  if (!isMuted.value) {
    const sound = new Audio(soundFilePath)
    sound.playbackRate = playbackRate
    sound.play()
  }
}

function prepareSounds() {
  const KENNEY_AUDIO_DIR = '/sound/kenney-casino-sfx'
  const FREESOUND_DIR = '/sound/freesound'

  sounds.value = {
    flip: () => playSound(`${KENNEY_AUDIO_DIR}/card-slide-4.ogg`, 1.5),
    shuffle: () => playSound(`${KENNEY_AUDIO_DIR}/card-shove-1.ogg`, 1.5),
    wrong: () => playSound(`${FREESOUND_DIR}/timgormly_mismatch.ogg`),
    correct: () => playSound(`${FREESOUND_DIR}/unadamlar_match.wav`),
    victory: () => playSound(`${FREESOUND_DIR}/Breviceps_confetti.wav`),
  }
}

async function prepareCards() {
  const card_images_path = '/img/cards/'
  const card_back_name = 'card_back'

  const res = await fetch(`${card_images_path}/_cards.csv`)
  const data = await res.text()

  cardData.value = {
    backCard: {
      name: card_back_name,
      href: `${card_images_path}/${card_back_name}.png`,
    },
    frontCards: data.split(/\s+/).map((name) => ({
      name,
      href: `${card_images_path}/${name}.png`,
    })),
  }
}

onBeforeMount(async () => {
  await prepareCards()
  prepareSounds()
})
</script>

<template>
  <!-- Mount game area only when assets are ready -->
  <main class="game-area" v-if="cardData && sounds">
    <div class="game-area__container">
      <SoundMuteButton :is-muted="isMuted" @click="toggleMute" />
      <PreGameForm
        v-if="gameState === GameState.PreGame || gameState === GameState.Victory"
        :game-difficulties="Object.values(GameDifficulty)"
        :selected-difficulty="selectedDifficulty"
        @play-game="startGame"
      />
      <VictoryImage v-if="gameState === GameState.Victory" />
      <InGameForm
        v-if="[GameState.SettingUp, GameState.InProgress].includes(gameState)"
        @quit="quit"
        @restart="restart"
      />
      <MemoryCards
        v-if="gameState === GameState.InProgress"
        :card-data="cardData"
        :sounds="sounds"
        :num-cards="DIFFICULTY_TO_NUMCARDS[selectedDifficulty]"
        @victory="handleVictory"
      />
    </div>
  </main>
</template>

<style scoped>
.game-area {
  border-block: 1px solid #000;
}

.game-area__container {
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  align-items: center;
  max-inline-size: var(--container-size);
  margin-inline: auto;
}
</style>
