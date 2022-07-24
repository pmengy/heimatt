import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {},
    reply: []
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload
      setToken(payload)
    },
    setReply(state, payload) {
      state.reply = payload
    }
  },
  actions: {},
  modules: {}
})
