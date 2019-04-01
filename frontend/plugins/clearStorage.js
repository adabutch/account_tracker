import Vue          from 'vue'
const Cookie        = process.client ? require('js-cookie') : undefined

Vue.mixin({
  methods: {
    clearStorage() {
      localStorage.removeItem('vuex');
      localStorage.clear();
      sessionStorage.removeItem('vuex');
      sessionStorage.clear();
      Cookie.remove('auth');
      this.$router.push('/login');
    }
  }
})