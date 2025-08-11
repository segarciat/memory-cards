<script setup lang="ts">
import LinkedInIcon from './icons/LinkedInIcon.vue'
import GitHubIcon from './icons/GitHubIcon.vue'
</script>

<template>
  <footer class="page-footer">
    <p>
      Credit to <a href="https://kenney.nl/" target="_blank" rel="noopener">Kenney.nl</a>
      for the card assets.
    </p>
    <ul class="page-footer__social-links">
      <li>
        <a href="https://www.linkedin.com/in/sergio-garcia-tapia/" target="_blank" rel="noopener"
          ><LinkedInIcon
        /></a>
      </li>
      <li>
        <a href="https://github.com/segarciat" target="_blank" rel="noopener"><GitHubIcon /></a>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
.page-footer {
  text-align: center;
  padding: 1rem;
}

.page-footer__social-links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.page-footer__social-links > li > a {
  display: block;
  inline-size: 1.5rem;
}
</style>
