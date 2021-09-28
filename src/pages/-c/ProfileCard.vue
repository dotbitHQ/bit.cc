<style lang="scss">
@import "src/assets/variables";

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  .profile_account {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 70px;
    text-align: center;
    word-break: break-all;
    font-weight: bold;
    color: #11142d;
    white-space: nowrap;
    transition: font-size 100ms ease-in;
  }

  .profile_description {
    font-size: 14px;
    font-weight: 400;
    color: #797791;
    line-height: 20px;
    text-align: center;
  }

  .profile_share {
    margin-top: 15px;

    .profile_share_button {
      display: inline-block;
      padding: 6px 20px;
      border: none;
      font-size: 12px;
      border-radius: 8px;
      cursor: pointer;

      &._twitter {
        margin-right: 10px;
        background: rgba(187, 187, 187, 0.3);
        color: #11142d;

        .iconfont {
          color: #24b2fe;
        }
      }

      &._card {
        background: #49b4c1;
        color: #fff;
      }
    }
  }

  .profile_card_mask {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);

    .profile_card_container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
    }

    .profile_card_img {
      height: 600px;
      width: 400px;
      border-radius: 20px;
    }

    .iconfont {
      cursor: pointer;
    }
  }
}

@media all and (max-width: 600px) {
  .profile-card {
    .profile_card_mask {
      .profile_card_img {
        height: 450px;
        width: 300px;
      }
    }
  }
}

.theme_dark {
  .profile-card {
    .profile_account {
      background-image: radial-gradient(circle farthest-corner at 0% 0%, #ecfcff, hsla(0, 0%, 100%, 0) 32%), radial-gradient(circle farthest-corner at 100% 100%, #fefaef, hsla(0, 0%, 100%, 0) 36%), radial-gradient(circle farthest-corner at 50% 50%, #fdfcfc, hsla(0, 0%, 100%, 0)), radial-gradient(circle farthest-side at 100% 0%, #e376be, hsla(0, 0%, 100%, 0) 94%), radial-gradient(circle farthest-corner at 0% 100%, #a0e9fc, hsla(0, 0%, 100%, 0) 85%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .profile_share {
      .profile_share_button {
        color: #fff;
      }
    }
  }
}
</style>

<template>
  <div class="profile-card">
    <DasAvatar :size="110" :avatar="account.avatar" :account="account.account" />

    <h3 class="profile_account" v-resize-text="{minSize: 40, maxSize: 70}">{{ account.account }}</h3>
    <p class="profile_description">
      {{ account.description || $tt('No description added') }}
    </p>

    <div class="profile_share">
      <a class="profile_share_button _twitter" :href="intent" target="_blank">
        <Iconfont name="twitter" />
        {{ $tt('Share to Twitter') }}
      </a>

      <button class="profile_share_button _card" type="button" @click="toggleCard">
        <Iconfont name="card" />
        {{ $tt('Share Card') }}
      </button>
    </div>

    <div class="spacer" />

    <div v-if="isShowingCard" class="profile_card_mask">
      <div class="profile_card_container">
        <img class="profile_card_img" :src="`https://identicons.da.systems/card/bitcc/${account.account}`" alt="">
        <div style="margin-top: 12px;">{{ $tt('Press to save image') }}</div>
        <div style="margin-top: 30px;">
          <Iconfont name="close" :size="28" @click="toggleCard" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { useToggle } from '@vueuse/core'
import DasAvatar from '~/components/DasAvatar'
import ResizeText from '~/directives/ResizeText'
import Iconfont from '~/components/Iconfont'
import { collapseString } from '~/modules/tools'

export default defineComponent({
  name: 'ProfileCard',
  components: {
    DasAvatar,
    Iconfont,
  },
  directives: {
    ResizeText,
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    },
  },

  setup (props) {
    const intent = ref('')

    const [isShowingCard, toggleCard] = useToggle()

    onMounted(() => {
      const text = 'Hey! It\'s time to DAS! \nCome to my DAS profile card and view all my NFTs, crypto addresses, and social contacts! @realDASystems\n'
      const url = window.location.href
      intent.value = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    })

    return {
      intent,

      isShowingCard,
      toggleCard,

      collapseString
    }
  }
}
)</script>
