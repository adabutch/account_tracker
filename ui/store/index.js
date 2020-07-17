import Vuex         from 'vuex'
import axios        from 'axios'

import {
  getField,
  updateField }     from 'vuex-map-fields'

import auth         from './modules/auth'
import acctReqs     from './modules/account-requests'
import createUser   from './modules/createUser'
import facilities   from './modules/facilities'
import depts        from './modules/depts'
import serviceReqs  from './modules/service-requests'
import services     from './modules/services'
import navigation   from './modules/navigation'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const cookieparser = process.server ? require('cookieparser') : undefined;
const Cookie       = process.client ? require('js-cookie') : undefined

export const strict = false;

export const defaultState = () => ({
  apiLimit:         1000,
  groupLevels: {
    admin:          1,
    regular:        4,
    support:        5,
  },
  startDateFormat:   "MMMM Do, YYYY",
  serviceStatuses:   ['active','inactive'],
  directoryStatuses: ['active','inactive'],
  requestStatuses:   ['pending','in-progress','approved','active','inactive','denied'],
  routes: {
    accountReq: ['index','accounts','accounts-id'],
    create:     ['create'],
    serviceReq: ['service-requests'],
    services:   ['services'],
    search:     ['search'],
    profiles:   ['profiles'],
  },
  paths: {
    create:         '/create/',
    accounts:       '/accounts/',
    search:         '/search/'
  },
  consoleLog: {
    info:           ['background: rgb(30, 90, 174)',
                    'color: white',
                    'display: block',
                    'border-radius: 3px',
                    'padding: 2px 0'].join(';'),

    success:        ['background: rgb(76, 174, 79)',
                    'color: white',
                    'display: block',
                    'border-radius: 3px',
                    'padding: 2px 0'].join(';'),

    error:          ['background: rgb(235, 59, 36)',
                    'color: white','display: block',
                    'border-radius: 3px',
                    'padding: 2px 0'].join(';')
  },
  suffixOptions: [
    { value: 'Jr.', text: 'Jr.' },
    { value: 'Sr.', text: 'Sr.' },
    { value: '2nd', text: '2nd' },
    { value: '3rd', text: '3rd' },
    { value: 'II',  text: 'II' },
    { value: 'III', text: 'III' },
    { value: 'IV',  text: 'IV' },
    { value: 'V',   text: 'V' },
    { value: 'VI',  text: 'VI' }
  ],
})

const state = () => defaultState();

export const mutations = {
  updateField,
  RESET_BASE_STATE(state) {
    Object.assign(state, defaultState())
  }
}

export const actions = {
  resetBaseState({ commit }) {
    commit('RESET_BASE_STATE')
  },
  /**
   * Note: we can only use this via SSR
   */
  async nuxtServerInit({ commit, state }, { redirect, req }) {
    let parsed = cookieparser.parse(req.headers.cookie),
    sessID     = parsed.sessionid;

    if (sessID) {
      try {
        commit('auth/RESET_AUTH_STATE');

        let user = await
        this.$axios.get(`${process.env.api}${process.env.user}`)

        commit('auth/SET_IS_AUTHENTICATED', true)
        commit('auth/SET_AUTH_USER', user.data);

        console.log(`👤`, user.data);

      } catch (err) {

        console.log(err);
        console.log(`👤 & 🍪 = ⛔`);
        commit('auth/SET_AUTH_USER')
        commit('auth/SET_IS_AUTHENTICATED', false)
      }
    } else {
      redirect(`${process.env.api}${process.env.login}`);
    }
  }
}

export const getters = {
  getField
}

export default {
  namespaced:       true,
  modules: {
    auth:           auth,
    acctReqs:       acctReqs,
    createUser:     createUser,
    facilities:     facilities,
    depts:          depts,
    serviceReqs:    serviceReqs,
    services:       services,
    navigation:     navigation,
  },
  mutations,
  actions,
  getters,
  state,
};
// export default Store