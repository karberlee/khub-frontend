<template>
  <header>
    <div class="main-button">Header</div>

    <div class="menus">
      <div class="menu-button" @click="replaceRouter('/')">Home</div>
      <div class="menu-button" @click="replaceRouter('/user_list')">
        UserList
      </div>
      <div class="menu-button" @click="changeTheme">theme</div>
    </div>

    <div class="avatar">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <Avatar v-bind="props" :image="userInfo.avatar" :name="userInfo.nickname" size="3rem"
            :altText="userInfo.nickname + ' Avatar'" />
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in avatarMenus" :key="index" :value="item">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <div>{{ item.title }}</div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import Avatar from "@/components/Avater.vue";

const router = useRouter();

const theme = ref(localStorage.getItem("theme") || "default");

const userInfo = reactive({
  nickname: "Hello",
  avatar: "src/assets/images/vue.ico",
  email: "email@example.com",
});

const avatarMenus = reactive([
  { icon: "mdi-pencil", title: "Edit" },
  { icon: "mdi-cog", title: "Setting" },
  { icon: "mdi-logout", title: "Logout" },
]);

// Navigate to Home page
const replaceRouter = function (path) {
  router.push(path);
};

// change theme
const changeTheme = function () {
  theme.value = theme.value === "default" ? "dark" : "default";
};

watch(theme, (newTheme) => {
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Initialize theme
document.documentElement.setAttribute("data-theme", theme.value);
</script>

<style lang="scss" scoped>
header {
  height: 5rem;
  background-color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-button {
  height: 100%;
  width: 10rem;
  font-size: 2rem;
  font-weight: bolder;
  display: grid;
  place-items: center;
  color: var(--text-color);
  cursor: pointer;
}

.menus {
  height: 100%;
  display: flex;

  .menu-button {
    height: 100%;
    min-width: 10rem;
    display: grid;
    place-items: center;
    color: var(--text-color);
    font-weight: bolder;
    cursor: pointer;
  }

  .menu-button:hover {
    background-color: var(--secondary-color);
  }
}

.avatar {
  height: 100%;
  width: 5rem;
  display: grid;
  place-items: center;
}
</style>
