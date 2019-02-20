import Vue from 'vue'

Vue.mixin({
  methods: {
    resetForm() {
      localStorage.clear('vuex');
      sessionStorage.clear('vuex');
      this.$store.dispatch('createUser/resetState');
      this.$router.push('/')
    }
  }
})