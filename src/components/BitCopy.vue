<style lang="scss">
.bit-copy {
}
</style>

<template>
  <IconfontButton class="bit-copy"
                  :message="isCopied ? $tt('Copied') : $tt('Copy')"
                  @mouseenter.native="onShowMessage"
                  @mouseleave.native="onHideMessage"
                  @click.native="onClick">
    <Iconfont name="copy" color="#85878B" />
  </IconfontButton>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import copy from 'copy-to-clipboard'
import Iconfont from '~/components/Iconfont'
import IconfontButton from '~/components/IconfontButton'

export default defineComponent({
  name: 'BitCopy',
  components: {
    Iconfont,
    IconfontButton,
  },
  props: {
    text: {
      type: String,
      default: '',
    }
  },
  setup (props) {
    const isCopied = ref(false)
    function onClick (): void {
      if (copy(props.text)) {
        isCopied.value = true
      }

      setTimeout(() => {
        onHideMessage()
      }, 5000)
    }

    const isShowingMessage = ref(false)
    function onShowMessage (): void {
      isShowingMessage.value = true
    }
    function onHideMessage (): void {
      isShowingMessage.value = false
      isCopied.value = false
    }

    return {
      isCopied,
      onClick,

      isShowingMessage,
      onShowMessage,
      onHideMessage,
    }
  }
}
)</script>
