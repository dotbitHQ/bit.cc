<style lang="scss">
@import "src/assets/variables";

.das-on-cross {
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

  .das-on-cross_emoji {
    font-size: 68px;
  }

  .on-cross_desc {
    margin-top: 40px;
    font-size: 68px;
    line-height: 82px;
    word-break: break-word;
    font-weight: 900;
    color: #11142d;
  }

  .on-cross_button {
    cursor: pointer;
    margin-top: 40px;
    margin-bottom: 100px;
    padding: 0 12px;
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

    .on-cross_desc {
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
  <div class="das-on-cross">
    <div class="das-on-cross_emoji">
      🥳
    </div>
    <p class="on-cross_desc">
      {{ $tt('{account} has been converted to an NFT on Ethereum.', { account: account }) }}
    </p>
    <a
      class="on-cross_button"
      :href="nftUrl"
      target="_blank"
    >
      {{ $tt('View on OpenSea') }} →
    </a>

    <img class="profile-logo" src="/imgs/logo-profile.png?v=1" width="55%" alt="Profile Logo">
  </div>
</template>

<script>
import { dotbitToNftTokenId } from '@/modules/tools'
import { CrossEthContract } from '@/constant'

export default {
  name: 'DasOnCross',
  props: {
    account: {
      type: String,
      default: '',
    }
  },
  computed: {
    nftUrl () {
      const tokenId = dotbitToNftTokenId(this.account)
      return `https://opensea.io/assets/ethereum/${CrossEthContract}/${tokenId}`
    }
  }
}
</script>
