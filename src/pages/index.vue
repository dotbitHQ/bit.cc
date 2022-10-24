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

  &._has_background {
    background-size: cover;
    background-position: center;
  }

  .index_content {
    margin: 0 auto;
    width: 1080px;
    max-width: 100vw;
    display: flex;
    flex-direction: column;

    .index_profile {
      margin-bottom: 25px;
    }

    .index_nav {
      width: 500px;
      margin: 0 auto 30px auto;
    }

    .index_brand-filters {
      margin: 0 auto 30px auto;
    }

    .center_footer {
      display: none;
    }
  }

  &.theme_dark {
    background: no-repeat top right/300px url('/imgs/background_planet_dark.svg') #030303;
  }

  @media all and (max-width: $screen_md) {
    .index_content {
      width: unset;
      min-height: 95%;
      padding: 0 10px;

      .index_nav {
        width: unset;
        margin: 0 0 12px 0;
      }

      .index_brand-filters {
        margin-bottom: 24px;
      }

      .center_footer {
        margin-top: auto;
        margin-bottom: 20px;
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
  }
}
</style>
<template>
  <div class="page-index"
       :class="{[`theme_${account.theme}`]: account.theme, '_has_background': account.backgroundImage}"
       :style="account.backgroundImage ? `background-image:url('${account.backgroundImage}');` : ''">
    <BitHeader />

    <DasUnregistered v-if="account.status === AccountStatus.unregistered" :account="account.account" />
    <DasOnCross v-else-if="account.status === AccountStatus.onCross" :account="account.account" />
    <div v-else-if="account.status === AccountStatus.successful" class="index_content">
      <ProfileCard class="index_profile" :account="account" />
      <SideNav v-model="activeNav" class="index_nav" />
      <BrandFilters
        v-if="activeNav === NavItem.nft"
        v-model="activeBrandFilter"
        class="index_brand-filters"
      />

      <DasRecords :addresses="account.addresses"
                  :profiles="account.profiles"
                  :customs="account.customs"
                  :nfts="filteredNfts"
                  :account="account.account"
      />

      <div class="center_footer">
        <img class="profile-logo" src="/imgs/logo-profile.png?v=1" width="50%" alt="Profile Logo">
        <div style="margin-top: 10px;">
          <a :href="`https://app.did.id/explorer?searchWord=${account.account}&utm_source=bitcc`">{{ $tt('Register DAS') }}→</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, useContext, useFetch, useRoute, computed } from '@nuxtjs/composition-api'
import BitHeader from '~/components/BitHeader.vue'
import { AccountStatus, useAccount } from '~/hooks/useAccount'
import { useMetaAccount } from '~/hooks/useMetaAccount'
import { NFTProviderType, useNFT } from '~/hooks/useNFT'
import { ResolveResult } from '~/modules/das'
import DasRecords from '~/pages/-c/DasRecords.vue'
import DasUnregistered from '~/pages/-c/DasUnregistered.vue'
import DasOnCross from '~/pages/-c/DasOnCross.vue'
import ProfileCard from '~/pages/-c/ProfileCard.vue'
import SideNav, { NavItem } from '~/pages/-c/RecordsNav.vue'
import BrandFilters, { BrandItem } from '~/pages/-c/BrandFilters.vue'
import { INJECTED_BITCC_ACCOUNT } from '~/plugins/resolve'

export default defineComponent({
  head: {},
  components: {
    BitHeader,
    ProfileCard,
    SideNav,
    DasRecords,
    DasUnregistered,
    BrandFilters,
    DasOnCross,
  },
  setup () {
    const resolveResult = inject(INJECTED_BITCC_ACCOUNT) as ResolveResult
    const route = useRoute()
    const context = useContext()
    const activeNav = ref(NavItem.nft)
    const activeBrandFilter = ref(BrandItem.all)

    const { account, fetchAccount } = useAccount(resolveResult)
    const { nfts, fetchNFTs, loading: loadingNFT } = useNFT(account)
    const filteredNfts = computed(() => {
      if (activeNav.value === NavItem.nft) {
        if (activeBrandFilter.value === BrandItem.opensea) {
          return nfts.value.filter(nft => {
            return nft.providerType === NFTProviderType.opensea
          })
        }
        else if (activeBrandFilter.value === BrandItem.poap) {
          return nfts.value.filter(nft => {
            return nft.providerType === NFTProviderType.xdai
          })
        }
        else if (activeBrandFilter.value === BrandItem.treasureland) {
          return nfts.value.filter(nft => {
            return nft.providerType === NFTProviderType.treasureland
          })
        }
        else if (activeBrandFilter.value === BrandItem.airnfts) {
          return nfts.value.filter(nft => {
            return nft.providerType === NFTProviderType.airnfts
          })
        }
        else {
          return nfts.value
        }
      }
      return nfts.value
    })

    useMetaAccount(account.value, resolveResult.url)

    useFetch(async () => {
      await fetchAccount()

      if (account.value.redirect && !route.value.query.noredirect) {
        context.redirect(account.value.redirect)
      }
    })

    if (process.browser) {
      onMounted(() => {
        if (account.value.status === AccountStatus.successful) {
          fetchNFTs()
        }
        // it's weird that account.value.status will always be AccountStatus.loading when visiting xxx.bit.cc, while everything works fine for xxx.bit.host,
        // so we have to invoke fetchNFTs again
        else {
          setTimeout(() => fetchNFTs(), 2000)
        }
      })
    }

    return {
      NavItem,
      account,
      AccountStatus,

      nfts,
      loadingNFT,

      activeNav,
      activeBrandFilter,
      filteredNfts,
    }
  }
})
</script>
