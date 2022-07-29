<style lang="scss">
  .mail-me-button {
    padding: 12px;
    &:hover {
      background: rgba(82, 98, 121, 0.1);
      border-radius: 8px;
    }
  }
</style>

<template>
  <mail3-me
    class="mail-me-button"
    variant="ghost"
    :to="email"
    icon_style="margin-right: 8px;color: #000;width: 20px;height: 20px"
    css="font-size: 16px; color: #121314; justify-content: flex-start; width: auto;"
    v-close-popper
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { VClosePopper } from 'floating-vue'
import '@mail3/mail3-me'

export default defineComponent({
  name: 'Mail3MeButton',
  directives: {
    'close-popper': VClosePopper,
  },
  props: {
    account: String,
  },
  computed: {
    email() {
      return `${this.account}@mail3.me`
    }
  }
})
</script>
