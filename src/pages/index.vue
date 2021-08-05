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
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0;
      }

      .center_emoji {
        font-size: 68px;
        line-height: 1;
      }

      .center_welcome {
        margin-top: 30px;
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

  &.theme_dark {
    background: no-repeat top right/300px url('/imgs/background_planet_dark.svg') #030303;

    .index_content {
      .center_welcome {
        background-image: radial-gradient(circle farthest-corner at 0% 0%, #ecfcff, hsla(0, 0%, 100%, 0) 32%), radial-gradient(circle farthest-corner at 100% 100%, #fefaef, hsla(0, 0%, 100%, 0) 36%), radial-gradient(circle farthest-corner at 50% 50%, #fdfcfc, hsla(0, 0%, 100%, 0)), radial-gradient(circle farthest-side at 100% 0%, #e376be, hsla(0, 0%, 100%, 0) 94%), radial-gradient(circle farthest-corner at 0% 100%, #a0e9fc, hsla(0, 0%, 100%, 0) 85%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .center_intro {
        background-image: radial-gradient(circle farthest-corner at 0% 0%, #ecfcff, hsla(0, 0%, 100%, 0) 32%), radial-gradient(circle farthest-corner at 100% 100%, #fefaef, hsla(0, 0%, 100%, 0) 36%), radial-gradient(circle farthest-corner at 50% 50%, #fdfcfc, hsla(0, 0%, 100%, 0)), radial-gradient(circle farthest-side at 100% 0%, #e376be, hsla(0, 0%, 100%, 0) 94%), radial-gradient(circle farthest-corner at 0% 100%, #a0e9fc, hsla(0, 0%, 100%, 0) 85%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
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
        width: 100%;
        padding: 0 20px 20px;

        .center_emoji {
          margin-top: -10px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="page-index"
       :class="{[`theme_${account.theme}`]: account.theme, '_has_background': account.backgroundImage}"
       :style="account.backgroundImage ? `background-image:url('${account.backgroundImage}');` : ''">
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
                    :nfts="nfts"
        />

        <div class="center_footer">
          <img class="profile-logo" src="/imgs/logo-profile.png" width="50%" alt="Profile Logo">
          <div style="margin-top: 10px;">
            <a href="https://app.da.systems">{{ $tt('Register DAS') }}→</a>
          </div>
        </div>
      </div>
      <ProfileCard class="index_profile" :account="account" />
      <SideNav class="index_nav" v-model="activeNav" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, useContext, useFetch, useRoute } from '@nuxtjs/composition-api'
import BitHeader from '~/components/BitHeader.vue'
import { AccountStatus, useAccount } from '~/hooks/useAccount'
import { useMetaAccount } from '~/hooks/useMetaAccount'
import { useNFT } from '~/hooks/useNFT'
import { ResolveResult } from '~/modules/das'
import DasRecords from '~/pages/-c/DasRecords.vue'
import DasUnregistered from '~/pages/-c/DasUnregistered.vue'
import ProfileCard from '~/pages/-c/ProfileCard.vue'
import SideNav, { NavItem } from '~/pages/-c/SideNav.vue'
import { INJECTED_BITCC_ACCOUNT } from '~/plugins/resolve'

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
    const resolveResult = inject(INJECTED_BITCC_ACCOUNT) as ResolveResult

    const route = useRoute()
    const context = useContext()

    const { account, fetchAccount } = useAccount(resolveResult)
    const { nfts, fetchNFTs, loading: loadingNFT } = useNFT(account.value)

    useMetaAccount(account.value, resolveResult.url)

    const { fetch: fetchAccountServer } = useFetch(async () => {
      await fetchAccount()

      if (account.value.redirect && !route.value.query.noredirect) {
        context.redirect(account.value.redirect)
      }
    })

    if (process.server) {
      fetchAccountServer()
    }

    if (process.browser) {
      onMounted(() => {
        if (account.value.status === AccountStatus.successful) {
          fetchNFTs()
        }
      })
    }

    return {
      account,
      AccountStatus,

      nfts,
      loadingNFT,

      activeNav: ref(NavItem.overview)
    }
  }
})
</script>
