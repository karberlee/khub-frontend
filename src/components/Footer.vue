<template>
  <footer>
    <div>&copy; 2024 My Application Footer</div>
  </footer>
</template>

<script setup>
  // No script needed for a static footer component
</script>

<style scoped>
footer {
  height: 5rem;
  margin-top: 2rem;
  color: var(--text-color);
  background-color: var(--primary-color);
  font-weight: 500;
  display: grid;
  place-items: center;
}
</style>
