import {
  getField,
  updateField }     from 'vuex-map-fields';

export const servicesState = () => ({
  services:         null,
})

const state = () => servicesState();

const getters = {
  getField
}

const mutations = {
  updateField,
  RESET_SERVICES_STATE(state) {
    Object.assign(state, servicesState())
  },
  SET_SERVCIES(state, payload) {
    state.services = payload
  },
}

const actions = {
  resetServicesState({ commit }) {
    commit('RESET_SERVICES_STATE')
  },
  setServices(context, payload) {
    context.commit("SET_SERVCIES", payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};