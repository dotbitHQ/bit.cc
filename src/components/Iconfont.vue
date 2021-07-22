<style lang="scss">
.iconfont {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<template>
  <svg class="iconfont" aria-hidden="true" :style="style" v-on="$listeners">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>

import { reactive } from '@nuxtjs/composition-api'

export default {
  name: 'Iconfont',
  components: {},
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: undefined,
    }
  },
  setup (props) {
    const style = reactive({})

    if (props.size) {
      style.height = style.width = `${props.size}px`
    }

    return {
      style
    }
  }
}
</script>
