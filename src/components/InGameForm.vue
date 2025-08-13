<script setup lang="ts">
import { capitalize } from '@/utils'

const RESTART = 'restart'
const QUIT = 'quit'

const emit = defineEmits([RESTART, QUIT])

function onSubmit(e: Event) {
  const input = (e as SubmitEvent).submitter! as HTMLInputElement
  const action = input.value.toLowerCase()
  switch (action) {
    case RESTART:
      emit(RESTART)
      break
    case QUIT:
      emit(QUIT)
      break
    default:
      console.log('Invalid event:', action)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="in-game-form">
    <input
      class="in-game-form__restart-btn"
      type="submit"
      name="restart_button"
      :value="capitalize(RESTART)"
    />
    <input
      class="in-game-form__quit-btn"
      type="submit"
      name="quit_button"
      :value="capitalize(QUIT)"
    />
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 1rem;
}

.in-game-form__restart-btn,
.in-game-form__quit-btn {
  padding: 0.5rem 1rem;
  border: none;
  font-weight: bold;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  border: 1px solid var(--accent-color);
  background: transparent;
}

.in-game-form__restart-btn:hover,
.in-game-form__quit-btn:hover {
  background-color: var(--brand-color-50);
  color: var(--gray-90);
}
</style>
