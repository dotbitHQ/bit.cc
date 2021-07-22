<style lang="scss">
.lock-address {
  color: rgba(6, 109, 255, 1);

  &._owner {
    color: rgba(34, 198, 141, 1)
  }

  &:hover {
    text-decoration: underline dashed #ccc;
  }
}
</style>

<template>
  <a class="lock-address" :class="{'_owner': owner}" :href="href" target="_blank">
    {{ collapseString(address) }}
  </a>
</template>

<script>
import { collapseString } from '~/modules/tools'

export default {
  name: 'LockAddress',
  props: {
    address: {
      type: String,
      default: '',
    },
    owner: Boolean
  },
  setup (props) {
    const addressMap = {
      'eth': `https://etherscan.io/address/${props.address}`,
      'trx': `https://tronscan.org/#/address/${props.address}`,
    }

    // todo: href checker should be more accurate
    const href = props.address.indexOf('0x') === 0 ? addressMap.eth : addressMap.trx

    return {
      href,
      collapseString,
    }
  },
}
</script>
