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
          <div class="count-text">{{ 50 }}</div>
          <div class="card-text">Site Count</div>
        </v-card>
        <v-card
          hover
          color="blue"
          class="count-card"
        >
          <div class="count-text">{{ 20 }}</div>
          <div class="card-text">Note Count</div>
        </v-card>
        <v-card
          hover
          color="blue"
          class="count-card"
        >
          <div class="count-text">{{ 8 }}</div>
          <div class="card-text">Blog Count</div>
        </v-card>
        <v-card
          hover
          color="blue"
          class="count-card"
        >
          <div class="count-text">{{ 999 }}</div>
          <div class="card-text">Total Count</div>
        </v-card>
      </div>
      
    </div>
  </div>
</template>

<script setup>

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