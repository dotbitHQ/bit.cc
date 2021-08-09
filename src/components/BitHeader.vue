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
    font-size: 14px;
    font-weight: 400;
    font-family: sans-serif;
    transition: color ease-out 200ms;
    color: #fff;
  }
}
</style>

<template>
  <div class="bit-header">
    <a href="https://twitter.com/realDASystems">
      <IconfontButton :message="$tt('Share to Twitter')" message-position="bottom">
        <Iconfont name="twitter" size="18" />
      </IconfontButton>
    </a>

    <a href="https://github.com/DeAccountSystems/bit.cc" target="_blank">
      <IconfontButton :message="$tt('Guide')" message-position="bottom">
        <Iconfont name="help" size="18" />
      </IconfontButton>
    </a>

    <a href="https://da.systems" target="_blank">
      <IconfontButton :message="$tt('DAS')" message-position="bottom">
        <Iconfont name="das" size="18" />
      </IconfontButton>
    </a>
  </div>
</template>

<script>
import IconfontButton from './IconfontButton'
import Iconfont from './Iconfont'

export default {
  name: 'BitHeader',
  components: {
    IconfontButton,
    Iconfont,
  },
  data () {
    return {}
  },
}
</script>
