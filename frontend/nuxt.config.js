const pkg = require('./package')


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
    profile:        'profile/',
    accountRequest: 'account-request/',


    ttApi:          'https://tomcat2.bloomington.in.gov/timetrack/',
    deptService:    'DepartmentService',
    groupService:   'GroupService',
    jobService:     'JobTitleService',
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
    { src: '~/plugins/emptyObjTest' },
    { src: '~/plugins/resetForm' },
    { src: '~/plugins/croppie.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    { src: '@nuxtjs/axios' }
  ],

  // axios: {
  //   withCredentials: true
  // },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
