// https://github.com/vuejs/vue-cli/blob/1c41371a42d1e5c2d7c1213a4297dc899b9535e6/packages/%40vue/cli-plugin-typescript/generator/template/src/shims-tsx.d.ts
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any,
    }
  }
}
