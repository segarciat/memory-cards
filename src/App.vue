<script setup lang="ts">
import MemoryCard from './components/MemoryCard.vue'
</script>

<template>
  <header class="page-header">
    <h1>Memory Cards</h1>
    <p class="page-header__description">
      The classic game where you flip cards to identify all matching pairs.
    </p>
  </header>
  <main class="game-area">
    <button type="button" class="game-area__play-button">Play</button>
    <MemoryCard />
  </main>
  <footer class="page-footer">
    <p>
      Credit to <a href="https://kenney.nl/" target="_blank" rel="noopener">Kenney.nl</a>
      for the card assets.
    </p>
    <ul class="page-footer__social-links">
      <li>
        Connect with me on
        <a href="https://www.linkedin.com/in/sergio-garcia-tapia/" target="_blank" rel="noopener"
          >LinkedIn </a
        >!
      </li>
      <li>
        Find more of my code samples or projects on
        <a href="https://github.com/segarciat" target="_blank" rel="noopener">GitHub</a>!
      </li>
    </ul>
  </footer>
</template>

<style scoped>
.page-header {
  margin-top: 1rem;
  text-align: center;
  padding: 1rem 0.5rem;
}

.page-header__description {
  font-size: 1.1rem;
}

.game-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  border-block: 1px solid #000;
  padding: 1rem;
}

.game-area__play-button {
  display: block;
  font-size: 1.2rem;
  padding: 0.5rem 1.5rem;
  background-color: var(--secondary-color-80);
  color: var(--gray-30);
  border: 1px solid black;
  border-radius: 0.5rem;
}

.page-footer {
  text-align: center;
  padding: 1rem;
}

.page-footer__social-links {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
