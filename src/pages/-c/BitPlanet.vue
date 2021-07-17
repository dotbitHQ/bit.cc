<style lang="scss">
.bit-planet {
  .planet_emoji {
    font-size: 68px;
  }

  .planet_welcome {
    font-size: 68px;
    font-family: sans-serif;
    font-weight: 900;
    color: #11142d;
    line-height: 82px;
  }

  .planet_intro {
    margin-top: 30px;
    margin-bottom: 50px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
    font-family: monospace, sans-serif;
    color: #11142d;
  }

  .planet_records {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .das-record-card {
      margin-bottom: 20px;
      margin-right: 20px;
      flex-basis: 40%;
      flex-grow: 1;
    }
  }
}
</style>

<template>
  <div class="bit-planet">
    <div id="J_overview" class="planet_emoji">
      {{ emoji }}
    </div>

    <div class="planet_welcome">
      {{ welcome }}
    </div>

    <p class="planet_intro">{{ $tt('Here are all my DAS records') }}</p>

    <div v-if="addresses.length" id="J_address" class="planet_records">
      <DasRecordCard v-for="record in addresses" :key="record.key + record.value" :record="record" />
      <!-- prevent the last single one from fulfilling the whole row-->
      <div v-if="addresses.length % 2 === 1" style="flex-basis: 50%;" />
    </div>

    <div v-if="profiles.length" id="J_profile" class="planet_records">
      <DasRecordCard v-for="record in profiles" :key="record.key + record.value" :record="record" />
      <div v-if="addresses.length % 2 === 1" style="flex-basis: 50%;" />
    </div>

    <div v-if="customs.length" id="J_custom" class="planet_records">
      <DasRecordCard v-for="record in customs" :key="record.key + record.value" :record="record" />
      <div v-if="addresses.length % 2 === 1" style="flex-basis: 50%;" />
    </div>
  </div>
</template>

<script lang="ts">

import BitCard from '~/components/BitCard'
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
