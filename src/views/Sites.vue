<template>
  <div class="global-content sites">
    <div class="sites-content">
      <div class="global-title">Sites Page</div>

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
          <v-btn color="success" @click="addSite">New</v-btn>
          <!-- <v-btn color="success">Delete</v-btn> -->
        </div>
      </div>

      <v-data-table
        :headers="headers"
        :items="data.siteList"
        :loading="loading"
        :search="search"
        :items-per-page="25"
      >
        <template v-slot:item.siteName="{ item }">
          <div class="row-field">{{ item.siteName }}</div>
        </template>
        <template v-slot:item.siteLink="{ item }">
          <div class="link-col" @click="openTab(item.siteLink)">
            <v-icon density="comfortable" icon="mdi-open-in-new"></v-icon>
            <div class="row-field">{{ item.siteLink }}</div>
          </div>
        </template>
        <template v-slot:item.account="{ item }">
          <div class="row-field">{{ item.account }}</div>
        </template>
        <!-- <template v-slot:item.password="{ item }">
          <div class="row-field">{{ item.password }}</div>
        </template> -->
        <template v-slot:item.description="{ item }">
          <div class="row-field">{{ item.description }}</div>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="row-option">
            <v-btn density="comfortable" icon="mdi-open-in-new" @click="openTab(item.siteLink)"></v-btn>
            <v-btn density="comfortable" icon="mdi-pencil" @click="editSite(item)"></v-btn>
            <v-btn density="comfortable" icon="mdi-delete" @click="deleteSite(item)"></v-btn>
          </div>
        </template>
      </v-data-table>
      
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
                    v-model="data.currentSiteItem.siteName"
                    label="Site Name"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentSiteItem.siteLink"
                    label="Site Link"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentSiteItem.account"
                    label="Account"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentSiteItem.password"
                    label="Password"
                    :type="showPwd ? 'text' : 'password'"
                    :append-inner-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPwd = !showPwd"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-textarea
                    variant="outlined"
                    v-model="data.currentSiteItem.description"
                    label="Description"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-grey"
              variant="elevated"
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
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteDialog" max-width="50rem">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey" variant="elevated" @click="deleteCancel">Cancel</v-btn>
            <v-btn color="error" variant="elevated" @click="deleteConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
const store = useStore()
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const data = reactive({
  siteList: [],
  currentSiteItem: {}
})

const loading = ref(false)
const search = ref("")

const headers = reactive([
  {
    align: 'start',
    key: 'siteName',
    title: 'Site',
    width: '15%',
  },
  {
    key: 'siteLink',
    title: 'Link',
    width: '15%',
  },
  {
    key: 'account',
    title: 'Account',
    width: '15%',
  },
  // {
  //   key: 'password',
  //   sortable: false,
  //   title: 'Password',
  //   width: '15%',
  // },
  {
    key: 'description',
    title: 'Description',
    width: '15%',
  },
  {
    key: 'actions',
    sortable: false,
    title: 'Actions',
    width: '15%',
  },
])

const editDialog = ref(false)
const showPwd = ref(false)
const deleteDialog = ref(false)
const deleteIndex = ref(-1)
const formTitle = ref("")

// link to website in new tab
const openTab = (link) => {
  window.open(link)
}

// open insert dialog
const addSite = () => {
  data.currentSiteItem = {}
  formTitle.value = "New Site"
  showPwd.value = false
  editDialog.value = true
}

// open edit dialog
const editSite = (item) => {
  formTitle.value = "Edit Site"
  showPwd.value = false
  editDialog.value = true
  Object.assign(data.currentSiteItem, item)
}

// save site, insert or edit
const save = async () => {
  store.commit('setGlobalLoading', true)
  if (data.currentSiteItem._id) {
    const siteId = data.currentSiteItem._id
    delete data.currentSiteItem._id
    delete data.currentSiteItem.__v
    await $patch(`/site/${siteId}`, data.currentSiteItem)
  } else {
    await $post("/site", data.currentSiteItem)
  }
  close()
  await init()
}

// close insert or edit dialog
const close = async () => {
  data.currentSiteItem = {}
  showPwd.value = false
  editDialog.value = false
  store.commit('setGlobalLoading', false)
}

// open delete comfirm dialog
const deleteSite = (item) => {
  deleteIndex.value = item._id
  deleteDialog.value = true
}

// cancel delete
const deleteCancel = () => {
  deleteIndex.value = -1
  deleteDialog.value = false
  store.commit('setGlobalLoading', false)
}

// confirm delete
const deleteConfirm = async () => {
  store.commit('setGlobalLoading', true)
  await $delete(`/site/${deleteIndex.value}`)
  deleteCancel()
  await init()
}

onMounted(() => {
  init()
})

// component init, get all site
const init = async () => {
  loading.value = true
  const res = await $get("/site")
  if (res.data.code === 0) {
    data.siteList = res.data.body
  } else {
    alert(res.data.message)
  }
  loading.value = false
}

</script>

<style lang="scss" scoped>
.sites {
  // margin-top: 5rem;
  // min-height: calc( 100vh - 12rem );
  // display: flex;
  // justify-content: center;
}

.sites-content {
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
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    gap: 1rem;
  }
}

.v-data-table :deep(.v-table__wrapper) {
  overflow: unset;
}

.link-col {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    color: blue;
  }
}

.row-field {
  max-width: 300px;
  overflow: hidden; /* 隐藏超出部分 */
  white-space: nowrap; /* 不换行 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.row-option {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}

@media (max-width: $tablet-breakpoint) {
  // .home {
  //   background-color: var(--background-color);
  // }
}
</style>