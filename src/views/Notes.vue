<template>
  <div class="global-content notes">
    <div class="notes-content">
      <div class="global-title">Notes Page</div>

      <div class="search-row">
        <v-text-field
          max-width="50%"
          clearable
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        ></v-text-field>
        <div class="btn-area">
          <v-btn color="success" @click="searchNote">Search</v-btn>
          <div class="btn-end-area">
            <v-btn color="success" @click="addNote">New</v-btn>
            <!-- <v-btn color="success">Delete</v-btn> -->
          </div>
        </div>
      </div>

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
          @click="editNote(note)"
        >
          <v-card-item>
            <!-- <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-account"></v-icon>
            </template> -->
            <!-- <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template> -->
            <v-card-title>{{ note.title || "No Title" }}</v-card-title>
            <v-card-subtitle>{{ getLocalTime(note.updateTime) || "No Update Time" }}</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div class="card-content">{{ note.content }}</div>
          </v-card-text>
        </v-card>
        </v-col>
      </v-row>

      <v-dialog
        v-model="editDialog"
        max-width="50rem"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentNoteItem.title"
                    label="Note Title"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-select
                    v-model="data.currentNoteItem.level"
                    label="Note Level"
                    :items="data.levelSelect"
                    variant="outlined"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-textarea
                    variant="outlined"
                    v-model="data.currentNoteItem.content"
                    label="Content"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="tonal"
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="elevated"
              @click="save"
            >
              Save
            </v-btn>
            <v-btn
              v-if="data.currentNoteItem._id"
              color="error"
              variant="elevated"
              @click="deleteNote"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteDialog" max-width="50rem">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="tonal" @click="deleteCancel">Cancel</v-btn>
            <v-btn color="error" variant="elevated" @click="deleteConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const store = useStore()

const data = reactive({
  colorMapping: {
    1: "success",
    2: "info",
    3: "warning",
    4: "error"
  },
  levelSelect: [
    { title: "Default", value: 0 },
    { title: "Normal", value: 1 },
    { title: "Low", value: 2 },
    { title: "Medium", value: 3 },
    { title: "High", value: 4 },
  ],
  noteList: [],
  currentNoteItem: { level: 0 }
})

const search = ref("")
const editDialog = ref(false)
const deleteDialog = ref(false)
const formTitle = ref("New Note")

// search note
const searchNote = () => {
  // store.commit('setGlobalLoading', true)
  alert("not implemented")
  console.log("search note:", search.value)
}

// open insert dialog
const addNote = () => {
  data.currentNoteItem = { level: 0 }
  formTitle.value = "New Note"
  editDialog.value = true
}

// open edit dialog
const editNote = (item) => {
  formTitle.value = "Edit Note"
  editDialog.value = true
  Object.assign(data.currentNoteItem, item)
}

// save note, insert or edit
const save = async () => {
  store.commit('setGlobalLoading', true)
  if (data.currentNoteItem._id) {
    const noteId = data.currentNoteItem._id
    delete data.currentNoteItem._id
    delete data.currentNoteItem.__v
    await $patch(`/note/${noteId}`, data.currentNoteItem)
  } else {
    await $post("/note", data.currentNoteItem)
  }
  close()
  await init()
}

// close insert or edit dialog
const close = async () => {
  data.currentNoteItem = { level: 0 }
  editDialog.value = false
  store.commit('setGlobalLoading', false)
}

// open delete comfirm dialog
const deleteNote = () => {
  deleteDialog.value = true
}

// cancel delete
const deleteCancel = () => {
  deleteDialog.value = false
}

// confirm delete
const deleteConfirm = async () => {
  store.commit('setGlobalLoading', true)
  await $delete(`/note/${data.currentNoteItem._id}`)
  store.commit('setGlobalLoading', false)
  deleteCancel()
  close()
  await init()
}

const getLocalTime = (utcTime) => {
  const date = new Date(utcTime)
  return date.toLocaleString()
}

onMounted(() => {
  init()
})

// component init, get all note
const init = async () => {
  store.commit('setGlobalLoading', true)
  const res = await $get("/note")
  if (res.data.code === 0) {
    data.noteList = res.data.body
  } else {
    alert("error")
  }
  store.commit('setGlobalLoading', false)
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

.search-row {
  margin: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .v-text-field {
    background-color: #ffffff;
  }
  
  .v-text-field :deep(.v-input__details) {
    display: none;
  }

  .btn-area {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    margin-left: 1rem;
  }

  .btn-end-area {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    gap: 1rem;
  }
}

.card-content {
  display: -webkit-box; /* 使用弹性盒子模型 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  -webkit-line-clamp: 11; /* 显示的行数 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
  white-space: pre-wrap; /* 换行符换行 */
}

@media (max-width: $tablet-breakpoint) {
  // .home {
  //   background-color: var(--background-color);
  // }
}
</style>