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
    icon_style="margin-right: 8px;color: #000;width: 20px;height: 20px"
    css="font-size: 16px; color: #121314"
    v-close-popper
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { VClosePopper } from 'floating-vue'
import '@mail3/mail3-me'

export default defineComponent({
  name: 'Mail3MeButton',
  directives: {
    'close-popper': VClosePopper as any,
  }
})
</script>
