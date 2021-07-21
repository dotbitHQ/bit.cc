<style lang="scss">
.das-unregistered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  .unregistered_desc {
    margin-top: 40px;
    font-size: 68px;
    font-weight: 900;
    color: #11142d;
    line-height: 82px;
  }

  .unregistered_button {
    margin-top: 40px;
    width: 148px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 16px;
    background: #11142d;
    color: #fbfeff;
  }
}
</style>

<template>
  <div class="das-unregistered">
    <p class="unregistered_desc">
      {{ $tt('This DAS is not registered, you can register and have it.') }}
    </p>
    <div class="unregistered_button">
      {{ $tt('Register') }} →
    </div>
  </div>
</template>

<script>

export default {
  name: 'DasUnregistered',
  components: {},
  data () {
    return {}
  },
}
</script>
