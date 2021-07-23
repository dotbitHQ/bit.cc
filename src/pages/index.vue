<style lang="scss">
@import "src/assets/variables";

.page-index {
  height: 100vh;
  background:
    no-repeat top right/300px url('/imgs/background_planet.svg'),
    radial-gradient(circle farthest-side at 50% 100%, #fdfcfd, hsla(0, 0%, 100%, 0) 65%),
    radial-gradient(circle farthest-corner at 50% 50%, #fdfcfd, hsla(0, 0%, 100%, 0) 87%),
    radial-gradient(circle closest-corner at 100% 50%, #ffe6cc, hsla(0, 0%, 100%, 0)),
    radial-gradient(circle farthest-side at 100% 100%, #fefdf2, hsla(0, 0%, 100%, 0) 67%),
    radial-gradient(circle farthest-side at 0% 100%, #f3fcff 7%, hsla(0, 0%, 100%, 0) 50%),
    radial-gradient(circle farthest-side at 100% 0%, #fc75de, hsla(0, 0%, 100%, 0)),
    radial-gradient(circle farthest-corner at 10% 10%, #55c1fb, hsla(0, 0%, 100%, 0));
  //background-blend-mode: hard-light;
  overflow: auto;

  .index_content {
    margin: 0 auto;
    width: 960px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .index_nav {
      position: absolute;
      margin-top: -100px;
      left: 12px;
      width: 180px;
      flex-shrink: 0;
    }

    .index_center {
      order: 1;
      flex: 1;
      box-sizing: border-box;
      height: calc(100vh - #{$header_height});
      padding-top: 20px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0;
      }

      .center_emoji {
        font-size: 68px;
        line-height: 1;
      }

      .center_welcome {
        margin-top: 10px;
        margin-bottom: 30px;
        font-size: 68px;
        line-height: 1.2;
        font-weight: 900;
        color: #11142d;
      }

      .center_intro {
        margin-bottom: 55px;
        font-size: 20px;
        line-height: 1.2;
        font-weight: 500;
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
      order: 2;
      align-self: stretch;
      margin-top: 12%;
      margin-bottom: 5%;
      margin-left: 20px;
      flex-shrink: 0;
    }
  }

  @media all and (max-width: $screen_xl) {
    .index_content {
      width: 700px;

      .index_nav {
        display: none;
      }

      .index_center {
        .center_welcome {
          margin-bottom: 10px;
          font-size: 44px;
        }

        .center_intro {
          margin-bottom: 26px;
        }
      }

      .index_profile {
        margin-left: 55px;
      }
    }
  }

  @media all and (max-width: $screen_md) {
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
        padding: 20px 40px;
        overflow: unset; // use page scroll

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
          margin-top: 20px;
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

  @media all and (max-width: $screen_sm) {
    background:
      no-repeat top right/140px url('/imgs/background_planet.svg'),
      radial-gradient(circle farthest-side at 50% 100%, #fdfcfd, hsla(0, 0%, 100%, 0) 65%),
      radial-gradient(circle farthest-corner at 50% 50%, #fdfcfd, hsla(0, 0%, 100%, 0) 87%),
      radial-gradient(circle closest-corner at 100% 50%, #ffe6cc, hsla(0, 0%, 100%, 0)),
      radial-gradient(circle farthest-side at 100% 100%, #fefdf2, hsla(0, 0%, 100%, 0) 67%),
      radial-gradient(circle farthest-side at 0% 100%, #f3fcff 7%, hsla(0, 0%, 100%, 0) 50%),
      radial-gradient(circle farthest-side at 100% 0%, #fc75de, hsla(0, 0%, 100%, 0)),
      radial-gradient(circle farthest-corner at 10% 10%, #55c1fb, hsla(0, 0%, 100%, 0));

    .index_content {
      .index_center {
        padding: 20px;
      }
    }
  }
}
</style>
<template>
  <div class="page-index">
    <BitHeader />

    <DasUnregistered v-if="account.status === AccountStatus.unregistered" :account="account.account" />
    <div v-else-if="account.status === AccountStatus.successful" class="index_content">
      <div class="index_center">
        <div id="J_overview" class="center_emoji">
          👋
        </div>

        <div class="center_welcome">
          {{ account.welcome || $tt('Hi, Welcome to my DAS Planet') }}
        </div>

        <p class="center_intro">{{ $tt('Here are all my DAS records') }}</p>

        <ProfileCard class="center_profile" :account="account" />

        <DasRecords :addresses="account.addresses"
                    :profiles="account.profiles"
                    :customs="account.customs"
        />

        <div class="center_footer">
          <img class="profile-logo" src="/imgs/logo-profile.png" width="50%" alt="Profile Logo">
          <div style="margin-top: 10px;">
            <a href="https://app.da.systems">{{ $tt('Register DAS') }}→</a>
          </div>
        </div>
      </div>
      <ProfileCard class="index_profile" :account="account"/>
      <SideNav class="index_nav" v-model="activeNav" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  Ref,
  ref,
  useMeta,
} from '@nuxtjs/composition-api'
import DasSDK from 'das-sdk'
import { AccountData } from 'das-sdk/build/module/types/AccountData'
import { DasRecordType, IDasRecord } from '~/constant/das'
import { resolveAccountFromUrl } from '~/modules/das'
import DasUnregistered from '~/pages/-c/DasUnregistered'
import BitHeader from '~/components/BitHeader'
import DasRecords from '~/pages/-c/DasRecords.vue'
import ProfileCard from '~/pages/-c/ProfileCard'
import SideNav from '~/pages/-c/SideNav'
import { NavItem } from '~/pages/-c/SideNav.vue'

async function getDasAccount (account: string): Promise<AccountData> {
  const das = await DasSDK.autonetwork({
    url: 'https://indexer.da.systems',
    // network: 'aggron',
  })

  return das.getAccountData(account)
}

enum AccountStatus {
  loading,
  unregistered,
  failed,
  successful,
}

function useAccount (url: string): Ref<any> {
  const account = ref({
    status: AccountStatus.loading,
    account: '',
  })

  const meta = useMeta()

  onBeforeMount(async () => {
    const resolveResult = resolveAccountFromUrl(url)

    account.value.account = resolveResult.account

    let accountData
    try {
      accountData = await getDasAccount(resolveResult.account)
    }
    catch (err) {
      if (err.code === 'UnregisteredDomain') {
        account.value.status = AccountStatus.unregistered
      }
      else {
        account.value.status = AccountStatus.failed
        console.error(err)
      }
      return
    }

    const records: IDasRecord[] = accountData.records.map(record => {
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
    const welcomeRecord = customs.find(record => record.key === 'custom_key.host.welcome')

    account.value = {
      account: accountData.account,
      owner_address: accountData.owner_address,
      owner_address_chain: accountData.owner_lock_chain_type.toLowerCase(),
      manager_address: accountData.manager_address,
      manager_address_chain: accountData.manage_lock_chain_type.toLowerCase(),
      description: descriptionRecord?.value,
      welcome: welcomeRecord?.value,

      addresses,
      profiles,
      customs,

      status: AccountStatus.successful,
    }

    meta.title.value = accountData.account + ' - Das Account'

    // vue-meta can not control what exists, so we have to override it manually
    setTimeout(() => {
      const $icon = window.document.querySelector('link[rel=icon]')
      $icon?.setAttribute('type', 'image/png')
      $icon?.setAttribute('href', `https://identicons.da.systems/identicon/${accountData.account}`)
    }, 100)
  })

  return account
}

export default defineComponent({
  head: {},
  components: {
    BitHeader,
    ProfileCard,
    SideNav,
    DasRecords,
    DasUnregistered,
  },
  setup () {
    const account = useAccount(window.location.href)

    return {
      account,
      AccountStatus,
      activeNav: ref(NavItem.overview)
    }
  }
})
</script>
