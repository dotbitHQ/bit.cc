<style lang="scss">
@import "src/assets/variables";

.das-records {
  .das-records_group {
    margin-left: -3%;
    display: flex;
    flex-wrap: wrap;
  }

  .das-record-card,
  .nft-record {
    width: 33%;
    flex-basis: 30%;
    flex-shrink: 1;
    margin-left: 3%;
    margin-bottom: 3%;
  }

  .record_empty {
    margin-top: 111px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    line-height: 1.4;
    color: #6f7684;

    .record_empty_emoji {
      margin-bottom: 10px;
      font-size: 48px;
    }

    .record_empty_button {
      margin-top: 30px;
      margin-bottom: 15px;
      padding: 18px 40px;
      border-radius: 16px;
      cursor: pointer;
      font-weight: bold;
      color: #fff;
      background-color: black;
    }
  }

  .records-desc {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: black;
  }

  @media all and (max-width: $screen_lg) {
    .das-records_group {
      margin-left: 0;
    }

    .das-record-card,
    .nft-record {
      flex-basis: 49%;
      margin-left: 1%;
    }

    .das-record-card {
      margin-bottom: 2%;
    }

    .nft-record {
      margin-bottom: 1%;
    }
  }

  @media all and (max-width: $screen_sm) {
    .das-records_group {
      margin-left: 0;

      &._nft {
        margin-left: -1%;
      }
    }

    .das-record-card {
      flex-basis: 100%;
      margin-left: 0;
      margin-bottom: 4%;
    }
  }
}

.theme_dark {
  .das-records {

    .records-desc {
      color: white;
    }

    .record_empty {
      .record_empty_button {
        background-image: radial-gradient(circle farthest-corner at 0% 0%, #ecfcff, hsla(0, 0%, 100%, 0) 32%), radial-gradient(circle farthest-corner at 100% 100%, #fefaef, hsla(0, 0%, 100%, 0) 36%), radial-gradient(circle farthest-corner at 50% 50%, #fdfcfc, hsla(0, 0%, 100%, 0)), radial-gradient(circle farthest-side at 100% 0%, #e376be, hsla(0, 0%, 100%, 0) 94%), radial-gradient(circle farthest-corner at 0% 100%, #a0e9fc, hsla(0, 0%, 100%, 0) 85%);
        color: #11142d;
      }
    }
  }
}
</style>

<template>
  <div class="das-records">
    <template v-if="nfts.length">
      <div id="J_nft" class="das-records_group _nft">
        <NFTRecord v-for="nft in nfts" :key="nft.name + nft.link + nft.tokenId" :nft="nft" />
      </div>
      <div class="records-desc">{{ $tt('Above are all the NFTs of the owner address') }}</div>
      <RecordsSeparator style="margin-top: 20px;" />
    </template>

    <template v-if="addresses.length">
      <div id="J_address" class="das-records_group">
        <DasRecordCard v-for="record in addresses" :key="record.key + record.value" :record="record" />
      </div>
      <RecordsSeparator />
    </template>

    <template v-if="profiles.length">
      <div id="J_profile" class="das-records_group">
        <DasRecordCard v-for="record in profiles" :key="record.key + record.value" :record="record" />
      </div>
      <RecordsSeparator />
    </template>

    <div v-if="customs.length" id="J_custom_key" class="das-records_group">
      <DasRecordCard v-for="record in customs" :key="record.key + record.value" :record="record" />
    </div>

    <div v-if="!customs.length && !profiles.length && !addresses.length && !nfts.length" class="record_empty">
      <div class="record_empty_emoji">🤪</div>

      <p>{{ $tt('There is a void here') }}</p>
      <p>{{ $tt('You can add DAS records if you are the owner') }}</p>

      <a class="record_empty_button" :href="`https://data.did.id/${account}`" target="_blank">
        {{ $tt('Add Records') }} →
      </a>

      <a :href="$i18n.locale === LANGUAGE.zhCN ? 'https://talk.did.id/t/bit-cc/280' : 'https://talk.did.id/t/bit-cc-faq/281'" target="_blank">
        {{ $tt('Guide') }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { LANGUAGE } from '~/constant'
import DasRecordCard from '~/pages/-c/DasRecordCard.vue'
import NFTRecord from '~/pages/-c/NFTRecord.vue'
import RecordsSeparator from './RecordsSeparator.vue'

const RecordsPropType = {
  type: Array, // AccountRecord[]
  default: () => [],
}

export default {
  name: 'DasRecords',
  components: {
    DasRecordCard,
    NFTRecord,
    RecordsSeparator,
  },
  props: {
    account: {
      type: String,
      default: '',
    },
    nfts: RecordsPropType,
    addresses: RecordsPropType,
    profiles: RecordsPropType,
    customs: RecordsPropType,
  },
  data () {
    return {
      LANGUAGE
    }
  }
}
</script>
