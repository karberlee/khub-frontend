<template>
  <div class="global-content notes">
    <div class="notes-content">
      <div class="global-title">Notes Page</div>
      <v-row>
        <v-col
          cols="12"
          md="2"
          sm="6"
          v-for="note in data.noteList"
          :key="note._id"
        >
        <v-card
          hover
          :color="data.colorMapping[note.level]"
          height="20rem"
        >
          <v-card-item>
            <!-- <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-account"></v-icon>
            </template> -->
            <!-- <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template> -->
            <v-card-title>{{ note.title || "No Title" }}</v-card-title>
            <v-card-subtitle>{{ note.updateTime || "No Update Time" }}</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div class="card-content">{{ note.content }}</div>
          </v-card-text>
        </v-card>
        </v-col>
      </v-row>
      <!-- <div class="">
        <v-text-field
          clearable
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo"
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="data.noteList"
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
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue"

const data = reactive({
  colorMapping: {
    0: "success",
    1: "info",
    2: "warning",
    3: "error"
  },
  noteList: [
    {
      _id: "dksjnvjdvsjfdlvkdsmkv",
      userId: "",
      level: 0,
      title: "9.9-9.14工作日志",
      content: `skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv`,
      createTime: "2024-10-13 09:30",
      updateTime: "2024-10-14 17:10"
    },
    {
      _id: "akslmncdsjkvjsdfnkjv",
      level: 1,
      title: "9.18-9.20工作日志",
      content: `skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv`,
      createTime: "2024-10-13 09:40",
      updateTime: "2024-10-14 17:12"
    },
    {
      _id: "afgaegrfvaegvreg",
      level: 2,
      title: "笔记aaa",
      content: `skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv
        skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv`
    },
    {
      _id: "agvertgrstbhth",
      level: 3,
      title: "bfgndfynj",
      content: `skcnjdfvndaknlfjvskcnjdfvndaknlfjvskcnjdfvndaknlfjv`
    },
  ],
  currentNoteItem: {}
})

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

const editNote = (item) => {
  item.content += '1'
}

const deleteNote = (item) => {
  let index = data.noteList.indexOf(item)
  data.noteList.splice(index, 1)
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

.card-content {
  display: -webkit-box; /* 使用弹性盒子模型 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  -webkit-line-clamp: 11; /* 显示的行数 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}

@media (max-width: $tablet-breakpoint) {
  // .home {
  //   background-color: var(--background-color);
  // }
}
</style>