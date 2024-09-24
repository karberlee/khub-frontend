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
  box-shadow: 
    0 -2px 4px -1px rgba(0, 0, 0, .2), 
    0 -4px 5px 0 rgba(0, 0, 0, .14), 
    0 -1px 10px 0 rgba(0, 0, 0, .12);
}
</style>
