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
        :search="search"
      >
        <template v-slot:item.siteName="{ item }">
          <div class="row-field">{{ item.siteName }}</div>
        </template>
        <template v-slot:item.siteLink="{ item }">
          <div class="row-field">{{ item.siteLink }}</div>
        </template>
        <template v-slot:item.account="{ item }">
          <div class="row-field">{{ item.account }}</div>
        </template>
        <template v-slot:item.password="{ item }">
          <div class="row-field">{{ item.password }}</div>
        </template>
        <template v-slot:item.description="{ item }">
          <div class="row-field">{{ item.description }}</div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            class="me-2"
            size="large"
            @click="editSite(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="large"
            @click="deleteSite(item)"
          >
            mdi-delete
          </v-icon>
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
              color="blue-darken-1"
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
            <v-btn color="blue-darken-1" variant="elevated" @click="deleteCancel">Cancel</v-btn>
            <v-btn color="blue-darken-1" variant="elevated" @click="deleteConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, getCurrentInstance } from "vue"
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const data = reactive({
  siteList: [
    {

      siteName: "KHub1",
      siteLink: "http://khub.karber.top",
      account: "aaa@example.com",
      password: "ksahdnjakjdas",
      description: "This is a test site."
    },
    {
      siteName: "KHub Backend2",
      siteLink: "http://khub-backend.karber.top",
      account: "bbb@example.com",
      password: "xzmckajkdvff",
      description: "This is a test site backend."
    },
    {
      siteName: "KHub Api Docs3",
      siteLink: "http://khub.karber.top/apidocs",
      account: "ccc@example.com",
      password: "ujdvfsbdjavkv",
      description: "This is a test site api docs."
    },
    {
      siteName: "KHub Mongo Check4",
      siteLink: "http://mongo.karber.top",
      account: "ddd@example.com",
      password: "asdfjkakjsdva",
      description: "This is a test site db status check."
    },
    {
      siteName: "KHub5",
      siteLink: "http://khub.karber.top",
      account: "aaa@example.com",
      password: "ksahdnjakjdas",
      description: "This is a test site."
    },
    {
      siteName: "KHub Backend6",
      siteLink: "http://khub-backend.karber.top",
      account: "bbb@example.com",
      password: "xzmckajkdvff",
      description: "This is a test site backend."
    },
    {
      siteName: "KHub Api Docs7",
      siteLink: "http://khub.karber.top/apidocs",
      account: "ccc@example.com",
      password: "ujdvfsbdjavkv",
      description: "This is a test site api docs."
    },
    {
      siteName: "KHub Mongo Check8",
      siteLink: "http://mongo.karber.top",
      account: "ddd@example.com",
      password: "asdfjkakjsdva",
      description: "This is a test site db status check."
    },
    {
      siteName: "KHub9",
      siteLink: "http://khub.karber.top",
      account: "aaa@example.com",
      password: "ksahdnjakjdas",
      description: "This is a test site."
    },
    {
      siteName: "KHub Backend10",
      siteLink: "http://khub-backend.karber.top",
      account: "bbb@example.com",
      password: "xzmckajkdvff",
      description: "This is a test site backend."
    },
    {
      siteName: "KHub Api Docs11",
      siteLink: "http://khub.karber.top/apidocs",
      account: "ccc@example.com",
      password: "ujdvfsbdjavkv",
      description: "This is a test site api docs."
    },
    {
      siteName: "KHub Mongo Check12",
      siteLink: "http://mongo.karber.top",
      account: "ddd@example.com",
      password: "asdfjkakjsdva",
      description: "This is a test site db status check."
    },
    {
      siteName: "KHub13",
      siteLink: "http://khub.karber.top",
      account: "aaa@example.com",
      password: "ksahdnjakjdas",
      description: "This is a test site."
    },
    {
      siteName: "KHub Backend14",
      siteLink: "http://khub-backend.karber.top",
      account: "bbb@example.com",
      password: "xzmckajkdvff",
      description: "This is a test site backend."
    },
    {
      siteName: "KHub Api Docs15",
      siteLink: "http://khub.karber.top/apidocs",
      account: "ccc@example.com",
      password: "ujdvfsbdjavkv",
      description: "This is a test site api docs."
    },
    {
      siteName: "KHub Mongo Check16",
      siteLink: "http://mongo.karber.top",
      account: "ddd@example.com",
      password: "asdfjkakjsdva",
      description: "This is a test site db status check."
    },
    {
      siteName: "KHub17",
      siteLink: "http://khub.karber.top",
      account: "aaa@example.com",
      password: "ksahdnjakjdas",
      description: "This is a test site."
    },
    {
      siteName: "KHub Backend18",
      siteLink: "http://khub-backend.karber.top",
      account: "bbb@example.com",
      password: "xzmckajkdvff",
      description: "This is a test site backend."
    },
    {
      siteName: "KHub Api Docs19",
      siteLink: "http://khub.karber.top/apidocs",
      account: "ccc@example.com",
      password: "ujdvfsbdjavkv",
      description: "This is a test site api docs."
    },
    {
      siteName: "KHub Mongo Check20",
      siteLink: "http://mongo.karber.top",
      account: "ddd@example.com",
      password: "asdfjkakjsdva",
      description: "This is a test site db status check."
    },
    {
      siteName: "KHub21",
      siteLink: "http://khub.karber.top",
      account: "aaa@example.com",
      password: "ksahdnjakjdas",
      description: "This is a test site."
    },
    {
      siteName: "KHub Backend22",
      siteLink: "http://khub-backend.karber.top",
      account: "bbb@example.com",
      password: "xzmckajkdvff",
      description: "This is a test site backend."
    },
    {
      siteName: "KHub Api Docs23",
      siteLink: "http://khub.karber.top/apidocs",
      account: "ccc@example.com",
      password: "ujdvfsbdjavkv",
      description: "This is a test site api docs."
    },
    {
      siteName: "KHub Mongo Check24",
      siteLink: "http://mongo.karber.top",
      account: "ddd@example.com",
      password: "asdfjkakjsdva",
      description: "This is a test site db status check."
    },
  ],
  currentSiteItem: {}
})

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
  {
    key: 'password',
    sortable: false,
    title: 'Password',
    width: '15%',
  },
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
const deleteDialog = ref(false)
const currentIndex = ref(-1)
const deleteIndex = ref(-1)

const formTitle = computed(() => {
  return currentIndex.value === -1 ? 'New Site' : 'Edit Site'
})

const addSite = () => {
  data.currentSiteItem = {}
  editDialog.value = true
}

const editSite = (item) => {
  editDialog.value = true
  currentIndex.value = item._id
  Object.assign(data.currentSiteItem, item)
}

const save = async () => {
  if (currentIndex.value === -1) {
    await $post("/site", data.currentSiteItem)
  } else {
    delete data.currentSiteItem._id
    delete data.currentSiteItem.__v
    await $patch(`/site/${currentIndex.value}`, data.currentSiteItem)
  }
  await init()
  close()
}

const close = async () => {
  await nextTick()
  data.currentSiteItem = {}
  currentIndex.value = -1
  editDialog.value = false
}

const deleteSite = (item) => {
  deleteIndex.value = item._id
  deleteDialog.value = true
}

const deleteCancel = () => {
  deleteIndex.value = -1
  deleteDialog.value = false
}

const deleteConfirm = async () => {
  await $delete(`/site/${deleteIndex.value}`)
  await init()
  deleteCancel()
}

onMounted(() => {
  init()
})

const init = async () => {
  const res = await $get("/site")
  if (res.data.code === 0) {
    data.siteList = res.data.body
  } else {
    alert("error")
  }
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

.row-field {
  max-width: 300px;
  overflow: hidden; /* 隐藏超出部分 */
  white-space: nowrap; /* 不换行 */
  text-overflow: ellipsis; /* 显示省略号 */
}

@media (max-width: $tablet-breakpoint) {
  // .home {
  //   background-color: var(--background-color);
  // }
}
</style>