import {
  getField,
  updateField }     from 'vuex-map-fields';

const getDefaultState = () => ({
  name:             {
    first:            "",
    middle:           "",
    last:             "",
    suffix:           "",
    nickname:         "",
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
  requestedServices:  [],
})

const state = () => getDefaultState();

const mutations = {
  updateField,
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  RESET_GROUP(state) {
    state.group = {id: "", name: ""}
  },
  RESET_JOB(state) {
    state.job = {id: "", name: ""}
  }
}

const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  resetGroup({ commit }) {
    commit('RESET_GROUP')
  },
  resetJob({ commit }) {
    commit('RESET_JOB')
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