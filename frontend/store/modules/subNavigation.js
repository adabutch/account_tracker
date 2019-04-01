import {
  getField,
  updateField }     from 'vuex-map-fields';

export const defaultSubNavState = () => ({
  acctReq: {
    regular: [
      {
        name: 'New',
        href: '/create/'
      }
    ],
    admin: [
      {
        name: 'New',
        href: '/create/'
      },
      {
        name: 'Created',
        href: '/account-requests/created'
      },
      {
        name: 'Denied',
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