<template>
  <div class="global-content dashboard">
    <div class="dashboard-content">
      <div class="global-title">Dashboard Page</div>

      <div class="count-area">
        <v-card
          hover
          color="blue"
          class="count-card"
        >
          <div class="count-text">{{ data.statistics.siteCount }}</div>
          <div class="card-text">Site Count</div>
        </v-card>
        <v-card
          hover
          color="blue"
          class="count-card"
        >
          <div class="count-text">{{ data.statistics.noteCount }}</div>
          <div class="card-text">Note Count</div>
        </v-card>
        <v-card
          hover
          color="blue"
          class="count-card"
        >
          <div class="count-text">{{ data.statistics.doc?.publicCount }}</div>
          <div class="card-text">Public Blog Count</div>
        </v-card>
        <v-card
          hover
          color="blue"
          class="count-card"
        >
          <div class="count-text">{{ data.statistics.doc?.totalCount }}</div>
          <div class="card-text">Total Blog Count</div>
        </v-card>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
const { appContext } = getCurrentInstance()
const { $get } = appContext.config.globalProperties

const store = useStore()

const data = reactive({
  statistics: {}
})

onMounted(() => {
  init()
})

const init = async () => {
  store.commit('setGlobalLoading', true)
  const res = await $get(`/user/statistics`)
  console.log('res:', res)
  if (res.data.code === 0) {
    data.statistics = res.data.body
  }
  store.commit('setGlobalLoading', false)
}
</script>

<style lang="scss" scoped>
.dashboard {

}

.dashboard-content {
  width: 80%;
}

.count-area {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  flex-wrap: wrap;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 1rem;

  .count-card {
    width: 24rem;
    height: 16rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .count-text {
      font-size: 3rem;
      font-weight: 700;
    }
    
    .card-text {
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
}
</style>