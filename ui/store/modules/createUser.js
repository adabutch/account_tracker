import {
  getField,
  updateField }     from 'vuex-map-fields';

const defaultCUState = () => ({
  // Progress Stepper
  totalSteps:       4,

  // Step Errors
  stepErrors:   {
    one:    {},
    two:    {},
    three:  {}
  },

  // Step One
  name:             {
    first:            null,
    middle:           null,
    last:             null,
    suffix:           null,
    nickname:         null,
  },

  image: {
    full:             null,
    cropped:          null,
  },

  // Step Two
  facility:           null,
  department:       {
    id:               null,
    name:             null,
  },
  group:            {
    id:               null,
    name:             null,
  },
  job:              {
    id:               null,
    name:             null,
    salaryGroup:      null,
    clockInRequired:  null,
  },
  startDate:          null,

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
  STEP_ONE_ERRORS(state, payload) {
    state.stepErrors.one = payload;
  },
  STEP_TWO_ERRORS(state, payload) {
    state.stepErrors.two = payload;
  },
  STEP_THREE_ERRORS(state, payload) {
    state.stepErrors.three = payload;
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
}

const actions = {
  resetCrUsrState({ commit }) {
    commit('RESET_CR_USR_STATE')
  },
  addToTotalSteps(context, payload) {
    context.commit("ADD_TO_TOTAL_STEPS", payload)
  },
  stepOneErrors(context, payload) {
    context.commit("STEP_ONE_ERRORS", payload)
  },
  stepTwoErrors(context, payload) {
    context.commit("STEP_TWO_ERRORS", payload)
  },
  stepThreeErrors(context, payload) {
    context.commit("STEP_THREE_ERRORS", payload)
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