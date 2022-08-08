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
    <a :href="`https://app.did.id/explorer?inviter=${account}`" target="_blank" style="margin-top: 10px;">
      {{ $tt('Register DAS') }}
    </a>

    <a :href="$i18n.locale === LANGUAGE.zhCN ? 'https://talk.did.id/t/bit-cc/280' : 'https://talk.did.id/t/bit-cc-faq/281'" target="_blank">
      <IconfontButton :message="$tt('Guide')" message-position="bottom">
        <Iconfont name="help" :size="16" />
      </IconfontButton>
    </a>
  </div>
</template>

<script>
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { INJECTED_BITCC_ACCOUNT } from '~/plugins/resolve'
import IconfontButton from './IconfontButton'
import Iconfont from './Iconfont'
import { LANGUAGE } from '~/constant'

export default defineComponent({
  name: 'BitHeader',
  components: {
    IconfontButton,
    Iconfont,
  },
  setup () {
    const resolveResult = inject(INJECTED_BITCC_ACCOUNT)
    return {
      LANGUAGE,
      account: resolveResult.account
    }
  }
})
</script>
