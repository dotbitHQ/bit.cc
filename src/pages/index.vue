<style lang="scss">
.page-index {
  height: 100vh;
  background:
    linear-gradient(150deg, #00b2f9, rgba(255, 255, 255, 0.3) 60%, transparent),
    linear-gradient(-150deg, magenta, rgba(255, 255, 255, 0.3) 40%, transparent),
    linear-gradient(-45deg, yellow, rgba(255, 255, 255, 0.3) 40%, transparent),
    linear-gradient(45deg, white, rgba(255, 255, 255, 0.3) 50%, transparent);
  background-blend-mode: hard-light;

  .index_main {
    margin: 0 auto;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .index_nav {
      width: 180px;
      flex-shrink: 0;
    }

    .index_planet {
      margin-top: 50px;
    }

    .index_profile {
      width: 250px;
      flex-shrink: 0;
      margin-left: 20px;
    }
  }
}
</style>
<template>
  <div class="page-index">
    <BitHeader />

    <div class="index_main">
      <SideNav class="index_nav" v-model="activeNav" />
      <BitPlanet class="index_planet"
                 :addresses="addresses"
                 :profiles="profiles"
                 :customs="customs"
                 :welcome="account.welcome"
                 :emoji="account.emoji"
      />
      <ProfileCard class="index_profile"
                   :account="account.account"
                   :description="account.description"
                   :owner="account.owner"
                   :manager="account.manager"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropOptions, ref } from '@nuxtjs/composition-api'
import BitHeader from '~/components/BitHeader'
import { DasRecordType, IDasRecord } from '~/constant/das'
import BitPlanet from '~/pages/-c/BitPlanet'
import ProfileCard from '~/pages/-c/ProfileCard'
import SideNav from '~/pages/-c/SideNav'
import { NavItem } from '~/pages/-c/SideNav.vue'

export default defineComponent({
  components: {
    BitHeader,
    ProfileCard,
    SideNav,
    BitPlanet,
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
