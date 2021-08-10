<style lang="scss">
@import "src/assets/variables";

.bit-header {
  position: relative;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  height: $header_height;
  padding-top: 8px;
  padding-right: 30px;
  margin: 0 auto;
  color: #fff;

  a {
    margin: 0 10px;
    font-size: 14px;
    font-weight: 400;
    font-family: sans-serif;
    transition: color ease-out 200ms;
    color: #fff;
  }
}

@media all and (max-width: $screen_sm) {
  .bit-header {
    padding-right: 0;
  }
}
</style>

<template>
  <div class="bit-header">
    <a :href="intent" target="_blank">
      <IconfontButton :message="$tt('Share to Twitter')" message-position="bottom">
        <Iconfont name="twitter" :size="18" />
      </IconfontButton>
    </a>

    <a href="https://github.com/DeAccountSystems/bit.cc" target="_blank">
      <IconfontButton :message="$tt('Guide')" message-position="bottom">
        <Iconfont name="help" :size="18" />
      </IconfontButton>
    </a>

    <a href="https://da.systems" target="_blank">
      <IconfontButton :message="$tt('DAS')" message-position="bottom">
        <Iconfont name="das" :size="18" />
      </IconfontButton>
    </a>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import IconfontButton from './IconfontButton'
import Iconfont from './Iconfont'

export default defineComponent({
  name: 'BitHeader',
  components: {
    IconfontButton,
    Iconfont,
  },
  setup () {
    const intent = ref('')

    onMounted(() => {
      const text = 'Hey! It\'s time to DAS! \nCome to my DAS profile card and view all my NFTs, crypto addresses, and social contacts!\n'
      const url = window.location.href
      intent.value = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    })

    return {
      intent,
    }
  }
})
</script>
