<style lang="scss">
.bit-copy {
  position: relative;
  cursor: pointer;

  .copy_message {
    $color: #424a5c;

    display: none;
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    background: $color;
    text-shadow: 0 20px 16px rgba(43, 54, 77, 0.16);
    box-shadow: 0 20px 16px 0 rgba(43, 54, 77, 0.16);

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%) rotateZ(45deg);
      height: 8px;
      width: 8px;
      background-color: $color;
    }
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
    <Iconfont name="copy" color="#85878B" @click.native="onClick" />

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
