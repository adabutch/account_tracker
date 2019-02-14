import {
  getField,
  updateField }     from 'vuex-map-fields';

export const state = () => ({
  namespaced: true,
  departments: [
   {
      id:40,
      name:"Animal Care and Control",
      ldap_name:"Animal Shelter"
   },
   {
      id:22,
      name:"Bloomington Transit",
      ldap_name:"Bloomington Transit"
   },
   {
      id:6,
      name:"City Clerk",
      ldap_name:"City Clerk"
   },
   {
      id:11,
      name:"Community and Family Resources",
      ldap_name:"Community and Family Resources"
   },
   {
      id:15,
      name:"Controller",
      ldap_name:"Controller"
   },
   {
      id:23,
      name:"Council Office",
      ldap_name:"Council Office"
   },
   {
      id:14,
      name:"Economic & Sustainable Development",
      ldap_name:"Economic & Sustainable Development"
   },
   {
      id:34,
      name:"Facilities Maintenance",
      ldap_name:"Facilities"
   },
   {
      id:16,
      name:"Fire",
      ldap_name:"Fire"
   },
   {
      id:42,
      name:"Fleet Maintenance",
      ldap_name:"Fleet Maintenance"
   },
   {
      id:3,
      name:"HAND",
      ldap_name:"HAND"
   },
   {
      id:4,
      name:"Human Resources",
      ldap_name:"Human Resources"
   },
   {
      id:1,
      name:"ITS",
      ldap_name:"ITS"
   },
   {
      id:9,
      name:"Legal",
      ldap_name:"Legal"
   },
   {
      id:10,
      name:"Office of the Mayor",
      ldap_name:"Office of the Mayor"
   },
   {
      id:5,
      name:"Parks",
      ldap_name:"Parks and Recreation"
   },
   {
      id:7,
      name:"Planning and Transportation",
      ldap_name:"Planning and Transportation"
   },
   {
      id:20,
      name:"Police",
      ldap_name:"Police"
   },
   {
      id:8,
      name:"Public Works",
      ldap_name:"Public Works"
   },
   {
      id:43,
      name:"Sanitation",
      ldap_name:"Sanitation"
   },
   {
      id:44,
      name:"Street",
      ldap_name:"Street and Traffic"
   },
   {
      id:36,
      name:"Utilities",
      ldap_name:"Utilities"
   }
  ],
})

export const mutations = {
  updateField,
  GET_DEPARTMENTS(state, payload) {
    state.departments = payload
  },
}

export const actions = {
  getDepartments(context, payload) {
    context.commit("GET_DEPARTMENTS", payload)
  }
}

export const getters = {
  getField
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};