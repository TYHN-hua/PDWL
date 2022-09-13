const state = {
  reservoir: {}
}

const mutations = {
  settingReservoir: (state, value) => {
    state.reservoir = value
  }
}

const actions = {
  settingReservoir({ commit }, data) {
    commit('settingReservoir', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
