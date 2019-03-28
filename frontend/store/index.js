import Vuex         from 'vuex'
import axios        from 'axios'

import {
  getField,
  updateField }     from 'vuex-map-fields'

import createUser   from './modules/createUser'
import facilities   from './modules/facilities'
import depts        from './modules/depts'
import services     from './modules/services'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const cookieparser = process.server ? require('cookieparser') : undefined;
export const strict = false;

export const state = () => ({
  isAuthenticated:  false,
  auth:             null,
  authUser: {
    email:          "",
    first_name:     "",
    groups:         [],
    last_name:      "",
    username:       ""
  },
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

export const mutations = {
  updateField,
  SET_AUTH(state, auth) {
    state.auth = auth
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

export const actions = {
  authUser(context, payload) {
    context.commit('SET_AUTH_USER', payload)
    console.log(payload);
  },
  authUserAuthenticated(context, payload) {
    context.commit('SET_IS_AUTHENTICATED', payload)
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
        commit('SET_AUTH', auth)
        commit('SET_IS_AUTHENTICATED', true)

        let user = await
        this.$axios.get(`${process.env.api}${process.env.user}`)

        commit('SET_AUTH_USER', user.data);
        console.log(user.data);

        // this.$axios
        // .get(`${process.env.api}${process.env.user}`)
        // .then((res) => {
        //   commit('SET_AUTH_USER', res.data);
        //   console.log(res.data);
        // })
        // .catch((e) => {
        //   console.log(`SET_AUTH_USER error :: `, e)
        // });

        console.log(`👤 & 🍪 = ✅`);
      } catch (err) {

        console.log(err);
        console.log(`👤 & 🍪 = ⛔`);

        commit('SET_AUTH')
        commit('SET_AUTH_USER')
        commit('SET_IS_AUTHENTICATED', false)
      }
    }
  }
}

export const getters = {
  getField,
  getAuthUser(state){
    return state.authUser;
  }
}

export default {
  namespaced: true,
  modules: {
    createUser: createUser,
    facilities: facilities,
    depts: depts,
    services: services,
  },
  mutations,
  actions,
  getters,
  state,
};
// export default Store