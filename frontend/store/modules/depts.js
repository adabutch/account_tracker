import {
  getField,
  updateField }     from 'vuex-map-fields';

const state = () => ({
  departments: [],
})

const mutations = {
  updateField,
  SET_DEPARTMENTS(state, payload) {
    state.departments = payload
  },
}

const actions = {
  setDepartments(context, payload) {
    context.commit("SET_DEPARTMENTS", payload)
  }
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