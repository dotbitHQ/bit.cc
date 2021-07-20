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
    word-break: break-all;
    font-weight: bold;
    color: #11142d;
  }

  .profile_description {
    font-size: 14px;
    font-weight: 400;
    color: #797791;
    line-height: 20px;
    word-break: keep-all;
    text-align: center;
  }

  .profile_locks {
    margin-top: 25px;
    padding: 5px 12px;
    align-self: stretch;
    border-radius: 10px;
    background: #f7f7f7;
    font-family: sans-serif;
    line-height: 1.4;

    .profile_lock {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 500;

      .profile_lock_type {
        flex: 1;
        color: #11142d;
      }

      .profile_lock_address {
        &._manager {
          color: rgba(6, 109, 255, 1);
        }

        &._owner {
          color: rgba(34, 198, 141, 1)
        }
      }
    }
  }

  .spacer {
    flex: 1;
  }

  @media all and (max-width: $screen_sm) {
    min-height: unset;
    max-width: unset;

    .profile-logo {
      display: none;
    }
  }
}
</style>

<template>
  <BitCard class="profile-card">
    <DasAvatar :size="136" :account="account" />

    <h3 class="profile_account">{{ account }}</h3>
    <p class="profile_description">{{ description }}</p>

    <div class="profile_locks">
      <div class="profile_lock">
        <span class="profile_lock_type">{{ $tt('Owner') }}</span>
        <Iconfont name="crypto.eth" />
        <span class="profile_lock_address _owner">
          {{ collapseString(owner) }}
        </span>
      </div>

      <div class="profile_lock">
        <span class="profile_lock_type">{{ $tt('Manager') }}</span>
        <!--<Iconfont name="crypto.eth" />-->
        <DasAvatar :size="14" style="margin-right: 5px;" />
        <span class="profile_lock_address _manager">
          {{ collapseString(manager) }}
        </span>
      </div>
    </div>

    <div class="spacer"></div>
    <img class="profile-logo" src="imgs/logo-profile.png" alt="Profile Logo" width="140">
  </BitCard>
</template>

<script>

import { defineComponent } from '@nuxtjs/composition-api'
import BitCard from '~/components/BitCard'
import DasAvatar from '~/components/DasAvatar'
import Iconfont from '~/components/Iconfont'
import { collapseString } from '~/modules/tools'

export default defineComponent({
  name: 'Profile',
  components: {
    BitCard,
    DasAvatar,
    Iconfont,
  },
  props: {
    account: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    owner: {
      type: String,
      default: '',
    },
    manager: {
      type: String,
      default: '',
    },
  },
  setup (props) {
    return {
      collapseString
    }
  }
}
)</script>
