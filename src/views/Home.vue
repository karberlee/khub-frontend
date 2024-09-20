<template>
  <div class="global-content home">
    <div>Home Page</div>
    <p>Welcome to the home page!</p>
  </div>
</template>

<script setup>
  // No script needed for a static home page component
</script>

<style lang="scss" scoped>
/* Home page styles */

.home {
  // margin-top: 5rem;
  // min-height: calc( 100vh - 10rem );
}

@media (max-width: $tablet-breakpoint) {
  // .home {
  //   background-color: var(--background-color);
  // }
}
</style>
