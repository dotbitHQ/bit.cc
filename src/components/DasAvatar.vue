<style lang="scss">
.das-avatar {
  border-radius: 100%;
  overflow: hidden;
}

</style>

<template>
  <img class="das-avatar"
       :src="avatarUrl"
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
