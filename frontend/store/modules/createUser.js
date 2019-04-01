import {
  getField,
  updateField }     from 'vuex-map-fields';

const defaultCUState = () => ({
  // Progress Stepper
  totalSteps:       4,

  // Step One
  name:             {
    first:            "",
    middle:           "",
    last:             "",
    suffix:           "",
    nickname:         "",
  },

  image: {
    full:             "",
    cropped:          "",
  },

  profileImage:       "",
  profileImageCrop:   "",

  // Step Two
  facility:           "",
  department:       {
    id:               "",
    name:             "",
  },
  group:            {
    id:               "",
    name:             "",
  },
  job:              {
    id:               "",
    name:             "",
    salaryGroup:      "",
    clockInRequired:  "",
  },
  startDate:          "",

  // Step Three
  supervisor:         "",
  supervisorPhone:    "",
  employeePhone:      "",

  // Step Four
  requestedServices: {
    id:               "",
    name:             "",
  },
  selectedDeptServices:        [],
  selectedGroupServices:       [],
  selectedServiceRequestIds:   "",
  selectedServiceRequestNames: "",

  // Step Five
  extraQuestionAnswers:        "",
  extraDeptQuestions:          {},
  extraDeptQuestionAnswers:    "",
  extraGroupQuestions:         {},
  extraGroupQuestionAnswers:   "",

  // Inactive
  division:           "",
  status:             "",
})

const state = () => defaultCUState();

const mutations = {
  updateField,
  RESET_CR_USR_STATE(state) {
    Object.assign(state, defaultCUState())
  },
  ADD_TO_TOTAL_STEPS(state, payload) {
    state.totalSteps = payload;
  },
}

const actions = {
  resetCrUsrState({ commit }) {
    commit('RESET_CR_USR_STATE')
  },
  addToTotalSteps(context, payload) {
    context.commit("ADD_TO_TOTAL_STEPS", payload)
  },
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