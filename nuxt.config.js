import abcConfig from './abc.config'

export default {
  ssr: false,
  srcDir: 'src',
  server: {
    host: '0.0.0.0',
    port: abcConfig.port,
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
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
    '~/plugins/i18n',
    '~/plugins/service'
  ],
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
    // ['@nuxtjs/google-gtag', {
    //   id: '',
    //   debug: isDev,
    // }]
    // [
    //   '@nuxtjs/sentry',
    //   {
    //     dsn: '',
    //     disabled: isDev,
    //     config: {}
    //   }
    // ]
  ],
  render: {
    // prevent preload, improve first time performance
    resourceHints: false,
    // https://nuxtjs.org/guides/directory-structure/static
    // https://www.npmjs.com/package/serve-static
    static: {
      maxAge: 60 * 60 * 24 * 1000, // this will cache files in `static/` for 1 day, please change the filename if you have urgent need to update image.
    },
  },
  /*
  ** Build configuration
  */
  build: {
    // For debug purpose
    'html.minify': !abcConfig.isDev,
    'babel': {
      presets (ctx) {
        let targets
        // Keep default target in server side
        if (ctx.isServer) {
          targets = { node: 'current' }
        }
        // Custom target in client side
        else {
          // Compile to ES5 for better compatibility in production
          if (!abcConfig.isDev) {
            targets = { ie: 10 }
          }
          // Compile to ESNext for easier debugging in development
          else {
            targets = { chrome: 80 }
          }
        }

        return [
          [require.resolve('@nuxt/babel-preset-app'), { targets }]
        ]
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Disable webpack devtool for better typescript debug experience
      config.devtool = false
    }
  }
}
