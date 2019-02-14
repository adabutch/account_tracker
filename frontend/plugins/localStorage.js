import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie'


export default ({store, isHMR}) => {
  if (isHMR) return;

  if (process.client) {
    window.onNuxtReady((nuxt) => {
      createPersistedState({
        // storage: window.localStorage
      })(store)
    });
  }
}

// export default ({store, isHMR}) => {
//   // In case of HMR, mutation occurs before nuxReady, so previously saved state
//   // gets replaced with original state received from server. So, we've to skip HMR.
//   // Also nuxtReady event fires for HMR as well, which results multiple registration of
//   // vuex-persistedstate plugin
//   if (isHMR) return;

//   if (process.client) {
//     window.onNuxtReady((nuxt) => {
//       createPersistedState({
//         storage: {
//           getItem: key => Cookies.get(key),
//           setItem: (key, value) => Cookies.set(key, value, {expires: 3}),
//           removeItem: key => Cookies.remove(key)
//         }
//       })(store); // vuex plugins can be connected to store, even after creation
//     });
//   }
// };


// let cookieStorage = {
//   getItem: function(key) {
//     return Cookies.getJSON(key);
//   },
//   setItem: function(key, value) {
//     return Cookies.set(key, value, {expires: 3, secure: false});
//   },
//   removeItem: function(key) {
//     return Cookies.remove(key);
//   }
// };

// export default (context) => {
//   createPersistedState({
//     storage: cookieStorage,
//     getState: cookieStorage.getItem,
//     setState: cookieStorage.setItem
//   })(context.store);
// };