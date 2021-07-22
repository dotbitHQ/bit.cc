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
    line-height: 82px;
    word-break: break-all;
    font-weight: 900;
    color: #11142d;
  }

  .unregistered_button {
    cursor: pointer;
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
      {{ $tt('{account} is not registered, you can register and have it.', { account: account }) }}
    </p>
    <a class="unregistered_button" :href="`https://app.da.systems`" target="_blank">
      {{ $tt('Register') }} →
    </a>

    <img class="profile-logo" src="/imgs/logo-profile.png" width="55%" alt="Profile Logo">
  </div>
</template>

<script>

export default {
  name: 'DasUnregistered',
  components: {},
  props: {
    account: {
      type: String,
      default: '',
    }
  },
  data () {
    return {}
  },
}
</script>
