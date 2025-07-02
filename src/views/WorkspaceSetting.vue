<template>
  <div class="workspace-setting">
    <div class="workspace-header">
      <div class="global-title">Workspaces Page</div>
      <v-btn color="success" @click="createWorkspace()">Create</v-btn>
    </div>
    <div class="workspace-list">
      <div class="workspace-item" v-for="workspace in data.workspaceList">
        <div class="info-row">
          <div class="name">{{ workspace.name }}</div>
          <div class="create-time">{{ getLocalTime(workspace.createTime) || "No Create Time" }}</div>
        </div>

        <div class="statistic-row">
          <div class="statistic-square">
            <div class="square-top">Site:</div>
            <div class="square-buttom">{{ getStatisticCount(workspace, 'Site') }}</div>
          </div>
          <div class="statistic-square">
            <div class="square-top">Note:</div>
            <div class="square-buttom">{{ getStatisticCount(workspace, 'Note') }}</div>
          </div>
          <div class="statistic-square">
            <div class="square-top">Doc:</div>
            <div class="square-buttom">{{ getStatisticCount(workspace, 'Doc') }}</div>
          </div>
          <div class="statistic-square">
            <div class="square-top">Asset:</div>
            <div class="square-buttom">{{ getStatisticCount(workspace, 'Asset') }}</div>
          </div>
        </div>

        <div class="button-row">
          <v-switch
            v-model="workspace.active" 
            color="primary" 
            :label="getStatus(workspace.active)" 
            hide-details 
            inset
            :disabled="workspace.default"
            @click="traggerSwitch(workspace)"
          ></v-switch>
          <v-btn color="primary" @click="renameWorkspace(workspace)" :disabled="workspace.default">Rename</v-btn>
          <v-btn color="success" @click="getStatistic(workspace)" :disabled="!workspace.active">Statistic</v-btn>
          <v-btn color="orange-darken-1" @click="deleteWorkspace(workspace)" :disabled="workspace.default">Delete</v-btn>
        </div>
      </div>
    </div>

    <!-- switch dialog -->
    <v-dialog
      v-model="switchDialog"
      max-width="50rem"
      @click:outside="cancelTragger"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Authorization</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-text-field
              variant="outlined"
              v-model="password"
              label="Password"
              hide-details
            ></v-text-field>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey" variant="elevated" @click="cancelTragger">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="elevated" @click="confirmTragger">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- rename dialog -->
    <v-dialog
      v-model="editDialog"
      max-width="50rem"
      @click:outside="close"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-text-field
              variant="outlined"
              v-model="data.currentWorkspace.name"
              label="Workspace Name"
              hide-details
            ></v-text-field>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey" variant="elevated" @click="close">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="elevated" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="50rem" @click:outside="deleteCancel">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this workspace?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey" variant="elevated" @click="deleteCancel">Cancel</v-btn>
          <v-btn color="error" variant="elevated" @click="deleteConfirm">Yes</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onErrorCaptured, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const store = useStore()

const editDialog = ref(false)
const switchDialog = ref(false)
const deleteDialog = ref(false)
const password = ref('')
const formTitle = ref('')

const data = reactive({
  workspaceList: [],
  workspaceStatistics: {},
  currentWorkspace: {},
})

const getLocalTime = (utcTime) => {
  return dayjs(utcTime).format('YYYY/MM/DD')
}

const getStatus = (active) => {
  return active ? 'Active ' : 'Inactive'
}

const getStatisticCount = (workspace, category) => {
  if (!data.workspaceStatistics[workspace._id]) return '***'
  let count
  switch (category) {
    case 'Site':
      count = data.workspaceStatistics[workspace._id]?.siteCount
      break;
    case 'Note':
      count = data.workspaceStatistics[workspace._id]?.noteCount
      break;
    case 'Doc':
      count = data.workspaceStatistics[workspace._id]?.doc.totalCount
      break;
    case 'Asset':
      count = data.workspaceStatistics[workspace._id]?.assetCount
      break;
    default:
      break;
  }
  return count
}

const traggerSwitch = (workspace) => {
  Object.assign(data.currentWorkspace, workspace)
  switchDialog.value = true
}

const confirmTragger = async () => {
  store.commit('setGlobalLoading', true)
  const res = await $post("/user/check", { password: password.value })
  store.commit('setGlobalLoading', false)
  if (res.data.code === 0) {
    const params = {}
    params.active = !data.currentWorkspace.active
    await $patch(`/workspace/${data.currentWorkspace._id}`, params)
    cancelTragger()
  }
}

// cancel switch tragger
const cancelTragger = async () => {
  data.currentWorkspace = {}
  password.value = ''
  switchDialog.value = false
  await init()
  store.commit('setGlobalLoading', false)
}

// open insert dialog
const createWorkspace = () => {
  formTitle.value = "Create Workspace"
  editDialog.value = true
}

// search workspace statistic
const getStatistic = async (workspace) => {
  store.commit('setGlobalLoading', true)
  const res = await $get(`/workspace/${workspace._id}/statistic`)
  store.commit('setGlobalLoading', false)
  if (res.data.code === 0) {
    data.workspaceStatistics[workspace._id] = res.data.body
  } else {
    alert(res.data.message)
  }
}

// open edit dialog
const renameWorkspace = (workspace) => {
  formTitle.value = "Rename Workspace"
  Object.assign(data.currentWorkspace, workspace)
  editDialog.value = true
}

// save workspace, insert or edit
const save = async () => {
  store.commit('setGlobalLoading', true)
  if (data.currentWorkspace._id) {
    const workspaceId = data.currentWorkspace._id
    const params = { name: data.currentWorkspace.name }
    await $patch(`/workspace/${workspaceId}`, params)
  } else {
    await $post("/workspace", data.currentWorkspace)
  }
  close()
  await init()
}

// close insert or edit dialog
const close = async () => {
  data.currentWorkspace = {}
  formTitle.value = ''
  editDialog.value = false
  store.commit('setGlobalLoading', false)
}

// open delete comfirm dialog
const deleteWorkspace = (workspace) => {
  Object.assign(data.currentWorkspace, workspace)
  deleteDialog.value = true
}

// confirm delete
const deleteConfirm = async () => {
  store.commit('setGlobalLoading', true)
  await $delete(`/workspace/${data.currentWorkspace._id}`)
  deleteCancel()
  await init()
}

// cancel delete
const deleteCancel = () => {
  data.currentWorkspace = {}
  deleteDialog.value = false
  store.commit('setGlobalLoading', false)
}

onMounted(() => {
  init()
})

// component init
const init = async () => {
  store.commit('setGlobalLoading', true)
  const res = await $get("/workspace")
  store.commit('setGlobalLoading', false)
  if (res.data.code === 0) {
    data.workspaceList = res.data.body
  } else {
    alert(res.data.message)
  }
}

onErrorCaptured((err, instance, info) => {
  console.error('Error Captured In WorkspaceSetting:', err)
  console.error('Component Info:', info)
  // 返回 false 表示错误已处理，不会继续向上传播
  return true
})

</script>

<style lang="scss" scoped>
.workspace-setting {
  width: 100%;
  padding: 1rem;
}

.workspace-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.workspace-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 每行2列，每列宽度相等 */
  gap: 1rem; /* 网格单元格之间的间隙 */
}

.workspace-item {
  height: fit-content;
  // margin: 1rem 0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease; /* 添加过渡效果，使得阴影变化更加平滑 */

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .create-time {
      color: #bfbfbf;
    }
  }

  .statistic-row {
    display: flex;
    // grid-template-columns: repeat(2, 1fr); /* 每行2列，每列宽度相等 */
    gap: 0.5rem; /* 网格单元格之间的间隙 */
    margin: 0.5rem 0;

    .statistic-square {
      width: calc( (100% - 1.5rem) / 4 );
      border-radius: 10px;
      background: linear-gradient(to bottom, #FF6A13 50%, #f3f3f3 50%); /* 上下两半颜色 */
      padding: 0.2rem 0.5rem;
      font-weight: 700;
      text-align: center;
      border: 3px solid #FF6A13;

      .square-top {
        color: #f3f3f3;
      }

      .square-buttom {
        color: #FF6A13;
      }
    }
  }

  .button-row {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    align-items: center;

    // .v-input :deep(.v-input__details) {
    //   display: none;
    // }
  }
}
</style>