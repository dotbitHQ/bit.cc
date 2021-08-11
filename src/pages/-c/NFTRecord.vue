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

    .nft_content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &._das {
        display: flex;
        align-items: center;
        justify-content: center;

        .das_card {
          position: relative;
          margin-top: 10%;
          box-sizing: border-box;
          width: 90%;
          max-width: 90%;
          height: 57%;
          padding: 30px 15px 5px 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          background: url('/imgs/nft/das-card.svg') no-repeat center/contain;

          &._narrow {
            padding-left: 5px;
            padding-right: 5px;
          }
        }

        .das_avatar {
          position: absolute;
          top: -$avatarSize / 2.2;
          height: $avatarSize;
          width: $avatarSize;
        }

        .das_name {
          font-size: 44px;
          font-weight: bold;
          text-align: center;
          line-height: 1;
          color: #fff;
        }

        .das_suffix {
          padding: 0 20px 4px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 44px;
          font-weight: bold;
          border-radius: 45px;
          background: rgba(0, 0, 0, 0.1);
          color: #fff;
        }
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
        //overflow: hidden;
        //word-break: keep-all;
        //white-space: nowrap;
        //text-overflow: ellipsis;
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

  .nft_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media all and (max-width: $screen_sm) {
    $avatarSize: 30px;

    .nft_wrap {
      .nft_content {
        &._das {
          .das_card {
            padding-top: 15px;
          }

          .das_avatar {
            top: -$avatarSize / 2.2;
            height: $avatarSize;
            width: $avatarSize;
          }

          .das_name {
          }

          .das_suffix {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="nft-record">
    <a class="nft_wrap" :href="nft.link" target="_blank">
      <div v-if="nft.providerType !== NFTProviderType.das" class="nft_content">
        <img class="nft_img" :src="nft.imageUrl" :alt="nft.name">
        <div class="nft_info">
          <div class="nft_name">{{ nft.name }}</div>
          <div class="nft_price">{{ nft.price }} {{ nft.priceToken }}</div>
        </div>
      </div>

      <div v-else class="nft_content _das" :style="{backgroundColor: color}">
        <div class="das_card" :class="isNarrow ? '_narrow': ''" >
          <DasAvatar class="das_avatar" :account="nft.name" size="" />
          <div class="das_name" v-resize-text="{minSize: minNameSize, maxSize: maxNameSize}">{{ nft.name.replace('.bit', '') }}</div>
          <div class="das_suffix">.bit</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import ResizeText from '~/directives/ResizeText'
import { NFT, NFTProviderType } from '~/hooks/useNFT'
import DasAvatar from '~/components/DasAvatar.vue'
const { defineComponent } = require('@nuxtjs/composition-api')

export default defineComponent({
  name: 'NFTRecord',
  components: {
    DasAvatar
  },
  directives: {
    ResizeText,
  },
  props: {
    nft: {
      type: Object as any as NFT, // NFT
      default: null
    }
  },
  setup (props: {nft: NFT}) {
    let minNameSize = 15
    let maxNameSize = 44
    let isNarrow = false

    if (process.browser) {
      if (window.screen.availWidth < 540) {
        minNameSize = 12
        maxNameSize = 30
      }

      if (props.nft.name.length > 60) {
        isNarrow = true
      }
    }

    const colors = ['#9692E6', '#40C3F0', '#FF9895', '#FEC165', '#E96565', '#3370FF', '#FF4F6E', '#6957ED', '#22C4C6', '#BC51EC', '#FFA86A', '#22C68D']
    let index = 0
    for (let i = 0; i < props.nft.name.length; i++) {
      index += props.nft.name.charCodeAt(i)
    }
    index = index % colors.length
    const color = colors[index]

    return {
      NFTProviderType,
      minNameSize,
      maxNameSize,
      isNarrow,
      color,
    }
  }
})
</script>
