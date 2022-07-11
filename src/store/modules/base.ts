import { QueryUserAuthorization } from '@/api/base'
interface stateType {
  isCollapse: boolean
  roles: string[]
}

export type ParamsType = {
  [key: string]: any
}

const state = () => {
  return {
    isCollapse: false,
    roles: ['admin']
  }
}

const getters = {
  roles: (state: stateType) => state.roles
}

const mutations = {
  SHOW_COLLAPSE(state: stateType) {
    state.isCollapse = !state.isCollapse;
  },
  SET_ROLES(state: stateType, roles: string[]) {
    state.roles = roles
  }
}

const actions = {
  getUserInfo({ commit }: { commit: any }) {
    return new Promise<any>((resolve) => {
      QueryUserAuthorization.then((res: ParamsType) => {
        commit('SET_ROLES', res)
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}