import { ref } from 'vue'

const isMuted = ref(false)

export function toggleIsMuted() {
  isMuted.value = !isMuted.value
}

export default isMuted
