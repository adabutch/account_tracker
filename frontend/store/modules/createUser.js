import {
  getField,
  updateField }     from 'vuex-map-fields';

const getDefaultState = () => ({
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
  extraQuestionAnswers: "",

  extraDeptQuestions:  {},
  extraDeptQuestionAnswers: "",
  // extraDeptQuestionAnswers: {
  //   exDeptQsSelects:       "",
  //   exDeptQsTexts:         "",
  //   exDeptQsTextareas:     "",
  //   exDeptQsNumbers:       "",
  // },

  extraGroupQuestions: {},
  extraGroupQuestionAnswers: "",
  // extraGroupQuestionAnswers: {
  //   exGroupQsSelects:       "",
  //   exGroupQsTexts:         "",
  //   exGroupQsTextareas:     "",
  //   exGroupQsNumbers:       "",
  // },

  // Inactive
  division:           "",
  status:             "",
})

const state = () => getDefaultState();

const mutations = {
  updateField,
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  RESET_GROUP(state) {
    state.group = {id: "", name: ""}
  },
  RESET_JOB(state) {
    state.job = {id: "", name: ""}
  },
  RESET_SUPERVISOR(state) {
    state.supervisor = ""
  },
  RESET_SUPERVISOR_PHONE(state) {
    state.supervisorPhone = ""
  },
  RESET_REQUESTED_SERVICES(state) {
    state.requestedServices = ""
  },
  RESET_DEPT_EX_QUESTIONS(state) {
    state.extraDeptQuestions = {},
    state.extraDeptQuestionAnswers = {}
  },
  RESET_GROUP_EX_QUESTIONS(state) {
    state.extraGroupQuestions = {},
    state.extraGroupQuestionAnswers = {}
  },
  ADD_TO_TOTAL_STEPS(state, payload) {
    state.totalSteps = payload;
  },
}

const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  resetGroup({ commit }) {
    commit('RESET_GROUP')
  },
  resetJob({ commit }) {
    commit('RESET_JOB')
  },
  resetSupervisor({ commit }) {
    commit('RESET_SUPERVISOR')
  },
  resetSupervisorPhone({ commit }) {
    commit('RESET_SUPERVISOR_PHONE')
  },
  resetRequestedServices({ commit }) {
    commit('RESET_REQUESTED_SERVICES')
  },
  resetDeptExQuestions({ commit }) {
    commit('RESET_DEPT_EX_QUESTIONS')
  },
  resetGroupExQuestions({ commit }) {
    commit('RESET_GROUP_EX_QUESTIONS')
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