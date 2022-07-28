<style lang="scss">
@import "src/assets/variables";


.v-popper__arrow-container {
  display: none;
}

.v-popper--theme-dropdown {
  .v-popper__inner {
    border: 1px solid rgba(182, 196, 217, 0.4);
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    background: #fff;
  }
}

.popover_content {
  display: flex;
  flex-direction: column;
  padding: 12px;
  .popover_content_button {
    background: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 12px;
    font-size: 16px;
    color: #121314;
    .icon-profile {
      margin-right: 8px;
    }
    &:hover {
      background: rgba(82, 98, 121, 0.1);
      border-radius: 8px;
    }
  }
}

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
    display: flex;
    flex-direction: row;

    .profile_button {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      background: rgba(187, 187, 187, 0.3);
      border-radius: 8px;
      padding: 8px 8px 8px 12px;
      border: none;
      .profile_button_text {
        margin: 0 16px 0 4px;
      }
      &.profile_button_contact {
        .profile_button_contact_icon {
          position: relative;
          width: 16px;
          height: 16px;
          .profile_button_contact_icon_dot {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #E93723;
            border: 2px solid #fff;
            position: absolute;
            top: -2px;
            right: -2px;
          }
        }
        margin-left: 10px;
        background: #49B4C1;
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
      <Dropdown>
        <button class="profile_button">
          <IconProfile name="share" :size="16" />
          <span class="profile_button_text">{{ $tt('Share') }}</span>
          <IconProfile name="dropdown-black" :size="10" />
        </button>
        <template #popper>
          <div class="popover_content">
            <a class="popover_content_button" :href="intent" target="_blank" v-close-popper>
              <IconProfile name="twitter" :size="20" />
              <span>{{ $tt('Share to Twitter') }}</span>
            </a>
            <button class="popover_content_button" type="button" @click="toggleCard" v-close-popper>
              <IconProfile name="share-card" :size="20" />
              <span>{{ $tt('Share Card') }}</span>
            </button>
          </div>
        </template>
      </Dropdown>
      <Dropdown ref="contactDropdown">
        <button class="profile_button profile_button_contact">
          <div class="profile_button_contact_icon">
            <IconProfile name="contact" :size="16" />
            <div class="profile_button_contact_icon_dot" v-if="hasUnreadMail"></div>
          </div>
          <span class="profile_button_text">{{ $tt('Contact') }}</span>
          <IconProfile name="dropdown-white" :size="10" />
        </button>
        <template #popper>
          <div class="popover_content">
            <component :is="mail3MeButton" v-if="mail3MeButton" />
          </div>
        </template>
      </Dropdown>
    </div>

    <div class="spacer" />

    <div v-if="isShowingCard" class="profile_card_mask">
      <div class="profile_card_container">
        <img class="profile_card_img" :src="`https://identicons.did.id/card/bitcc/${account.account}`" alt="">
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
import { DasAvatar, ResizeText } from 'das-ui-shared'
import { useToggle } from '@vueuse/core'
import Iconfont from '~/components/Iconfont'
import IconProfile from '~/components/IconProfile'
import { Dropdown, VClosePopper } from 'floating-vue'
import { collapseString } from '~/modules/tools'
import 'floating-vue/dist/style.css'

export default defineComponent({
  name: 'ProfileCard',
  components: {
    DasAvatar,
    Iconfont,
    Dropdown,
    IconProfile,
  },
  directives: {
    ResizeText,
    'close-popper': VClosePopper,
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    },
  },

  setup (_, ctx) {
    const intent = ref('')
    const mail3MeButton = ref(null)
    const [isShowingCard, toggleCard] = useToggle()
    const hasUnreadMail = ref(false)
    onMounted(() => {
      const text = 'Hey! Come to my #NFT gallery! 😎 \nYou can see my multi-chain NFTs and my .bit profile.  @dotbitHQ \n'
      const url = window.location.href
      intent.value = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      // since web component is not supported in SSR
      // load the component in the client side
      mail3MeButton.value = () => import('./Mai3MeButton.vue')

      // ensure dropdown content is mounted before first shown
      ctx.refs.contactDropdown.$refs.popper.$_ensureTeleport()
      const handleMail3MessageEvent = (event) => {
        if (event.origin === 'https://app.mail3.me' && event.data.total) {
          hasUnreadMail.value = true
        }
      }

      window.addEventListener('message', handleMail3MessageEvent)
      return () => window.removeEventListener('message', handleMail3MessageEvent)
    })

    return {
      intent,
      mail3MeButton,
      isShowingCard,
      toggleCard,
      hasUnreadMail,

      collapseString
    }
  }
}
)</script>
