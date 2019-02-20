import createPersistedState from 'vuex-persistedstate';
// import Cookies from 'js-cookie'


export default ({store, isHMR}) => {
  if (isHMR) return;

  if (process.client) {
    window.onNuxtReady((nuxt) => {
      createPersistedState({
        // storage: window.sessionStorage
        // storage: {
        //   getItem: key => Cookies.get('auth'),
        //   setItem: (key, value) => Cookies.set('auth', value, {expires: 3}),
        //   removeItem: key => Cookies.remove('auth')
        // }
      })(store)
    });
  }
}