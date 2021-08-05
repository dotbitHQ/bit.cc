<style lang="scss">
.nft-record {
  display: flex;

  .nft_wrap {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;

    .nft_content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

<template>
  <div class="nft-record">
    <div class="nft_wrap">
      <div class="nft_content">
        <img :src="nft.imageUrl" :alt="nft.name">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NFT } from '~/hooks/useNFT'
const { defineComponent } = require('@nuxtjs/composition-api')

export default defineComponent({
  name: 'NFTRecord',
  components: {},
  props: {
    nft: {
      type: Object as any as NFT, // NFT
      default: null
    }
  },
})
</script>
