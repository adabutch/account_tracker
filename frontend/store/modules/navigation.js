import {
  getField,
  updateField }     from 'vuex-map-fields';

export const defaultNavState = () => ({
  application: {
    name: 'Account Track',
    url: `${process.env.FE_BASE}create`,
  },
  nav: {
    admin: [
      { name: 'Accounts',
        href: `${process.env.FE_BASE}accounts`
      },
      { name: 'Search',
        href: `${process.env.FE_BASE}search`
      },
      { name: 'Service Requests',
        href: `${process.env.FE_BASE}service-requests`
      },
      { name: 'Services',
        href: `${process.env.FE_BASE}services`
      },
      { name: 'Profiles',
        href: `${process.env.FE_BASE}profiles`
      },
    ],
    regular: [
      { name: 'Accounts',
        href: `${process.env.FE_BASE}accounts`
      },
      { name: 'Search',
        href: `${process.env.FE_BASE}search`
      },
    ],
    support: [
      { name: 'Accounts',
        href: `${process.env.FE_BASE}accounts`
      },
      { name: 'Search',
        href: `${process.env.FE_BASE}search`
      },
      { name: 'Service Requests',
        href: `${process.env.FE_BASE}service-requests`
      },
      { name: 'Services',
        href: `${process.env.FE_BASE}services`
      },
    ],
  },
  subNav: {
    accountRequest: {
      admin: [
        { name: 'Create Account Request',
          href: `${process.env.FE_BASE}create`
        }
      ],
      regular: [
        { name: 'Create Account Request',
          href: `${process.env.FE_BASE}create`
        }
      ],
      support: [
        { name: 'Create Account Request',
          href: `${process.env.FE_BASE}create`
        }
      ],
    },
    search: {
      admin: [
        { name: 'Create Account Request',
          href: `${process.env.FE_BASE}create`
        }
      ],
      regular: [
        { name: 'Create Account Request',
          href: `${process.env.FE_BASE}create`
        }
      ],
      support: [
        { name: 'Create Account Request',
          href: `${process.env.FE_BASE}create`
        }
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