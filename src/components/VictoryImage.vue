<template>
  <div class="victory">
    <h2 class="victory__heading">You did it!</h2>
    <div class="victory__img">
      <img src="/img/lordicon/confetti.gif" />
    </div>
    <a href="https://lordicon.com/" target="_blank" rel="noopener">Icons by Lordicon.com</a>
  </div>
</template>

<style scoped>
.victory {
  padding-block: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.victory__heading {
  color: var(--success-color);
  font-size: 2rem;
}

.victory__img {
  width: 12rem;
}

.victory > a {
  font-size: 1rem;
  text-align: center;
}
</style>
