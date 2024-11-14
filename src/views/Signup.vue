<template>
  <div class="signup_page">
    <div class="signup_area">
      <div class="title">Sign Up</div>
      <v-col>
        <v-text-field
          width="25rem"
          variant="underlined"
          v-model="userInfo.account"
          label="Account"
          hint="enter your email address"
          :error-messages="accountErrorMessage"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          width="25rem"
          variant="underlined"
          v-model="userInfo.password"
          label="Password"
          hint="you can use any password"
          :error-messages="passwordErrorMessage"
          :type="showPwd ? 'text' : 'password'"
          :append-inner-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPwd = !showPwd"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          width="25rem"
          variant="underlined"
          v-model="userInfo.name"
          label="Name"
          hint="enter your nickname"
        ></v-text-field>
      </v-col>
      <v-col>
        <div class="input-row">
          <v-text-field
            width="15rem"
            variant="underlined"
            v-model="userInfo.verifyCode"
            label="Verify Code"
            hint="enter the verify code you received"
            :error-messages="verifyCodeErrorMessage"
          ></v-text-field>
          <v-btn 
            color="success" 
            variant="elevated" 
            width="8rem" 
            @click="sendCode"
            :disabled="countdown > 0"
            :loading="isSendLoading"
          >
            Send{{ countdown > 0 ? ` (${countdown})` : '' }}
          </v-btn>
        </div>
      </v-col>
      <div class="button" @click="signup">Sign Up</div>
      <div class="signup-notice">Already have an account? <a href="/login">To login</a></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  name: "Signup",
  setup() {
    const { appContext } = getCurrentInstance()
    const { $get, $post, $patch, $delete } = appContext.config.globalProperties
    const store = useStore()
    const router = useRouter()

    const showPwd = ref(false)
    const userInfo = reactive({
      account: "",
      password: "",
      name: "",
      verifyCode: "",
    })
    const isCheck = reactive({
      account: false,
      password: false,
      verifyCode: false,
    })
    const isSendLoading = ref(false) // 是否正在发送验证码
    const countdown = ref(0) // 倒计时秒数

    const accountErrorMessage = computed(() => {
      if (isCheck.account && !userInfo.account) {
        return 'Account is required!'
      }
      if (userInfo.account && userInfo.account.indexOf('@') === -1) {
        return 'Must be email format!'
      }
      return ''
    })

    const passwordErrorMessage = computed(() => {
      if (isCheck.password && !userInfo.password) {
        return 'Password is required!'
      }
      if (userInfo.password && userInfo.password.length < 6) {
        return 'At least six characters!'
      }
      return ''
    })

    const verifyCodeErrorMessage = computed(() => {
      if (isCheck.verifyCode && !userInfo.verifyCode) {
        return 'Verify code is required!'
      }
      if (userInfo.verifyCode && userInfo.verifyCode.length !== 6) {
        return 'Verify code is six characters length!'
      }
      return ''
    })

    const methods = {
      async sendCode() {
        isCheck.account = true
        if (!accountErrorMessage.value) {
          isSendLoading.value = true
          await $post("/auth/sendCode", { email: userInfo.account })
          isSendLoading.value = false
          countdown.value = 60
          const timer = setInterval(() => {
            if (countdown.value > 0) {
              countdown.value--
            } else {
              clearInterval(timer)
            }
          }, 1000)
        }
      },

      async signup() {
        isCheck.account = true
        isCheck.password = true
        isCheck.verifyCode = true
        if (!accountErrorMessage.value && !passwordErrorMessage.value && !verifyCodeErrorMessage.value) {
          store.commit('setGlobalLoading', true)
          const res = await this.$post("/auth/signup", userInfo)
          store.commit('setGlobalLoading', false)
          if (res.data.code === 0) {
            router.push("/login")
          } else {
            alert(res.data.message)
          }
        }
      },
    }
    
    onMounted(() => {
      // const token = localStorage.getItem('token')
      // if (token) {
      //   router.replace("/")
      // }
    })

    return {
      showPwd,
      userInfo,
      accountErrorMessage,
      passwordErrorMessage,
      verifyCodeErrorMessage,
      isSendLoading,
      countdown,
      ...methods
    }
  },
}
</script>

<style lang="scss" scoped>
.signup_page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .signup_area {
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

    .input-row {
      width: 25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .v-input {
        flex: unset;
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
  }
}
</style>