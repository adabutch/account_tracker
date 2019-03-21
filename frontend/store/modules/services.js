import {
  getField,
  updateField }     from 'vuex-map-fields';

export const state = () => ({
  services: [],
})

const getters = {
  getField
}

const mutations = {
  updateField,
  SET_SERVCIES(state, payload) {
    state.services = payload
  },
}

const actions = {
  setServices(context, payload) {
    context.commit("SET_SERVCIES", payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};