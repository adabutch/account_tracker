import {
  getField,
  updateField }     from 'vuex-map-fields';

export const state = () => ({
  services:         [],
  mgrProfileIDs:    [],
  mgrFullProfiles:  [],
  mgrServiceReqs:   [],
  requests:         [],
})

const getters = {
  getField
}

const mutations = {
  updateField,
  SET_SERVCIES(state, payload) {
    state.services = payload
  },
  SET_MGR_PROFILE_IDS(state, payload) {
    state.mgrProfileIDs = payload
  },
  SET_ID_PROFILES(state, payload) {
    state.mgrProfileIDs = payload
  },
  SET_MGR_FULL_PROFILES(state, payload) {
    state.mgrFullProfiles = payload
  },
  SET_MGR_SERVICE_REQS(state, payload) {
    state.mgrServiceReqs = payload
  },
  SET_REQUESTS(state, payload) {
    state.requests = payload
  }
}

const actions = {
  setServices(context, payload) {
    context.commit("SET_SERVCIES", payload)
  },
  setMgrProfileIDs(context, payload) {
    context.commit("SET_MGR_PROFILE_IDS", payload)
  },
  setMgrFullProfiles(context, payload) {
    context.commit('SET_MGR_FULL_PROFILES', payload)
  },
  setMgrServiceReqs(context, payload) {
    context.commit('SET_MGR_SERVICE_REQS', payload)
  },
  setRequests(context, payload) {
    context.commit("SET_REQUESTS", payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};