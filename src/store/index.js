import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import presist from './plugins/persist'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission,
    app
  },
  getters,
  plugins: [presist],
  // strict: true // 开启严格模式，防止用户随意修改状态
})
