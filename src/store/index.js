import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import warehouse from './modules/warehouse'
import reservoir from './modules/reservoir'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    warehouse,
    reservoir
  },
  getters
})

export default store
