import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import global from '@/store/modules/global.js'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
	global
  },
  getters
})

export default store
