const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',
  dev:  (process.env.NODE_ENV !== 'production'),

  head: {
    title: pkg.prettyName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ]
  },

  env: {
    repo:           pkg.repository.url,
    nuxtPort:       process.env.NUXT_PORT,

    api:            process.env.API,
    obtainJWT:      process.env.API_OBTAIN_JWT,
    refreshJWT:     process.env.API_REFRESH_JWT,
    user:           process.env.API_USER,
    employee:       process.env.API_EMPLOYEE,
    action:         process.env.API_ACTION,
    profile:        process.env.API_PROFILE,
    service:        process.env.API_SERVICE,
    serviceReq:     process.env.API_SERVICE_REQ,
    serviceManager: process.env.API_SERVICE_MANAGER,
    accountRequest: process.env.API_ACCOUNT_REQUEST,

    ttApi:          process.env.TT_API,
    deptService:    process.env.TT_API_DEPT_SERVICE,
    groupService:   process.env.TT_API_GROUP_SERVICE,
    jobService:     process.env.TT_API_JOB_SERVICE,
    posService:     process.env.TT_API_POSITION_SERVICE,
    managerService: process.env.TT_API_MANAGER_SERVICE,
  },

  loading: { color: '#fff' },

  css: [
    './assets/style.scss',
    './assets/cobDS-tokens.scss',
  ],

  plugins: [
    { src: '~/plugins/design-system' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/filters' },
    { src: '~/plugins/mixins' },
    { src: '~/plugins/authLevel' },
    { src: '~/plugins/resetForm' },
    { src: '~/plugins/resetGlobalStore' },
    { src: '~/plugins/clearAuth' },
    { src: '~/plugins/clearStorage' },
    { src: '~/plugins/getAccountRequests' },
    { src: '~/plugins/localStorage', ssr: false },
    { src: '~/plugins/croppie.js',   ssr: false }
  ],

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
