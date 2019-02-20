export default function ({ $axios, app, store, redirect, route }) {
  $axios.onRequest(config => {
    console.log(route);

    config.headers.common['Authorization'] = `JWT ${store.state.auth}`
    config.headers.common['Content-Type']  = `application/json`


    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }

    if (code === 401) {
      redirect('/login')
    }
  })
}

// import axios from 'axios'

// const ttApi = axios.create({
//   baseURL: 'https://tomcat2.bloomington.in.gov/',
// });

// ttApi.interceptors.request.use((config) => {
//   console.log(`Making a TT request`)
//   return config;
// }, (error) => {
//   const code = parseInt(error.response && error.response.status)
//   if (code === 400) {}
//   if (code === 401) {}
// })



// const atApi = axios.create({
//   baseURL: 'https://tomcat2.bloomington.in.gov/',
// });

// atApi.interceptors.request.use((config) => {
//   console.log(`Making a AT request`)
//   config.headers.common['Authorization'] = `JWT ${store.state.auth}`
//   config.headers.common['Content-Type']  = `application/json`
//   return config;
// }, (error) => {
//   const code = parseInt(error.response && error.response.status)
//   if (code === 400) {}
//   if (code === 401) {}
// })



// export default {
//   ttApi,
//   atApi
// }