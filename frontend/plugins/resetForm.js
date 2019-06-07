import Vue from 'vue'

Vue.mixin({
  methods: {
    resetForm() {
      // localStorage.clear('vuex');
      // sessionStorage.clear('vuex');
      this.$refs.formResetModal.showModal = false;
      this.resetGlobalStore();
      this.$router.push('/create/')
    }
  }
})