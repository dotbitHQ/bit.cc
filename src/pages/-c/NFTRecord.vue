<style lang="scss">
@import "src/assets/variables";

.nft-record {
  $avatarSize: 60px;

  display: flex;
  box-shadow: 0 30px 30px -30px rgb(108 113 148 / 26%);
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    transform: scale(1.05);
  }

  .nft_wrap {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background-color: #fff;

    .nft_content,
    .das-account-card {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .nft_video_controls {
      position: absolute;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 8px;
      right: 8px;
      height: 44px;
      width: 44px;
      z-index: 1;
      color: rgb(4, 17, 29);
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(8px);
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.8);
        color: rgba(4, 17, 29, 0.8);
      }
    }

    .nft_info {
      opacity: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      box-sizing: border-box;
      width: 100%;
      min-height: 20%;
      padding: 6px 12px;
      flex-direction: column;
      justify-content: space-around;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(20px);
      color: #11142d;

      .nft_name {
        font-size: 16px;
        font-weight: bold;
      }

      .nft_price {
        margin-top: 5px;
        font-size: 12px;
      }
    }

    &:hover {
      .nft_info {
        display: flex;
        opacity: 1;
        transition: opacity ease 400ms;
      }
    }
  }

  .nft_video,
  .nft_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

<template>
  <div class="nft-record">
    <a class="nft_wrap" :href="nft.link" target="_blank">
      <div v-if="nft.providerType !== NFTProviderType.das" class="nft_content">
        <template v-if="nft.imageUrl.match(/\.(mp4|mov)$/)">
          <video
            class="nft_video"
            ref="video"
            loop
            playsinline
            :src="nft.imageUrl" />
          <span
            class="nft_video_controls"
            @click.prevent.stop="playPause"
          >
            <Iconfont v-if="isPlay" name="suspend" :size="16" />
            <Iconfont v-else name="play" :size="16" />
          </span>
        </template>
        <img v-else class="nft_img" :src="nft.imageUrl" :alt="nft.name">

        <div class="nft_info">
          <div class="nft_name">{{ nft.name }}</div>
          <div class="nft_price">{{ nft.price }} {{ nft.priceToken }}</div>
        </div>
      </div>

      <DasAccountCard v-else :account="nft.name" />
    </a>
  </div>
</template>

<script lang="ts">
import { DasAccountCard } from 'das-ui-shared'
import { NFT, NFTProviderType } from '~/hooks/useNFT'
import 'das-ui-shared/dist/style.css'
import Iconfont from '~/components/Iconfont.vue'
import { ref } from '@nuxtjs/composition-api'
const { defineComponent } = require('@nuxtjs/composition-api')

export default defineComponent({
  name: 'NFTRecord',
  components: {
    DasAccountCard,
    Iconfont
  },
  props: {
    nft: {
      type: Object as any as NFT, // NFT
      default: null
    }
  },
  setup (props: {nft: NFT}, { refs }) {
    const isPlay = ref(false)

    function playPause () {
      const video = refs.video
      if (video.paused) {
        isPlay.value = true
        video.play()
      }
      else {
        video.pause()
        isPlay.value = false
      }
    }

    return {
      NFTProviderType,
      isPlay,

      playPause
    }
  }
})
</script>
