import {
  getField,
  updateField }     from 'vuex-map-fields';

export const accountRequestsState = () => ({
  accountRequests: {
    pending:        [],
    inProgress:     [],
    approved:       [],
    active:         [],
    inactive:       [],
    denied:         [],
  },
})

const state = () => accountRequestsState();

const getters = {
  getField
}

const mutations = {
  updateField,
  RESET_ACCOUNT_REQUESTS_STATE(state) {
    Object.assign(state, accountRequestsState())
  },
  ACCOUNT_REQUESTS_PENDING(state, payload) {
    state.accountRequests.pending = payload
  },
  ACCOUNT_REQUESTS_INPROGRESS(state, payload) {
    state.accountRequests.inProgress = payload
  },
  ACCOUNT_REQUESTS_APPROVED(state, payload) {
    state.accountRequests.approved = payload
  },
  ACCOUNT_REQUESTS_ACTIVE(state, payload) {
    state.accountRequests.active = payload
  },
  ACCOUNT_REQUESTS_INACTIVE(state, payload) {
    state.accountRequests.inactive = payload
  },
  ACCOUNT_REQUESTS_DENIED(state, payload) {
    state.accountRequests.denied = payload
  },
}

const actions = {
  resetAccountRequestsState({ commit }) {
    commit('RESET_ACCOUNT_REQUESTS_STATE')
  },
  accountRequestsPending(context, payload) {
    context.commit('ACCOUNT_REQUESTS_PENDING', payload)
  },
  accountRequestsInProgress(context, payload) {
    context.commit('ACCOUNT_REQUESTS_INPROGRESS', payload)
  },
  accountRequestsApproved(context, payload) {
    context.commit('ACCOUNT_REQUESTS_APPROVED', payload)
  },
  accountRequestsActive(context, payload) {
    context.commit('ACCOUNT_REQUESTS_ACTIVE', payload)
  },
  accountRequestsInactive(context, payload) {
    context.commit('ACCOUNT_REQUESTS_INACTIVE', payload)
  },
  accountRequestsDenied(context, payload) {
    context.commit('ACCOUNT_REQUESTS_DENIED', payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};