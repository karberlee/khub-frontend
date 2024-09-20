<template>
  <div class="global-content notes">
    <div class="notes-content">
      <div class="global-title">Notes Page</div>
      <div class="">
        <v-text-field
          clearable
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo"
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              class="me-2"
              size="large"
              @click="editNote(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              size="large"
              @click="deleteNote(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
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
  {
    key: 'actions',
    title: 'Actions',
    sortable: false
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

const editNote = (item) => {
  item.content += '1'
}

const deleteNote = (item) => {
  let index = desserts.indexOf(item)
  desserts.splice(index, 1)
}

</script>

<style lang="scss" scoped>
.notes {
  // margin-top: 5rem;
  // min-height: calc( 100vh - 10rem );
  // display: flex;
  // justify-content: center;
}

.notes-content {
  width: 80%;
  // margin-top: 2rem;
  // display: grid;
  // place-items: center;
}

@media (max-width: $tablet-breakpoint) {
  // .home {
  //   background-color: var(--background-color);
  // }
}
</style>