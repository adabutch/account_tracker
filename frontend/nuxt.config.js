const pkg = require('./package')
// require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Account Track',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    api:            'http://127.0.0.1:8000/api/',
    obtainJWT:      'auth/obtain_token/',
    refreshJWT:     'auth/refresh_token/',
    user:           'user/',
    employee:       'employee/',
    action:         'action/',
    profile:        'profile/',
    service:        'service/',
    serviceReq:     'service-request/',
    serviceManager: 'service-manager/',
    accountRequest: 'account-request/',


    ttApi:          'https://tomcat2.bloomington.in.gov/timetrack/',
    deptService:    'DepartmentService',
    groupService:   'GroupService',
    jobService:     'JobTitleService',
    posService:     'PositionService',
    managerService: 'ManagerService',
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    './assets/style.scss',
    './assets/cobDS-tokens.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/design-system' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/filters' },
    { src: '~/plugins/localStorage', ssr: false },
    { src: '~/plugins/mixins' },
    { src: '~/plugins/authLevel' },
    { src: '~/plugins/resetForm' },
    { src: '~/plugins/resetGlobalStore' },
    { src: '~/plugins/clearAuth' },
    { src: '~/plugins/clearStorage' },
    { src: '~/plugins/getAccountRequests' },
    { src: '~/plugins/croppie.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/axios'],
    // PWA having issues w/ nodemon
    // ['@nuxtjs/pwa', {
    //   icon: true,
    //   sizes: [16, 120, 144, 152, 192, 384, 512],
    // }]
  ],

  axios: {
    withCredentials: true
  },

  /*
  ** Build configuration
  */
  build: {
    // ESLint needs config for Nuxt
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
