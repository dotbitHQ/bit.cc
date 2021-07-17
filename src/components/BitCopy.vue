<style lang="scss">
.bit-copy {
  position: relative;

  .copy_message {
    display: none;
  }

  &:hover {
    .copy_message {
      display: inline-block;
    }
  }
}
</style>

<template>
  <span class="bit-copy" @mouseenter="onShowMessage" @mouseleave="onHideMessage">
    <Iconfont name="copy" @click.native="onClick" />

    <span class="copy_message">{{ isCopied ? $tt('Copied') : $tt('Copy') }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import copy from 'copy-to-clipboard'
import Iconfont from '~/components/Iconfont'

export default defineComponent({
  name: 'BitCopy',
  components: {
    Iconfont
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
