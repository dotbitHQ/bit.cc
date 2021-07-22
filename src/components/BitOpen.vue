<style lang="scss">
.bit-open {
}
</style>

<template>
  <IconfontButton v-if="canOpen" class="bit-open" :message="$tt('Visit')" @click.native="onClick">
    <Iconfont name="visit" color="#85878B" />
  </IconfontButton>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Iconfont from '~/components/Iconfont'
import IconfontButton from '~/components/IconfontButton'

export default defineComponent({
  name: 'BitCopy',
  components: {
    Iconfont,
    IconfontButton,
  },
  props: {
    url: {
      type: String,
      default: null
    }
  },
  setup (props) {
    function onClick (): void {
      window.open(props.url, '_blank')
    }

    return {
      canOpen: props.url.match(/^https?:\/\//),
      onClick,
    }
  }
})
</script>
