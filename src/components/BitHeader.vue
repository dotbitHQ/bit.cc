<style lang="scss">
.bit-header {
  position: relative;
  top: 15px;
  display: flex;
  justify-content: flex-end;
  width: 960px;
  margin: 0 auto;
  height: 0;

  a {
    font-size: 14px;
    font-weight: 400;
    font-family: sans-serif;
    color: #11142d;
    transition: color ease-out 200ms;

    &:hover {
      color: white;
    }
  }
}
</style>

<template>
  <div class="bit-header">
    <a href="https://app.da.systems">{{$tt('Register DAS')}}→</a>
  </div>
</template>

<script>

export default {
  name: 'BitHeader',
  components: {},
  data () {
    return {}
  },
}
</script>
