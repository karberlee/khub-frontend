<template>
  <div class="login_page">
    <div class="login_area">
      <div class="title">Login</div>
      <div class="sub_title">Account:</div>
      <input class="form_input" type="text" placeholder="Account" v-model="userInfo.account"/><br>
      <div class="sub_title">Password:</div>
      <input class="form_input" type="password" placeholder="Password" v-model="userInfo.password"/><br>
      <div class="button" @click="login">Login</div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue"
import { useStore } from "vuex"

export default {
  name: "Login",
  setup() {
    const store = useStore()

    const userInfo = reactive({
      account: "",
      password: "",
    })

    const methods = {
      async login() {
        const res = await this.$post("/auth/login", userInfo)
        if (res.data.code === 0) {
          localStorage.setItem('userId', res.data.body._id) // 存储用户ID
          this.$router.push("/")
        } else {
          this.$router.push("/login")
        }
      },
    }

    return {
      userInfo,
      ...methods
    }
  }
}
</script>

<style lang="scss" scoped>
.login_page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login_area {
    width: fit-content;
    height: fit-content;
    padding: 20px 80px;
    outline: 2px solid #888888;
    outline-offset: -4px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 5px #bfbfbf;

    .title {
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      margin: 10px 0 20px;
    }

    .sub_title {
      font-weight: 500;
      font-size: 16px;
      margin: 20px 0 5px;
    }

    .form_input {
      width: 300px;
      height: 40px;
      padding: 0 12px;
      letter-spacing: 1px;
      border: none;
      outline: none;
      background-color: #ecf0f3;
      transition: 0.3s ease;
      border-radius: 8px;
      box-shadow: inset 1px 1px 5px #abb2be;

      &:focus {
        box-shadow: inset 3px 3px 5px #abb2be;
      }
    }

    .button {
      width: 100px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      font-weight: 500;
      border-radius: 20px;
      margin: 30px auto 10px;
      box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.2),
                  -10px -4px 10px rgba(255, 255, 255, 1);
      transition: all 0.3s ease-out;

      &:hover {
        cursor: pointer;
        font-size: 19px;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
                    0 0 0 rgba(255, 255, 255, 1),
                    inset 10px 4px 10px rgba(0, 0, 0, 0.1),
                    inset -10px -4px 10px rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>