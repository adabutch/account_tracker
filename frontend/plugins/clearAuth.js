import Vue          from 'vue'

Vue.mixin({
  methods: {
    clearAuth() {
      this.$store.commit('SET_AUTH', null);
      this.$store.commit("SET_AUTH_USER", null);
      this.$store.commit("SET_IS_AUTHENTICATED", false);
    }
  }
})