const state = {
  houseDetail: {}
}

const mutations = {
  settingHouseDetail: (state, value) => {
    state.houseDetail = value
  }
}

const actions = {
  settingHouseDetail({ commit }, data) {
    commit('settingHouseDetail', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
