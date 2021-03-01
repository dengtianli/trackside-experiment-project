import Vue from 'vue'
import Vuex from 'vuex'
 import auth from './modules/auth';
 import tagNav from './modules/tagNav';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    netWork:false
  },
  mutations: {
     changeNetwork(state, payload) {
            state.netWork = payload
        },
  },
  actions: {
  },
  modules: {
    auth,tagNav
  }
})
