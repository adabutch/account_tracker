import Vue          from 'vue'

Vue.mixin({
  methods: {
    clearAuth() {
      this.$store.commit("auth/SET_AUTH", null);
      this.$store.commit("auth/SET_AUTH_USER", null);
      this.$store.commit("auth/SET_IS_AUTHENTICATED", false);
    }
  }
})