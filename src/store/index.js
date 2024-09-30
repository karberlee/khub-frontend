import { createStore } from 'vuex'
// import * as getters from './getters'
// import * as actions from './actions'
// import mutations from './mutations'

const state = {
  user: null,
}

const mutations = {
  setUser(state, value) {
    state.user = value
  },
}

const actions = {}

const getters = {}

const store = createStore({
  state,
  getters,
  actions,
  mutations,
})

export default store