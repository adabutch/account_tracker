import Vuex         from 'vuex'
import axios        from 'axios'

import {
  getField,
  updateField }     from 'vuex-map-fields'

import createUser   from './modules/createUser'
import facilities   from './modules/facilities'
import depts        from './modules/depts'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const cookieparser = process.server ? require('cookieparser') : undefined;
export const strict = false;

const state = () => ({
  auth:             null,
  authUser: {
    email:          "",
    first_name:     "",
    groups:         [],
    last_name:      "",
    username:       ""
  },
  isAuthenticated:  false,
  endpoints: {
    // TODO: Remove hardcoding of dev endpoints
    obtainJWT:      'auth/obtain_token/',
    refreshJWT:     'auth/refresh_token/',
    baseUrl:        'http://127.0.0.1:8000/api/',
    profile:        'profile/',
  },
  accountRequests:  {
    pending: [],
    ready: [],
    approved: [],
    denied: []
  },
  startDateFormat:  "MMMM Do, YYYY"
})

const mutations = {
  updateField,
  SET_AUTH(state, auth) {
    state.auth = auth
  },
  ACCOUNT_REQUESTS_PENDING(state, payload) {
    state.accountRequests.pending = payload
  },
  ACCOUNT_REQUESTS_READY(state, payload) {
    state.accountRequests.ready = payload
  },
  ACCOUNT_REQUESTS_DENIED(state, payload) {
    state.accountRequests.denied = payload
  },
  SET_AUTH_USER(state, payload) {
    state.authUser = payload
  },
  SET_IS_AUTHENTICATED(state, payload) {
    state.isAuthenticated = payload
  },
  updateToken(state, newToken) {
    state.auth = newToken
  },
  removeToken(state) {
    state.auth = null;
  }
}

const actions = {
  accountRequestsPending(context, payload) {
    context.commit('ACCOUNT_REQUESTS_PENDING', payload)
  },
  accountRequestsReady(context, payload) {
    context.commit('ACCOUNT_REQUESTS_READY', payload)
  },
  accountRequestsDenied(context, payload) {
    context.commit('ACCOUNT_REQUESTS_DENIED', payload)
  },
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = parsed.auth;
        // authUser = "Yo";
        // isAuthenticated = true;
        console.dir('🍪 found');
      } catch (err) {
        console.dir('No 🍪 found 😪');
      }
    }
    commit('SET_AUTH', auth)
    commit('SET_AUTH_USER')
    commit('SET_IS_AUTHENTICATED', true)
  }
}

const getters = {
  getField
}

export default {
  namespaced: true,
  modules: {
    createUser: createUser,
    facilities: facilities,
    depts: depts
  },
  mutations,
  actions,
  getters,
  state,
};
// export default Store