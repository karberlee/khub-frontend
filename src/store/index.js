import { createStore } from 'vuex'
// import * as getters from './getters'
// import * as actions from './actions'
// import mutations from './mutations'

const state = {
  user: {},
  globalLoading: false,
}

const mutations = {
  setUser(state, value) {
    state.user = value
  },
  setGlobalLoading(state, value) {
    state.globalLoading = value
  },
}

const actions = {
  loadUserFromStorage({ commit }) {
    const user = localStorage.getItem('user')
    if (user) {
      commit('setUser', JSON.parse(user))
    }
  },
}

const getters = {}

const store = createStore({
  state,
  getters,
  actions,
  mutations,
})

export default store