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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45%;
    height: 156px;
    color: rgba(17, 20, 45, 0.6);
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
</style>

<template>
  <div class="das-records">
    <div v-if="nfts.length" id="J_nft" class="das-records_group _nft">
      <NFTRecord v-for="nft in nfts" :key="nft.name + nft.link" :nft="nft" />
    </div>

    <RecordsSeparator />

    <div v-if="addresses.length" id="J_address" class="das-records_group">
      <DasRecordCard v-for="record in addresses" :key="record.key + record.value" :record="record" />
    </div>

    <RecordsSeparator />

    <div v-if="profiles.length" id="J_profile" class="das-records_group">
      <DasRecordCard v-for="record in profiles" :key="record.key + record.value" :record="record" />
    </div>

    <RecordsSeparator />

    <div v-if="customs.length" id="J_custom_key" class="das-records_group">
      <DasRecordCard v-for="record in customs" :key="record.key + record.value" :record="record" />
    </div>

    <BitCard v-if="!customs.length && !profiles.length && !addresses.length" class="record_empty">
      {{ $tt('No records') }}
    </BitCard>
  </div>
</template>

<script lang="ts">
import DasRecordCard from '~/pages/-c/DasRecordCard.vue'
import NFTRecord from '~/pages/-c/NFTRecord.vue'
import BitCard from '~/components/BitCard.vue'
import RecordsSeparator from './RecordsSeparator.vue'

const RecordsPropType = {
  type: Array, // AccountRecord[]
  default: () => [],
}

export default {
  name: 'BitPlanet',
  components: {
    DasRecordCard,
    NFTRecord,
    BitCard,
    RecordsSeparator,
  },
  props: {
    welcome: {
      type: String,
      default: '',
    },

    nfts: RecordsPropType,
    addresses: RecordsPropType,
    profiles: RecordsPropType,
    customs: RecordsPropType,
  },
}
</script>
