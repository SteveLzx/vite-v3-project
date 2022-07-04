interface stateType {
  isCollapse: boolean;
}

const state = () => {
  return {
    isCollapse: false,
  }
}

const mutations = {
  handleShowCollapse(state: stateType) {
    state.isCollapse = !state.isCollapse;
  }
}

export default {
  namespaced: true,
  state,
  mutations
}