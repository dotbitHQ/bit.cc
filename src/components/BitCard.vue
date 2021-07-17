<style lang="scss">
.big-card {
  box-sizing: border-box;
  border: 1px solid rgba(151, 151, 151, 0.14);
  padding: 16px;
  border-radius: 12px;
  background-color: #fff;

  &._shadow {
    box-shadow: 0 30px 27px -29px rgba(108, 113, 148, 0.26);
  }
}
</style>

<template>
  <div class="big-card" :class="shadow ? '_shadow' : ''">
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
