<style lang="scss">
@import "src/assets/variables";

.das-unregistered {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  .unregistered_emoji {
    font-size: 68px;
  }

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

  .profile-logo {
    display: none;
  }

  @media all and (max-width: $screen_sm) {
    width: 80%;

    .unregistered_desc {
      margin-top: 20px;
      font-size: 30px;
      line-height: 36px;
      font-weight: 900;
      color: #11142d;
    }

    .profile-logo {
      display: block;
      position: absolute;
      bottom: 40px;
    }
  }
}
</style>

<template>
  <div class="das-unregistered">
    <div class="unregistered_emoji">
      🪐
    </div>
    <p class="unregistered_desc">
      {{ $tt('This DAS is not registered, you can register and have it.') }}
    </p>
    <div class="unregistered_button">
      {{ $tt('Register') }} →
    </div>

    <img class="profile-logo" src="/imgs/logo-profile.png" width="55%" alt="Profile Logo">
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
