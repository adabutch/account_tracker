import Vue          from 'vue'

Vue.mixin({
  methods: {
    resetGlobalStore() {
      this.$store.dispatch('resetBaseState');
      this.$store.dispatch('createUser/resetCrUsrState');
      this.$store.dispatch('depts/resetDeptsState');
      this.$store.dispatch('services/resetServicesState');
    }
  }
})