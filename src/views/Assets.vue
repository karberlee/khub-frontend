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

      <div>
        <div v-for="asset in data.assetList">{{ asset }}</div>
      </div>

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
  statusMapping: {
    1: "operational",
    2: "idle",
    3: "retired",
    4: "disposed",
    5: "transferred",
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
  assetList: [],
  currentAssetItem: { status: 1 }
})

const searchText = ref("")
const searchStatus = ref(0)
const editDialog = ref(false)
const deleteDialog = ref(false)
const formTitle = ref("New Asset")

// search asset
const searchAsset = async () => {
  // if (searchText.value || searchStatus.value > 0) {
  //   const query = {
  //     search: searchText.value || '',
  //     status: searchStatus.value
  //   }
  //   store.commit('setGlobalLoading', true)
  //   const res = await $get('/asset', query)
  //   store.commit('setGlobalLoading', false)
  //   if (res.data.code === 0) {
  //     data.assetList = res.data.body
  //   } else {
  //     alert(res.data.message)
  //   }
  // } else {
  //   await init()
  // }
}

// open insert dialog
const addAsset = () => {
  // data.currentAssetItem = { status: 1 }
  // formTitle.value = "New Asset"
  // editDialog.value = true
}

onMounted(() => {
  init()
})

// component init, get all asset
const init = async () => {
  store.commit('setGlobalLoading', true)
  const res = await $get("/asset", { workspaceId: localStorage.getItem('workspaceId') })
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
  background-color: pink;
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
</style>