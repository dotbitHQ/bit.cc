import abcConfig from './abc.config'

export default {
  ssr: false,
  target: 'server',
  srcDir: 'src',
  server: {
    host: '0.0.0.0',
    port: abcConfig.port,
  },
  /*
  ** Headers of the page
  */
  head: {
    // titleTemplate: '%s - ' + 'bit.cc',
    title: '.bit Account',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=no' },
    ],
    script: [{
      src: 'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_15572_12.27ec46fc62a5e02b6174eb8451b00c8f.js',
      async: true,
    }]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/index.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/resolve',
    '~/plugins/i18n',
    '~/plugins/service',
  ],

  // serverMiddleware: [
  //   '~/serverMiddleware/api_mibao.ts'
  // ],

  router: {
    middleware: [],
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'ACCOUNT_BIT',
        path: '*.bit',
        component: resolve(__dirname, 'src/pages/index.vue')
      })
    }
  },

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: false,
    }],
    // https://composition-api.nuxtjs.org
    '@nuxtjs/composition-api/module',
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    // ['@nuxtjs/vuetify', {
    //   customVariables: ['~/assets/variables.scss'],
    // }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // https://i18n.nuxtjs.org/
    // [
    //   'nuxt-i18n',
    //   {
    //     locales: [
    //       { code: 'en', iso: 'en-US', file: 'en.json' },
    //       { code: 'zh', iso: 'zh-CN', file: 'zh-CN.json' },
    //     ],
    //   }
    // ],
    ['@nuxtjs/google-gtag', {
      id: 'G-Z8V922MV9H',
      debug: abcConfig.isDev,
    }],
    [
      '@nuxtjs/sentry',
      {
        dsn: 'https://1b34640b328e488b8081930c085d6369@sentry.blockabc.com/14',
        disabled: abcConfig.isDev,
        config: {
          autoSessionTracking: false,
        }
      }
    ]
  ],
  render: {
    // prevent preload, improve first time performance
    resourceHints: false
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    babel: {
      presets ({ isServer }, [preset, options]) {
        let targets
        // Keep default target in server side
        if (isServer) {
          targets = { node: 'current' }
        }
        // Custom target in client side
        else {
          // Compile to ES5 for better compatibility in production
          if (!abcConfig.isDev) {
            targets = { ie: 11 }
          }
          // Compile to ESNext for easier debugging in development
          else {
            targets = { chrome: 100 }
          }
        }
        options.targets = targets
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Disable webpack devtool for better typescript debug experience
      config.devtool = false

      // allow importing .mjs, fixing the problem importing @vueuse/core (the code below can be delete after nuxt@2.16.0)
      // https://github.com/nuxt/nuxt.js/pull/9180/files#diff-4b8d1a6115f7d4a733f4132901f1dfc80c69504b68679ecf21e657bb5e9d9491R333
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      })
    }
  }
}
