<template>
  <div class="global-content assets">
    <div class="assets-content">
      <div class="global-title">Assets Page</div>

      <div class="search-row">
        <v-text-field
          max-width="40%"
          clearable
          v-model="searchText"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        ></v-text-field>
        <v-select
          max-width="10%"
          v-model="searchStatus"
          label="Asset Status"
          :items="data.statusSearchSelect"
          variant="outlined"
        ></v-select>
        <div class="btn-area">
          <v-btn color="success" @click="searchAsset">Search</v-btn>
          <div class="btn-end-area">
            <v-btn color="success" @click="addAsset">New</v-btn>
            <!-- <v-btn color="success">Delete</v-btn> -->
          </div>
        </div>
      </div>

      <div class="assets-area">
        <div v-for="asset in data.assetList" :class="`asset-item ${data.bgColorMapping[asset.status]}`" @click="showAssetDetail(asset)">
          <div class="thumbnail">
            <v-img
              height="8rem"
              width="14rem"
              :src="`/images/samples/001.jpg`"
              cover
              class="thumbnail-img"
            ></v-img>
          </div>
          <div class="asset-column">{{ asset.name }}</div>
          <div class="asset-column">{{ asset.price }}</div>
          <div class="asset-column">{{ asset.category }}</div>
          <div class="asset-column">{{ data.statusMapping[asset.status] }}</div>
          <!-- <div class="asset-column">{{ asset.comment }}</div> -->
          <div class="asset-column">{{ getLocalTime(asset.obtainDate) }}</div>
        </div>
      </div>

      <v-dialog
        v-model="detailDialog"
        max-width="70rem"
        max-height="60vh"
        @click:outside="closeAssetDetail"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Asset Detail</span>
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
                    v-model="data.currentAssetItem.name"
                    label="Name"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model.number="data.currentAssetItem.price"
                    label="Price"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentAssetItem.obtainDate"
                    label="Obtain Date"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentAssetItem.obtainWay"
                    label="Obtain Way"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentAssetItem.category"
                    label="Category"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-select
                    v-model="data.currentAssetItem.status"
                    label="Status"
                    :items="data.statusSelect"
                    variant="outlined"
                    disabled
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentAssetItem.thumbnail"
                    label="Thumbnail"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentAssetItem.images"
                    label="Images"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    variant="outlined"
                    v-model="data.currentAssetItem.comment"
                    label="Comment"
                    rows="20"
                    disabled
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
              @click="closeAssetDetail"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="elevated"
              @click="editAsset"
            >
              Edit
            </v-btn>
            <v-btn
              v-if="data.currentAssetItem._id"
              color="error"
              variant="elevated"
              @click="deleteAsset"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="editDialog"
        max-width="50rem"
        max-height="80vh"
        @click:outside="closeAssetEdit"
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
                    v-model="data.currentEditAsset.name"
                    label="Name"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model.number="data.currentEditAsset.price"
                    label="Price"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentEditAsset.obtainDate"
                    label="Obtain Date"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentEditAsset.obtainWay"
                    label="Obtain Way"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentEditAsset.category"
                    label="Category"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-select
                    v-model="data.currentEditAsset.status"
                    label="Status"
                    :items="data.statusSelect"
                    variant="outlined"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentEditAsset.thumbnail"
                    label="Thumbnail"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    v-model="data.currentEditAsset.images"
                    label="Images"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    variant="outlined"
                    v-model="data.currentEditAsset.comment"
                    label="Comment"
                    rows="20"
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
              @click="closeAssetEdit"
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
import dayjs from 'dayjs'
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const store = useStore()

const data = reactive({
  statusMapping: {
    1: "operational",
    2: "idle",
    3: "retired",
    4: "disposed",
    5: "transferred",
  },
  bgColorMapping: {
    1: "bg-green-lighten-1",
    2: "bg-light-blue-darken-1",
    3: "bg-yellow-darken-1",
    4: "bg-deep-orange-lighten-1",
    5: "bg-grey-darken-1",
  },
  statusSelect: [
    { title: "Operational", value: 1 }, // 正常使用中
    { title: "Idle", value: 2 }, // 空闲但可用状态
    { title: "Retired", value: 3 }, // 退役/停止使用
    { title: "Disposed", value: 4 }, // 已处理/清除，侧重“处理完毕”
    { title: "Transferred", value: 5 }, // 已转移，被重新分配或转手给他人
  ],
  statusSearchSelect: [
    { title: "All", value: 0 },
    { title: "Operational", value: 1 }, // 正常使用中
    { title: "Idle", value: 2 }, // 空闲但可用状态
    { title: "Retired", value: 3 }, // 退役/停止使用
    { title: "Disposed", value: 4 }, // 已处理/清除，侧重“处理完毕”
    { title: "Transferred", value: 5 }, // 已转移，被重新分配或转手给他人
  ],
  workspaceId: localStorage.getItem('workspaceId'),
  assetList: [],
  currentAssetItem: { status: 1 },
  currentEditAsset: { status: 1 },
})

const searchText = ref("")
const searchStatus = ref(0)
const detailDialog = ref(false)
const editDialog = ref(false)
const deleteDialog = ref(false)
const formTitle = ref("New Asset")

// search asset
const searchAsset = async () => {
  if (searchText.value || searchStatus.value > 0) {
    const query = {
      workspaceId: data.workspaceId,
      search: searchText.value || '',
      status: searchStatus.value
    }
    store.commit('setGlobalLoading', true)
    const res = await $get('/asset', query)
    store.commit('setGlobalLoading', false)
    if (res.data.code === 0) {
      data.assetList = res.data.body
    } else {
      alert(res.data.message)
    }
  } else {
    await init()
  }
}

// show asset detail
const showAssetDetail = (asset) => {
  detailDialog.value = true
  Object.assign(data.currentAssetItem, asset)
}

// close asset detail
const closeAssetDetail = () => {
  detailDialog.value = false
  data.currentAssetItem = { status: 1 }
}

// open insert dialog
const addAsset = () => {
  data.currentEditAsset = { status: 1 }
  formTitle.value = "New Asset"
  editDialog.value = true
}

// open edit dialog
const editAsset = () => {
  data.currentEditAsset = Object.assign({}, data.currentAssetItem)
  formTitle.value = "Edit Asset"
  editDialog.value = true
}

// save asset, insert or edit
const save = async () => {
  store.commit('setGlobalLoading', true)
  if (data.currentEditAsset._id) {
    let asset = Object.assign({}, data.currentEditAsset)
    delete asset._id
    delete asset.__v
    delete asset.workspaceId
    delete asset.createTime
    delete asset.updateTime
    await $patch(`/asset/${data.currentEditAsset._id}`, asset)
  } else {
    data.currentEditAsset.workspaceId = data.workspaceId
    await $post("/asset", data.currentEditAsset)
  }
  closeAssetEdit()
  closeAssetDetail()
  await init()
}

// close insert or edit dialog
const closeAssetEdit = async () => {
  editDialog.value = false
  data.currentEditAsset = { status: 1 }
}

// open delete comfirm dialog
const deleteAsset = () => {
  deleteDialog.value = true
}

// cancel delete
const deleteCancel = () => {
  deleteDialog.value = false
}

// confirm delete
const deleteConfirm = async () => {
  store.commit('setGlobalLoading', true)
  await $delete(`/asset/${data.currentAssetItem._id}`)
  store.commit('setGlobalLoading', false)
  deleteCancel()
  closeAssetDetail()
  await init()
}

const getLocalTime = (utcTime) => {
  return dayjs(utcTime).format('YYYY/MM/DD')
}

onMounted(() => {
  init()
})

// component init, get all asset
const init = async () => {
  store.commit('setGlobalLoading', true)
  const res = await $get("/asset", { workspaceId: data.workspaceId })
  store.commit('setGlobalLoading', false)
  if (res.data.code === 0) {
    data.assetList = res.data.body
  } else {
    alert(res.data.message)
  }
}
</script>

<style lang="scss" scoped>
.assets {

}

.assets-content {
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
  gap: 1rem;

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
  }

  .btn-end-area {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    gap: 1rem;
  }
}

.assets-area {
  width: 100%;

  .asset-item {
    height: 10rem;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.3s ease;

    &:hover {
      transform: translateY(0) scale(1.05) rotate(1deg);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .thumbnail {
      width: fit-content;
      height: fit-content;
      
      .thumbnail-img {
        border-radius: 5px;
      }
    }

    .asset-column {
      flex: 1;
      text-align: center;
      font-weight: 700;
      color: #ffffff;
    }
  }
  
}
</style>