<style lang="scss">
@import "src/assets/variables";

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  .profile_account {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 40px;
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
}

.theme_dark {
  .profile-card {
    .profile_account {
      background-image: radial-gradient(circle farthest-corner at 0% 0%, #ecfcff, hsla(0, 0%, 100%, 0) 32%), radial-gradient(circle farthest-corner at 100% 100%, #fefaef, hsla(0, 0%, 100%, 0) 36%), radial-gradient(circle farthest-corner at 50% 50%, #fdfcfc, hsla(0, 0%, 100%, 0)), radial-gradient(circle farthest-side at 100% 0%, #e376be, hsla(0, 0%, 100%, 0) 94%), radial-gradient(circle farthest-corner at 0% 100%, #a0e9fc, hsla(0, 0%, 100%, 0) 85%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>

<template>
  <div class="profile-card">
    <DasAvatar :size="110" :avatar="account.avatar" :account="account.account" />

    <h3 class="profile_account" v-resize-text="{minSize: 20, maxSize: 70}">{{ account.account }}</h3>
    <p class="profile_description">
      {{ account.description || $tt('No description added') }}
    </p>

    <div class="spacer"></div>
  </div>
</template>

<script>

import { defineComponent } from '@nuxtjs/composition-api'
import DasAvatar from '~/components/DasAvatar'
import ResizeText from '~/directives/ResizeText'
import { collapseString } from '~/modules/tools'

export default defineComponent({
  name: 'ProfileCard',
  components: {
    DasAvatar,
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
    return {
      collapseString
    }
  }
}
)</script>
