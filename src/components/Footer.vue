<template>
  <footer>
    <div>Copyright &copy; 2024 Karber Lee. All rights reserved.</div>
  </footer>
</template>

<script setup>
  // No script needed for a static footer component
</script>

<style scoped>
footer {
  height: 5rem;
  width: 100%;
  /* margin-top: 2rem; */
  color: var(--text-color);
  /* background-color: var(--background-color); */
  background-color: var(--pure-color);
  font-weight: 500;
  display: grid;
  place-items: center;
  box-shadow: 
    0 -2px 4px 0 rgba(0, 0, 0, .2);
    /* 0 -4px 5px 0 rgba(0, 0, 0, .14), 
    0 -1px 10px 0 rgba(0, 0, 0, .12); */
}
</style>
