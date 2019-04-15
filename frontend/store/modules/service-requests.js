import {
  getField,
  updateField }     from 'vuex-map-fields';

export const servicesState = () => ({
  // url: /account-requests/
  acctReqServices:      [],

  // url: /services/
  services:             [],
  mgrProfileIDs:        [],
  mgrFullProfiles:      [],
  mgrServiceReqs:       [],
  requests:             [],
  activeServiceIDs:     [],
  activeAcctReqIDs:     [],
  activeFullServices:   [],
  filterByService:      [],
  acctReqsByServiceReq: [],
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
  SET_ACCT_REQ_SERVCIES(state, payload) {
    state.acctReqServices = payload
  },
  SET_MGR_PROFILE_IDS(state, payload) {
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
  },
  SET_ACTIVE_SERVICE_IDS(state, payload) {
    state.activeServiceIDs = payload
  },
  SET_ACTIVE_ACCT_REQ_IDS(state, payload) {
    state.activeAcctReqIDs = payload
  },
  SET_ACTIVE_FULL_SERVICES(state, payload) {
    state.activeFullServices = payload
  },
  SET_FILTER_BY_SERVICE(state, payload) {
    state.filterByService = payload
  },
  SET_ACCT_REQ_X_SERVICE_REQ(state, payload) {
    state.acctReqsByServiceReq = payload
  }
}

const actions = {
  resetServicesState({ commit }) {
    commit('RESET_SERVICES_STATE')
  },
  setServices(context, payload) {
    context.commit("SET_SERVCIES", payload)
  },
  setAcctReqServices(context, payload) {
    context.commit("SET_ACCT_REQ_SERVCIES", payload)
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
  setActiveServiceIDs(context, payload) {
    context.commit("SET_ACTIVE_SERVICE_IDS", payload)
  },
  setActiveAcctReqIDs(context, payload) {
    context.commit("SET_ACTIVE_ACCT_REQ_IDS", payload)
  },
  setFullActiveServices(context, payload) {
    context.commit("SET_ACTIVE_FULL_SERVICES", payload)
  },
  setfilterByService(context, payload) {
    context.commit("SET_FILTER_BY_SERVICE", payload)
  },
  setAcctReqsByServiceReq(context, payload) {
    context.commit("SET_ACCT_REQ_X_SERVICE_REQ", payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};