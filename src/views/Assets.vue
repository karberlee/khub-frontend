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
        <div v-for="asset in data.assetList" :key="asset._id" :class="`asset-item ${data.bgColorMapping[asset.status]}`" @click="showAssetDetail(asset)">
          <div class="thumbnail">
            <v-img
              height="8rem"
              width="14rem"
              :src="baseUrl + '/' + asset.thumbnail"
              cover
              class="thumbnail-img"
            >
              <template v-slot:error>
                <v-img
                  height="8rem"
                  max-width="14rem"
                  :src="defaultImage"
                  cover
                ></v-img>
              </template>
            </v-img>
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
        width="80vw"
        max-width="100rem"
        max-height="90vh"
        class="detail-dialog"
        @click:outside="closeAssetDetail"
      >
        <v-card :class="`pa-4 ${data.bgColorMapping[data.currentAssetItem.status]}`">
          <v-card-title>
            <span class="text-h5">Asset Detail</span>
          </v-card-title>

          <v-card-text>
            <div class="detail-grid">
              <!-- 左侧区域 -->
              <div class="left-side">
                <v-img
                  height="18rem"
                  max-width="100%"
                  :src="baseUrl + '/' + data.currentAssetItem.thumbnail"
                  cover
                  class="mb-4"
                >
                  <template v-slot:error>
                    <v-img
                      class="mb-4"
                      height="18rem"
                      max-width="100%"
                      :src="defaultImage"
                      cover
                    ></v-img>
                  </template>
                </v-img>

                <div class="item-field">
                  <label class="item-label">Name</label>
                  <div class="item-display">{{ data.currentAssetItem.name }}</div>
                </div>

                <div class="item-field">
                  <label class="item-label">Category</label>
                  <div class="item-display">{{ data.currentAssetItem.category }}</div>
                </div>

                <div class="item-field">
                  <label class="item-label">Obtain Way</label>
                  <div class="item-display">{{ data.currentAssetItem.obtainWay }}</div>
                </div>

                <div class="item-field">
                  <label class="item-label">Status</label>
                  <div class="item-display">{{ data.statusMapping[data.currentAssetItem.status] }}</div>
                </div>
              </div>

              <!-- 中间竖线 -->
              <div class="divider"></div>

              <!-- 右侧区域 -->
              <div class="right-side">
                <v-row>
                  <v-col cols="12">
                    <v-carousel v-if="data.currentAssetItem.images?.length > 0" height="30rem" show-arrows="hover">
                      <v-carousel-item
                        v-for="(img, i) in data.currentAssetItem.images"
                        :key="i"
                      >
                        <v-img :src="baseUrl + '/' + img" cover height="30rem" />
                      </v-carousel-item>
                    </v-carousel>

                    <v-empty-state
                      v-else
                      height="30rem"
                      headline="Empty Image List"
                      title="Images not exist"
                      text="No images have been uploaded for this asset"
                      :image="defaultImage"
                    ></v-empty-state>
                  </v-col>

                  <v-divider class="ma-4" />

                  <v-col cols="12" sm="6">
                    <div class="item-field-col">
                      <label class="item-label">Obtain Date</label>
                      <div class="item-value">{{ getLocalTime(data.currentAssetItem.obtainDate) }}</div>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div class="item-field-col">
                      <label class="item-label">Owned Days</label>
                      <div class="item-value">{{ getDaysDiffFromNow(data.currentAssetItem.obtainDate) }}</div>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div class="item-field-col">
                      <label class="item-label">Asset Price</label>
                      <div class="item-value">{{ data.currentAssetItem.price }}</div>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div class="item-field-col">
                      <label class="item-label">Daily Cost</label>
                      <div class="item-value">{{ getDailyCost(data.currentAssetItem) }}</div>
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <div class="item-field-col">
                      <label class="item-label">Comment</label>
                      <div class="item-value">
                        <pre>{{ data.currentAssetItem.comment }}</pre>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-grey"
              variant="elevated"
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
        max-height="90vh"
        class="edit-dialog"
        @click:outside="closeAssetEdit"
      >
        <v-card class="pa-4">
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
                  <div class="edit-upload-image">
                    <ImageUploader
                      ref="thumbnailImageUploaderRef"
                      label="Thumbnail"
                      resourceType="asset"
                      :multiple="false"
                      v-model="data.currentEditAsset.thumbnail"
                    />
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="edit-upload-image">
                    <ImageUploader
                      ref="imagesImageUploaderRef"
                      label="Images"
                      resourceType="asset"
                      :multiple="true"
                      v-model="data.currentEditAsset.images"
                    />
                  </div>
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
              color="blue-grey"
              variant="elevated"
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
        <v-card class="pa-4">
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
import { ref, reactive, computed, watch, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
import dayjs from 'dayjs'
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties
import ImageUploader from '@/components/ImageUploader.vue'
import defaultImage from '@/assets/images/panda.png'

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

const baseUrl = import.meta.env.VITE_API_URL
const searchText = ref("")
const searchStatus = ref(0)
const detailDialog = ref(false)
const editDialog = ref(false)
const deleteDialog = ref(false)
const formTitle = ref("New Asset")

const thumbnailImageUploaderRef = ref(null)
const imagesImageUploaderRef = ref(null)

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
  await thumbnailImageUploaderRef.value.uploadAll()
  await imagesImageUploaderRef.value.uploadAll()
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

const getDaysDiffFromNow = (utcTime) => {
  const now = dayjs().startOf('day') // 当前本地时间（去掉时分秒）
  const target = dayjs(utcTime).startOf('day') // 目标 UTC 时间（去掉时分秒）
  return now.diff(target, 'day') // 计算天数差
}

const getDailyCost = (asset) => {
  const days = getDaysDiffFromNow(asset.obtainDate)
  if (days <= 0) return 0
  return parseFloat((asset.price / days).toFixed(2))
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

.edit-dialog {
  .edit-upload-image {
    margin-bottom: 1rem;
  }
}

.detail-dialog {
  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1px 2fr; /* 左中右三列 */
    gap: 1rem;
    align-items: start;
  }

  .left-side {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .divider {
    background-color: rgba(0, 0, 0, 0.12);
    width: 1px;
    height: 100%;
  }

  .item-field {
    margin: 0.5rem 0;
  }

  .item-label {
    font-weight: 500;
    font-size: 0.9rem;
    // color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0.25rem;
    display: block;
  }

  .item-display {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .item-value {
    font-size: 1rem;
    padding: 0.75rem 1rem;
    color: #000000;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    white-space: pre-wrap;
    min-height: 3.5rem;
    display: flex;
    align-items: center;
  }

}
</style>