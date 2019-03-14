import Vue from 'vue'

Vue.mixin({
  methods: {
    resetForm() {
      localStorage.clear('vuex');
      sessionStorage.clear('vuex');
      this.$refs.modal.showModal = false;
      this.$store.dispatch('createUser/resetState');
      this.$router.push('/')
    }
  }
})