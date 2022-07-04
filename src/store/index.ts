import { createStore } from 'vuex'
import base from './modules/base'

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  modules: {
    base
  }
})

export default store