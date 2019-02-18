import {
  getField,
  updateField }     from 'vuex-map-fields';

const getDefaultState = () => ({
  name:             {
    first:            "",
    middle:           "",
    last:             "",
    suffix:           "",
  },
  startDate:          "",
  department:       {
    id:               "",
    name:             "",
  },
  status:             "",
  facility:           "",
  division:           "",
  group:            {
    id:               "",
    name:             "",
  },
  job:              {
    id:               "",
    name:             "",
  },
  supervisor:         "",
  supervisorPhone:    "",
  employeePhone:      "",
  supervisor:         "",
  supervisorPhone:    "",
  employeePhone:      "",
  userSoftware:       [],
  userComputer:       ""
})

const state = () => getDefaultState();

const mutations = {
  updateField,
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
}

const getters = {
  getField
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};