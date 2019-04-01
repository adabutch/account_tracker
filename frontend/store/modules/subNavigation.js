import {
  getField,
  updateField }     from 'vuex-map-fields';

export const defaultSubNavState = () => ({
  acctReq: {
    regular: [
      {
        name: 'New Account Request',
        href: '/create/'
      }
    ],
    admin: [
      {
        name: 'New Account Request',
        href: '/create/'
      },
      {
        name: 'Denied Users',
        href: '/account-requests/denied'
      },
    ],
  },
})

const state = () => defaultSubNavState();

const mutations = {
  updateField,
}

const actions = {
}

const getters = {
  getField
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};