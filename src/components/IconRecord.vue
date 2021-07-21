<style lang="scss">
.icon-record {

}
</style>

<template>
  <img class="icon-record" :src="`/imgs/das/ic-${record.toLowerCase()}.svg`" :alt="`${record} icon`" :style="{height: `${size}px`, width: `${size}px`}">
</template>

<script>

export default {
  name: 'IconRecord',
  components: {},
  props: {
    record: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 12,
    }
  }
}
</script>
