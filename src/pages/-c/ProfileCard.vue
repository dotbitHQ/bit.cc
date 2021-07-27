<style lang="scss">
@import "src/assets/variables";

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 230px;
  max-width: 250px;
  min-height: 600px;
  padding-top: 35px;
  padding-bottom: 20px;
  box-shadow: 0 30px 27px -29px rgb(108 113 148 / 26%);

  .profile_account {
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 32px;
    text-align: center;
    word-break: break-all;
    font-weight: bold;
    color: #11142d;
    white-space: nowrap;
  }

  .profile_description {
    font-size: 14px;
    font-weight: 400;
    color: #797791;
    line-height: 20px;
    text-align: center;
  }

  .profile_locks {
    margin-top: 25px;
    padding: 5px 12px;
    align-self: stretch;
    border-radius: 10px;
    background: #f7f7f7;
    font-family: sans-serif;
    line-height: 1.6;

    .profile_lock {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      font-weight: 500;

      .profile_lock_type {
        flex: 1;
        color: #11142d;
      }
    }
  }

  @media all and (max-width: $screen_md) {
    min-height: unset;
    max-width: unset;

    .profile_locks {
      padding: 5px 16px;
      line-height: 1.8;
    }

    .profile-logo {
      display: none;
    }
  }
}
</style>

<template>
  <BitCard class="profile-card">
    <DasAvatar :size="136" :account="account.account" />

    <h3 class="profile_account" v-resize-text="{minSize: 20, maxSize: 36}">{{ account.account }}</h3>
    <p class="profile_description">
      {{ account.description || $tt('No description added') }}
    </p>

    <div class="profile_locks">
      <div class="profile_lock">
        <span class="profile_lock_type">{{ $tt('Owner') }}</span>
        <IconRecord :record="account.owner_address_chain" :size="16" style="margin-right: 4px;" />
        <LockAddress :address="account.owner_address" :address-chain="account.owner_address_chain" owner />
      </div>

      <div class="profile_lock">
        <span class="profile_lock_type">{{ $tt('Manager') }}</span>
        <IconRecord :record="account.manager_address_chain" :size="16" style="margin-right: 4px;" />
        <LockAddress :address="account.manager_address" :address-chain="account.manager_address_chain" />
      </div>
    </div>

    <div class="spacer"></div>
    <img class="profile-logo" src="/imgs/logo-profile.png" alt="Profile Logo" width="140">
  </BitCard>
</template>

<script>

import { defineComponent } from '@nuxtjs/composition-api'
import BitCard from '~/components/BitCard'
import DasAvatar from '~/components/DasAvatar'
import IconRecord from '~/components/IconRecord'
import ResizeText from '~/directives/ResizeText'
import LockAddress from './LockAddress'
import { collapseString } from '~/modules/tools'

export default defineComponent({
  name: 'ProfileCard',
  components: {
    BitCard,
    DasAvatar,
    IconRecord,
    LockAddress,
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
