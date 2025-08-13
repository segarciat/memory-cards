<template>
  <header class="page-header">
    <h1 class="page-header__title">Memory Cards</h1>
    <p class="page-header__description">
      The classic game where you flip cards to identify all matching pairs.
    </p>
  </header>
</template>

<style scoped>
.page-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.625rem;
  text-align: center;
  padding: 1rem 0.5rem;
}

.page-header__title {
  margin-bottom: 0.4rem;
  text-decoration: underline;
}

.page-header__description {
  font-size: 1rem;
  max-width: 75%;
}
</style>
