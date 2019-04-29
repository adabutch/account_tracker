import {
  getField,
  updateField }     from 'vuex-map-fields';

export const defaultNavState = () => ({
  application: {
    name: 'Account Track',         url: '/'
  },
  nav: {
    admin: [
      { name: 'Account Requests',  href: '/account-requests' },
      { name: 'Service Requests',  href: '/service-requests' },
      { name: 'Services',          href: '/services' },
      { name: 'Profiles',          href: '/profiles' },
    ],
    regular: [
      { name: 'Account Requests',  href: '/account-requests' }
    ],
  },
  subNav: {
    accountRequest: {
      admin: [
        { name: 'New',             href: '/create' },
        { name: 'Created',         href: '/account-requests/created' },
        { name: 'Denied',          href: '/account-requests/denied' },
      ],
      regular: [
        { name: 'New',             href: '/create' }
      ],
    }
  }
})

const state = () => defaultNavState();

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