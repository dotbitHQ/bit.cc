// https://github.com/vuejs/vue-cli/blob/1c41371a42d1e5c2d7c1213a4297dc899b9535e6/packages/%40vue/cli-plugin-typescript/generator/template/src/shims-vue.d.ts
import Vue from 'vue'
import { $tt } from '~/plugins/i18n'
import { Services } from '~/services'

declare module 'vue/types/vue' {
  interface Vue {
    $service: Services,
    $tt: typeof $tt,
  }
}

declare module '*.vue' {
  export default Vue
}
