<template>
  <div class="global-content sites">
    <div class="sites-content">
      <div class="global-title">Sites Page</div>
      <div>
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
      </div>
      
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
                    v-model="currentSiteItem.siteName"
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
                    v-model="currentSiteItem.siteLink"
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
                    v-model="currentSiteItem.account"
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
                    v-model="currentSiteItem.password"
                    label="Password"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-textarea
                    variant="outlined"
                    v-model="currentSiteItem.description"
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

const search = ref("")

const headers = reactive([
  {
    align: 'start',
    key: 'siteName',
    title: 'Site',
  },
  {
    key: 'siteLink',
    title: 'Link',
  },
  {
    key: 'account',
    title: 'Account',
  },
  {
    key: 'password',
    sortable: false,
    title: 'Password',
  },
  {
    key: 'description',
    title: 'Description',
  },
  {
    key: 'actions',
    title: 'Actions',
    sortable: false
  },
])

const desserts = reactive([
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
])

const editDialog = ref(false)
const deleteDialog = ref(false)
const currentIndex = ref(-1)
const deleteIndex = ref(-1)
const currentSiteItem = reactive({
  siteName: "",
  siteLink: "",
  account: "",
  password: "",
  description: "",
})
const formTitle = computed(() => {
  return currentIndex.value === -1 ? 'New Site' : 'Edit Site'
})

const editSite = (item) => {
  editDialog.value = true
  currentIndex.value = desserts.indexOf(item)
  Object.assign(currentSiteItem, item)
}

const save = () => {
  if (currentIndex.value > -1) {
    Object.assign(desserts[currentIndex.value], currentSiteItem)
  } else {
    desserts.push(Object.assign({}, currentSiteItem))
  }
  close()
}

const close = async () => {
  await nextTick()
  Object.assign(currentSiteItem, {
    siteName: "",
    siteLink: "",
    account: "",
    password: "",
    description: "",
  })
  currentIndex.value = -1
  editDialog.value = false
}

const deleteSite = (item) => {
  deleteIndex.value = desserts.indexOf(item)
  deleteDialog.value = true
}

const deleteCancel = () => {
  deleteIndex.value = -1
  deleteDialog.value = false
}

const deleteConfirm = () => {
  desserts.splice(deleteIndex.value, 1)
  deleteIndex.value = -1
  deleteDialog.value = false
}

onMounted(() => {
  init()
})

const init = async () => {
  const res = await appContext.config.globalProperties.$get("/site")
  desserts = res.data
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

@media (max-width: $tablet-breakpoint) {
  // .home {
  //   background-color: var(--background-color);
  // }
}
</style>