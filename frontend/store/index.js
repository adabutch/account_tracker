import Vuex         from 'vuex'
import axios        from 'axios'

import {
  getField,
  updateField }     from 'vuex-map-fields'

import createUser   from './modules/createUser'
import facilities   from './modules/facilities'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const cookieparser = process.server ? require('cookieparser') : undefined

const state = () => ({
  auth:             null,
  authUser:         {},
  isAuthenticated:  false,
  endpoints: {
    // TODO: Remove hardcoding of dev endpoints
    obtainJWT:       'auth/obtain_token/',
    refreshJWT:      'auth/refresh_token/',
    baseUrl:         'http://127.0.0.1:8000/api/'
  },
  initAllUsers:     [],
  totalSteps:       4,
  startDateFormat:  "MM / DD / YYYY",
  data: [
    {
      "department": "Utilities",
      "facilities": [
        {
          "name": "Service Center",
          "divisions": [
            {
              "name": "Accounting",
              "supervisors": [
                { "name": "Charles Brandt", "phone": ["888-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
                { "name": "Adam Butcher", "phone": ["888-222-8888"], "email": "butcher ad @ gov"}
              ],
              "jobs": ["SC Account Job One", "SC Account Job Two"]
            },
            {
              "name": "Administration",
              "supervisors": [
                { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
                { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
              ],
              "jobs": ["SC Administration Job One", "SC Administration Job Two"]
            }
          ],
        },
        { "name": "Blucher Poole",
          "divisions": [
            {
              "name": "BP Accounting Dept.",
              "supervisors": [
                { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
                { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
              ],
              "jobs": ["Blucher Poole Account Job One", "Blucher Poole Account Job Two"]
            },
          ],
        },
        { "name": "Dillman Plant",
          "divisions": [
            {
              "name": "DP Accounting Dept.",
              "supervisors": [
                { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
                { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
              ],
              "jobs": ["Dillman Plant Account Job One", "Dillman Plant Account Job Two"]
            },
          ],
        },
        { "name": "Monroe Plant",
          "divisions": [
            {
              "name": "MP Accounting Dept.",
              "supervisors": [
                { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
                { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
              ],
              "jobs": ["Monroe Plant Account Job One", "Monroe Plant Account Job Two"]
            },
          ],
        },
      ],
    },
    {
      "department": "ITS",
      "facilities": [
        {
          "name": "City Hall",
          "divisions": [
            {
              "name": "Systems & Development",
              "supervisors": [
                { "name": "Charles Brandt", "phone": ["888-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
                { "name": "Adam Butcher", "phone": ["888-222-8888"], "email": "butcher ad @ gov"}
              ],
              "jobs": ["S&D Job One", "S&D Job Two"]
            },
            {
              "name": "GIS",
              "supervisors": [
                { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
                { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
              ],
              "jobs": ["GIS Job One", "GIS Job Two"]
            },
            {
              "name": "Support",
              "supervisors": [
                { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
                { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
              ],
              "jobs": []
            }
          ],
        },
      ],
    }
  ]
})

const mutations = {
  updateField,
  SET_AUTH(state, auth) {
    state.auth = auth
  },
  ADD_TO_TOTAL_STEPS(state, payload) {
    state.totalSteps = payload;
  },
  GET_ALL_USERS(state, payload) {
    state.initAllUsers = payload
  },
  SET_AUTH_USER(state, payload) {
    state.authUser = payload
  },
  SET_IS_AUTHENTICATED(state, payload) {
    state.isAuthenticated = payload
  },
  // setAuthUser(state, {
  //   authUser,
  //   isAuthenticated
  // }) {
  //   Vue.set(state, 'authUser', authUser)
  //   Vue.set(state, 'isAuthenticated', isAuthenticated)
  // },
  updateToken(state, newToken) {
    state.auth = newToken
  },
  removeToken(state) {
    state.auth = null;
  }
}

const actions = {
  addToTotalSteps(context, payload) {
    context.commit("ADD_TO_TOTAL_STEPS", payload)
  },
  // async nuxtServerInit ({state, context, commit}) {
  //   let {data} = await api.get(`request/?format=json`)
  //   commit('GET_ALL_USERS', data)
  // },
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
    facilities: facilities
  },
  mutations,
  actions,
  getters,
  state,
};
// export default Store