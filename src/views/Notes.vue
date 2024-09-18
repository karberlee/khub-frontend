<template>
  <div class="notes">
    <div>Notes Page</div>
    <div>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue"

const search = ref("")

const headers = reactive([
  {
    align: 'start',
    key: 'title',
    sortable: false,
    title: 'Title',
  },
  {
    key: 'content',
    title: 'Content'
  },
])

const desserts = reactive([
  {
    title: "aaa",
    content: "kjsdnvjdnvjdknvlkasdkjdfv"
  },
  {
    title: "bbb",
    content: "jknjkdsbhgvbakjlgvlj\r\nsygadhbav"
  },
  {
    title: "ccc",
    content: "skajfbkjdkjafj\nashfdshabfhd\nsaveagve"
  },
])

</script>

<style lang="scss" scoped>
.notes {
  margin-top: 5rem;
  min-height: calc( 100vh - 10rem );
  background-color: var(--background-color);
}

@media (max-width: $tablet-breakpoint) {
  // .home {
  //   background-color: var(--background-color);
  // }
}
</style>