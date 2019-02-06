import {
  getField,
  updateField }     from 'vuex-map-fields';

const state = () => ({
  name: {
    first:            "",
    middle:           "",
    last:             "",
    suffix:           "",
  },
  startDate:          "",
  department:         "",
  status:             "",
  facility:           "",
  division:           "",
  job:                "",
  supervisor:         "",
  supervisorPhone:    "",
  employeePhone:      "",
  supervisor:         "",
  supervisorPhone:    "",
  employeePhone:      "",
  userSoftware:       [],
  userComputer:       ""
})

const mutations = {
  updateField,
  CLEAR_USER(state) {
    Object.keys(state).forEach(function (key){
      state[key] = ''
    });
  }
}

const actions = {
  clearUser(context) {
    context.commit("CLEAR_USER")
  }
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