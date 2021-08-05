<style lang="scss">
.bit-card {
  box-sizing: border-box;
  border: 1px solid rgba(151, 151, 151, 0.14);
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;

  &._shadow {
    box-shadow: 0 30px 27px -29px rgba(108, 113, 148, 0.26);
  }
}

.theme_dark {
  .bit-card {
    background-color: #1e222a;
  }
}
</style>

<template>
  <div class="bit-card" :class="shadow ? '_shadow' : ''">
    <slot />
  </div>
</template>

<script>

export default {
  name: 'BitCard',
  components: {},
  props: {
    shadow: Boolean,
  },
}
</script>
