import Vuex         from 'vuex'
import axios        from 'axios'

import {
  getField,
  updateField }     from 'vuex-map-fields'

import auth         from './modules/auth'
import createUser   from './modules/createUser'
import facilities   from './modules/facilities'
import depts        from './modules/depts'
import services     from './modules/services'
import subNav       from './modules/subNavigation'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const cookieparser = process.server ? require('cookieparser') : undefined;
export const strict = false;

export const defaultState = () => ({
  accountRequests:  {
    new:          [],
    pending:      [],
    approved:     [],
    denied:       [],
  },
  groupLevels: {
    admin:          1,
    regular:        2,
  },
  startDateFormat:  "MMMM Do, YYYY",
  requestStatuses:  ['new','pending','approved','active','inactive','denied']
})

const state = () => defaultState();

export const mutations = {
  updateField,
  RESET_BASE_STATE(state) {
    Object.assign(state, defaultState())
  },
  ACCOUNT_REQUESTS_NEW(state, payload) {
    state.accountRequests.new = payload
  },
  ACCOUNT_REQUESTS_PENDING(state, payload) {
    state.accountRequests.pending = payload
  },
  ACCOUNT_REQUESTS_DENIED(state, payload) {
    state.accountRequests.denied = payload
  },
}

export const actions = {
  resetBaseState({ commit }) {
    commit('RESET_BASE_STATE')
  },
  accountRequestsNew(context, payload) {
    context.commit('ACCOUNT_REQUESTS_NEW', payload)
  },
  accountRequestsPending(context, payload) {
    context.commit('ACCOUNT_REQUESTS_PENDING', payload)
  },
  accountRequestsDenied(context, payload) {
    context.commit('ACCOUNT_REQUESTS_DENIED', payload)
  },
  async nuxtServerInit({ commit, state }, { req }) {
    let auth = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = parsed.auth;
        commit('auth/SET_AUTH', auth)
        commit('auth/SET_IS_AUTHENTICATED', true)

        let user = await
        this.$axios.get(`${process.env.api}${process.env.user}`)

        commit('auth/SET_AUTH_USER', user.data);
        console.log(user.data);

        console.log(`👤 & 🍪 = ✅`);
      } catch (err) {

        console.log(err);
        console.log(`👤 & 🍪 = ⛔`);

        commit('auth/SET_AUTH')
        commit('auth/SET_AUTH_USER')
        commit('auth/SET_IS_AUTHENTICATED', false)
      }
    }
  }
}

export const getters = {
  getField
}

export default {
  namespaced:   true,
  modules: {
    auth:       auth,
    createUser: createUser,
    facilities: facilities,
    depts:      depts,
    services:   services,
    subNav:     subNav,
  },
  mutations,
  actions,
  getters,
  state,
};
// export default Store