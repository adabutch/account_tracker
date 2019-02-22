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
    salaryGroup:      "",
    clockInRequired:  "",
  },
  supervisor:         "",
  supervisorPhone:    "",
  employeePhone:      "",
  requestedServices:  "",
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
  },
  RESET_SUPERVISOR(state) {
    state.supervisor = ""
  },
  RESET_SUPERVISOR_PHONE(state) {
    state.supervisorPhone = ""
  },
  RESET_REQUESTED_SERVICES(state) {
    state.requestedServices = ""
  },
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
  resetSupervisor({ commit }) {
    commit('RESET_SUPERVISOR')
  },
  resetSupervisorPhone({ commit }) {
    commit('RESET_SUPERVISOR_PHONE')
  },
  resetRequestedServices({ commit }) {
    commit('RESET_REQUESTED_SERVICES')
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