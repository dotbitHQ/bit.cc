<style lang="scss">
.das-avatar {
  border-radius: 100%;
  overflow: hidden;
}

</style>

<template>
  <img class="das-avatar"
       :src="avatar || identicon"
       :width="size"
       :height="size"
       :alt="account">
</template>

<script>

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DasAvatar',
  components: {},
  props: {
    size: {
      type: [Number, String],
      default: 30
    },
    avatar: {
      type: String,
      default: null,
    },
    account: {
      type: String,
      default: 'das.bit'
    }
  },
  setup (props) {
    const identicon = `https://identicons.da.systems/identicon/${props.account}`

    return {
      identicon,
    }
  }
}
)</script>
