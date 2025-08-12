<script setup lang="ts">
import { capitalize } from '@/utils'
import { ref } from 'vue'

export interface GameOptionsFormProps {
  gameDifficulties: Array<string>
}
const props = defineProps<GameOptionsFormProps>()
defineEmits(['playGame'])

const difficulty = ref(props.gameDifficulties[0])
</script>

<template>
  <form @submit.prevent="$emit('playGame', difficulty)" class="game-options-form">
    <div class="game-options-form__form-field">
      <label for="difficulty">Difficulty</label>
      <select id="difficulty" v-model="difficulty">
        <option disabled value="">Select difficulty</option>
        <option v-for="d in props.gameDifficulties" :key="d" :value="d">
          {{ capitalize(d) }}
        </option>
      </select>
    </div>
    <button type="submit" class="game-options-form__play-button">Play</button>
  </form>
</template>

<style scoped>
.game-options-form {
  display: flex;
  flex-direction: column;
}

.game-options-form__form-field {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 0.5rem;
}

.game-options-form__form-field > label {
  font-weight: bold;
}

.game-options-form__form-field > select {
  font-size: 0.75rem;
  padding: 0.25rem;
}

.game-options-form__form-field > select > option {
  font-size: 1rem;
}

.game-options-form__play-button {
  display: block;
  font-size: 1.1rem;
  padding: 0.8rem 1.7rem;
  background-color: var(--brand-color-90);
  color: var(--gray-30);
  border-radius: 0.5rem;
  border: none;
}
</style>
