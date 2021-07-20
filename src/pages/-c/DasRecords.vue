<style lang="scss">
@import "src/assets/variables";

.das-records {
  .das-records_group {
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .das-record-card {
    margin-bottom: 35px;
    margin-right: 35px;
    flex-basis: 40%;
    flex-grow: 1;
  }

  // prevent the last single one from fulfilling the whole row
  .das_record_placeholder {
    display: none;
    flex-basis: 50%;

    &:nth-child(2n) {
      display: block;
      flex-basis: 50%;
    }
  }

  @media all and (max-width: $screen_sm) {
    .das-record-card {
      margin-right: 0;
      flex-basis: 100%;
    }
  }
}
</style>

<template>
  <div class="das-records">
    <div v-if="addresses.length" id="J_address" class="das-records_group">
      <DasRecordCard v-for="record in addresses" :key="record.key + record.value" :record="record" />
      <div class="das_record_placeholder" />
    </div>

    <div v-if="profiles.length" id="J_profile" class="das-records_group">
      <DasRecordCard v-for="record in profiles" :key="record.key + record.value" :record="record" />
      <div class="das_record_placeholder" />
    </div>

    <div v-if="customs.length" id="J_custom" class="das-records_group">
      <DasRecordCard v-for="record in customs" :key="record.key + record.value" :record="record" />
      <div class="das_record_placeholder" />
    </div>
  </div>
</template>

<script lang="ts">
import { IDasRecord } from '~/constant/das'
import DasRecordCard from '~/pages/-c/DasRecordCard.vue'

const RecordsPropType = {
  type: IDasRecord,
  default: (): Array => [],
}

export default {
  name: 'BitPlanet',
  components: {
    DasRecordCard,
  },
  props: {
    emoji: {
      type: String,
      default: '😊'
    },
    welcome: {
      type: String,
      default: '',
    },
    records: {
      type: Array,
      default: (): Array => [],
    },
    addresses: RecordsPropType,
    profiles: RecordsPropType,
    customs: RecordsPropType,
  },
  setup (props) {
    return {

    }
  }
}
</script>
