<script setup lang="ts">
import { capitalize } from '@/utils'
import { ref } from 'vue'

export interface PreGameFormProps {
  gameDifficulties: Array<string>
  currentDifficulty: string
}
const props = defineProps<PreGameFormProps>()
defineEmits(['playGame'])

const difficulty = ref(props.currentDifficulty)
</script>

<template>
  <form @submit.prevent="$emit('playGame', difficulty)" class="pre-game-form">
    <div class="pre-game-form__form-field">
      <label for="difficulty">Difficulty</label>
      <select id="difficulty" v-model="difficulty">
        <option disabled value="">Select difficulty</option>
        <option v-for="d in props.gameDifficulties" :key="d" :value="d">
          {{ capitalize(d) }}
        </option>
      </select>
    </div>
    <button type="submit" class="pre-game-form__play-button">Play</button>
  </form>
</template>

<style scoped>
.pre-game-form {
  display: flex;
  flex-direction: column;
}

.pre-game-form__form-field {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 0.5rem;
}

.pre-game-form__form-field > label {
  font-weight: bold;
}

.pre-game-form__form-field > select {
  font-size: 0.75rem;
  padding: 0.25rem;
}

.pre-game-form__form-field > select > option {
  font-size: 1.25rem;
}

.pre-game-form__play-button {
  display: block;
  font-size: 1.1rem;
  padding: 0.8rem 1.7rem;
  background-color: var(--brand-color-90);
  color: var(--gray-30);
  border-radius: 0.5rem;
  border: none;
}
</style>
