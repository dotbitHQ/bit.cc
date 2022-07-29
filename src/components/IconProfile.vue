<style lang="scss">
.icon-profile {

}
</style>

<template>
  <img class="icon-profile" :src="`/imgs/profile/ic-${name.toLowerCase()}.svg`" :alt="`${name} icon`" :style="{height: `${size}px`, width: `${size}px`}">
</template>

<script>

export default {
  name: 'IconProfile',
  components: {},
  props: {
    name: {
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
