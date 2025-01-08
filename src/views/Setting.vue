<template>
  <div class="global-content setting">
    <div class="setting-content">
      <div class="global-title">Setting Page</div>

      <div class="tab-content">
        <!-- <v-card>
          <v-list nav>
            <v-list-item prepend-icon="mdi-email" title="Inbox" value="inbox"></v-list-item>
            <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Supervisors" value="supervisors"></v-list-item>
            <v-list-item prepend-icon="mdi-clock-start" title="Clock-in" value="clockin"></v-list-item>
          </v-list>
        </v-card> -->
        <v-card class="tab-area">
          <v-tabs
            v-model="tab"
            color="primary"
            direction="vertical"
          >
            <v-tab prepend-icon="mdi-account" text="Profile" value="Profile"></v-tab>
            <v-tab prepend-icon="mdi-lock" text="Password" value="Password"></v-tab>
            <v-tab prepend-icon="mdi-bell-cog" text="Notification" value="Notification"></v-tab>
          </v-tabs>
        </v-card>

        <v-tabs-window v-model="tab" class="content-area">
          <v-tabs-window-item value="Profile">
            <v-card flat>
              <div class="card-content">
                <ProfileSetting />
              </div>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="Password">
            <v-card flat>
              <div class="card-content">content2</div>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="Notification">
            <v-card flat>
              <div class="card-content">content3</div>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import ProfileSetting from '@/views/ProfileSetting.vue'

const tab = ref('Profile')
</script>

<style lang="scss" scoped>
.setting {
  // margin-top: 5rem;
  // min-height: calc( 100vh - 12rem );
  // display: flex;
  // justify-content: center;
}

.setting-content {
  width: 80%;
  // margin-top: 2rem;
  // display: grid;
  // place-items: center;
}

.tab-content {
  display: flex;
  justify-content: center;
  gap: 1rem;
  min-height: calc( 100vh - 15rem );

  .tab-area {
    width: fit-content;
    padding: 0.5rem;
  }

  .content-area {
    flex: 1;

    .card-content {
      height: calc( 100vh - 15rem );
      padding: 1rem;
    }

  }
}
</style>