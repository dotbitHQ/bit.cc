<style lang="scss">
.das-avatar {
  border-radius: 100%;
  overflow: hidden;
}

</style>

<template>
  <img :src="avatarUrl" :alt="account" :width="size" height="size">
</template>

<script>

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DasAvatar',
  components: {},
  props: {
    size: {
      type: Number,
      default: 30
    },
    account: {
      type: String,
      default: 'das.bit'
    }
  },
  setup (props) {
    const avatarUrl = `https://identicons.da.systems/identicon/${props.account}`

    return {
      avatarUrl,
    }
  }
}
)</script>
