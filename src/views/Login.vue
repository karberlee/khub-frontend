<template>
  <div class="login_page">
    <div class="login_area">
      <div class="title">Login</div>
      <!-- <div class="sub_title">Account:</div> -->
      <!-- <input class="form_input" type="text" placeholder="Account" v-model="userInfo.account"/><br> -->
      <v-col>
        <v-text-field
          width="25rem"
          variant="underlined"
          v-model="userInfo.account"
          label="Account"
          hint="enter your account"
          :error-messages="accountErrorMessage"
        ></v-text-field>
      </v-col>
      <!-- <div class="sub_title">Password:</div> -->
      <!-- <input class="form_input" type="password" placeholder="Password" v-model="userInfo.password"/><br> -->
      <v-col>
        <v-text-field
          width="25rem"
          variant="underlined"
          v-model="userInfo.password"
          label="Password"
          hint="enter your password"
          :error-messages="passwordErrorMessage"
          :type="showPwd ? 'text' : 'password'"
          :append-inner-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPwd = !showPwd"
        ></v-text-field>
      </v-col>
      <div class="button" @click="login">Login</div>
      <div class="signup-notice">Do not have an account? <a href="/signup">Create an account</a></div>
      <div class="sso-row">
        <div>SSO Login:</div>
        <button @click="githubLogin"><v-icon color="#1f2328" size="large" icon="mdi-github"></v-icon></button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  name: "Login",
  setup() {
    const { appContext } = getCurrentInstance()
    const { $get } = appContext.config.globalProperties
    const store = useStore()
    const router = useRouter()

    const showPwd = ref(false)
    const userInfo = reactive({
      account: "",
      password: "",
    })

    const isCheck = reactive({
      account: false,
      password: false,
    })

    const accountErrorMessage = computed(() => {
      if (isCheck.account && !userInfo.account) {
        return 'Account is required!'
      }
      // if (userInfo.account && userInfo.account.indexOf('@') === -1) {
      //   return 'Incorrect account format!'
      // }
      return ''
    })

    const passwordErrorMessage = computed(() => {
      if (isCheck.password && !userInfo.password) {
        return 'Password is required!'
      }
      return ''
    })

    const methods = {
      async login() {
        isCheck.account = true
        isCheck.password = true
        if (!accountErrorMessage.value && !passwordErrorMessage.value) {
          store.commit('setGlobalLoading', true)
          const res = await this.$post("/auth/login", userInfo)
          store.commit('setGlobalLoading', false)
          if (res.data.code === 0) {
            router.push("/")
          } else {
            alert(res.data.message)
            // router.push("/login")
          }
        }
      },
      async githubLogin() {
        window.location.href = import.meta.env.VITE_GITHUB_OAUTH_URL
      },
    }
    
    onMounted(() => {
      const token = localStorage.getItem('token')
      if (token) {
        router.replace("/")
        return
      }
      const code = getCode()
      if (code) {
        handleGithubCallback(code)
      }
    })

    const getCode = () => {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get('code')
    }

    const handleGithubCallback = async (code) => {
      try {
        store.commit('setGlobalLoading', true)
        const res = await $get(`${import.meta.env.VITE_API_URL}/auth/github/callback?code=${code}`)
        store.commit('setGlobalLoading', false)
        if (res.data.code === 0) {
          router.replace("/")
        } else {
          alert('callback:', res.data.message)
        }
      } catch (error) {
        console.error('handleGithubCallback:', error.data.message)
        throw error
        // alert('handleGithubCallback:', error.data.message)
      } finally {
        store.commit('setGlobalLoading', false)
      }
    }

    return {
      showPwd,
      userInfo,
      accountErrorMessage,
      passwordErrorMessage,
      ...methods
    }
  },
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
    padding: 2rem 4rem;
    outline: 2px solid #888888;
    outline-offset: -4px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 5px #bfbfbf;

    .title {
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      margin: 10px 0;
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
      width: 8rem;
      height: 3rem;
      text-align: center;
      line-height: 3rem;
      font-size: 1.25rem;
      font-weight: 500;
      border-radius: 20px;
      margin: 10px auto;
      box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.2),
                  -10px -4px 10px rgba(255, 255, 255, 1);
      transition: all 0.2s ease-out;

      &:hover {
        cursor: pointer;
        font-size: 1.3rem;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
                    0 0 0 rgba(255, 255, 255, 1),
                    inset 10px 4px 10px rgba(0, 0, 0, 0.1),
                    inset -10px -4px 10px rgba(255, 255, 255, 1);
      }
    }

    .signup-notice {
      margin: 24px 0;
      text-align: center;
    }

    .sso-row {
      // margin: 24px 0;
      // text-align: center;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  }
}
</style>