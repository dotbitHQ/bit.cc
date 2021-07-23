<style lang="scss">
@import "src/assets/variables";

.bit-header {
  position: relative;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 960px;
  height: $header_height;
  padding-top: 8px;
  margin: 0 auto;

  a {
    font-size: 14px;
    font-weight: 400;
    font-family: sans-serif;
    color: #11142d;
    transition: color ease-out 200ms;
  }

  &:hover {
    a {
      color: white;
    }
  }

  @media all and (max-width: $screen_xl) {
    width: 700px;
  }

  @media all and (max-width: $screen_md) {
    width: unset;
    padding-right: 10px;
  }
}
</style>

<template>
  <div class="bit-header">
    <IconfontButton>
      <a href="https://da.systems">{{ $tt('About DAS') }}→</a>
    </IconfontButton>
  </div>
</template>

<script>
import IconfontButton from './IconfontButton'

export default {
  name: 'BitHeader',
  components: {
    IconfontButton,
  },
  data () {
    return {}
  },
}
</script>
