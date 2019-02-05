import { getField, updateField } from 'vuex-map-fields';

const createUser = {
  namespaced: true,
  state: {
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
    userComputer:       "",
  },
  mutations: {
    updateField,
    CLEAR_USER(state) {
      Object.keys(state).forEach(function (key){
        state[key] = ''
      });
    }
  },
  actions: {
    clearUser(context) {
      context.commit("CLEAR_USER")
    }
  },
  getters: {
    getField
  }
}

export default createUser