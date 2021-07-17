<style lang="scss">
.page-index {
  height: 100vh;
  background:
    linear-gradient(150deg, #00b2f9, rgba(255, 255, 255, 0.3) 60%, transparent),
    linear-gradient(-150deg, magenta, rgba(255, 255, 255, 0.3) 40%, transparent),
    linear-gradient(-45deg, yellow, rgba(255, 255, 255, 0.3) 40%, transparent),
    linear-gradient(45deg, white, rgba(255, 255, 255, 0.3) 50%, transparent);
  background-blend-mode: hard-light;
  overflow: auto;

  .index_content {
    margin: 0 auto;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .index_nav {
      width: 180px;
      flex-shrink: 0;
      order: 1;
    }

    .index_center {
      order: 2;
      box-sizing: border-box;
      height: 100vh;
      padding-top: 50px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0;
      }

      .center_emoji {
        font-size: 68px;
        line-height: 1;
      }

      .center_welcome {
        font-size: 68px;
        font-family: sans-serif;
        line-height: 1.2;
        font-weight: 900;
        color: #11142d;
      }

      .center_intro {
        margin-top: 30px;
        margin-bottom: 50px;
        font-size: 20px;
        line-height: 1.2;
        font-weight: 500;
        font-family: monospace, sans-serif;
        color: #11142d;
      }

      .center_profile {
        display: none;
      }

      .center_footer {
        display: none;
      }
    }

    .index_profile {
      flex-shrink: 0;
      margin-left: 20px;
      order: 3;
    }
  }

  @media all and (max-width: 500px) {
    .index_content {
      width: unset;
      flex-direction: column;

      .index_nav {
        display: none;
      }

      .index_profile {
        display: none;
      }

      .index_center {
        margin-top: 0;
        padding: 20px;

        .center_welcome {
          font-size: 44px;
        }

        .center_intro {
          margin-top: 15px;
          margin-bottom: 35px;
        }

        .center_profile {
          display: flex;
          margin-bottom: 35px;
        }

        .center_footer {
          display: block;
          text-align: center;

          a {
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
            color: #22c68d;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="page-index">
    <BitHeader />

    <div class="index_content">
      <ProfileCard class="index_profile"
                   :account="account.account"
                   :description="account.description"
                   :owner="account.owner"
                   :manager="account.manager"
      />
      <SideNav class="index_nav" v-model="activeNav" />

      <div class="index_center">
        <div id="J_overview" class="center_emoji">
          {{ account.emoji }}
        </div>

        <div class="center_welcome">
          {{ account.welcome }}
        </div>

        <p class="center_intro">{{ $tt('Here are all my DAS records') }}</p>

        <ProfileCard class="center_profile"
                     :account="account.account"
                     :description="account.description"
                     :owner="account.owner"
                     :manager="account.manager"
        />

        <DasRecords :addresses="addresses"
                    :profiles="profiles"
                    :customs="customs"
        />

        <div class="center_footer">
          <img class="profile-logo" src="imgs/logo-profile.png" width="50%" alt="Profile Logo">
          <div style="margin-top: 10px;">
            <a href="https://app.da.systems">{{ $tt('Register DAS') }}→</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropOptions, ref } from '@nuxtjs/composition-api'
import BitHeader from '~/components/BitHeader'
import { DasRecordType, IDasRecord } from '~/constant/das'
import DasRecords from '~/pages/-c/DasRecords.vue'
import ProfileCard from '~/pages/-c/ProfileCard'
import SideNav from '~/pages/-c/SideNav'
import { NavItem } from '~/pages/-c/SideNav.vue'

export default defineComponent({
  components: {
    BitHeader,
    ProfileCard,
    SideNav,
    DasRecords,
  },
  setup () {
    const data = require('./data').default.result.data.account_data

    const records: IDasRecord[] = data.records.map(record => {
      const keyParts = record.key.split('.') // address.btc

      return {
        ...record,
        type: keyParts.shift(), // address
        name: keyParts.join('.'), // btc
      }
    })

    const addresses = records.filter(record => {
      if (record.type === DasRecordType.address) {
        // crypto name should be all uppercase, btc => BTC
        record.name = record.name.toUpperCase()
        return true
      }
      return false
    })

    const profiles = records.filter(record => {
      if (record.type === DasRecordType.profile) {
        // First letter should be uppercase, youtube => Youtube
        record.name = record.name.charAt(0).toUpperCase() + record.name.slice(1)
        return true
      }
      return false
    })

    const customs = records.filter(record => record.type === DasRecordType.custom)
    const descriptionRecord = profiles.find(record => record.key === 'profile.description')
    const welcomeRecord = customs.find(record => record.key === 'custom.host.welcome')
    const emojiRecord = customs.find(record => record.key === 'custom.host.emoji')

    return {
      account: {
        account: data.account,
        owner: data.owner_lock_args_hex,
        manager: data.manager_lock_args_hex,
        description: descriptionRecord?.value,
        welcome: welcomeRecord?.value,
        emoji: emojiRecord?.value // todo: prevent multiple chars(take 🦄️ into consideration）
      },

      addresses,
      profiles,
      customs,

      activeNav: ref(NavItem.overview)
    }
  }
})
</script>
