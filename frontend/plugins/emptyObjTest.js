import Vue from 'vue'

Vue.mixin({
  methods: {
    isEmpty(obj) {
      return Object.keys(obj).every(k => !Object.keys(obj[k]).length)
    },
  }
})