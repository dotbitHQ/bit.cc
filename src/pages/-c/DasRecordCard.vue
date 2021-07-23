<style lang="scss">
.das-record-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 156px;
  padding: 8px 16px 12px 16px;

  .card_title {
    display: flex;
    justify-content: space-between;
  }

  .card_name {
    font-size: 28px;
    font-weight: 500;
    color: #11142d;
  }

  .card_content {
    margin: 16px 0 16px 0;
    max-height: 70px;
    overflow-y: auto;
    font-size: 16px;
    word-break: break-all;
    color: rgba(17, 20, 45, 0.7);
    line-height: 1;

    &._address {
      font-family: monospace;
    }
  }

  .card_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 21px;
  }

  .card_label {
    padding: 2px 5px;
    font-size: 14px;
    border-radius: 5px;
    background: rgba(50, 54, 61, 0.1);
    color: rgba(30, 34, 42, 1);
  }

  .card_copy,
  .card_open {
    display: none;
  }

  &:hover {
    .card_copy,
    .card_open {
      display: inline-flex;
    }
  }
}
</style>

<template>
  <BitCard class="das-record-card">
    <div class="card_title">
      <span class="card_name">{{ record.name }}</span>
      <IconRecord :record="record.name" :size="30" />
    </div>

    <p class="card_content" :class="{'_address': record.type === DasRecordType.address}">
      {{record.value}}
    </p>

    <div class="spacer" />

    <div class="card_footer">
      <span v-if="record.label" class="card_label">{{ record.label }}</span>
      <span class="spacer" />
      <span>
        <BitCopy class="card_copy" :text="record.value" />
        <BitOpen class="card_open" :url="valueAsUrl" />
      </span>
    </div>
  </BitCard>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BitCard from '~/components/BitCard'
import BitCopy from '~/components/BitCopy.vue'
import BitOpen from '~/components/BitOpen.vue'
import IconRecord from '~/components/IconRecord'
import { IDasRecord, DasRecordType } from '~/constant/das'
import { buildProfileUrl } from '~/modules/das'
import { collapseString } from '~/modules/tools'

export default defineComponent({
  name: 'DasRecord',
  components: {
    BitCard,
    BitCopy,
    BitOpen,
    IconRecord,
  },
  props: {
    record: {
      type: IDasRecord,
      default: null
    }
  },
  setup (props) {
    const valueAsUrl = buildProfileUrl(props.record)
    return {
      collapseString,

      DasRecordType,
      valueAsUrl,
    }
  }
}
)</script>
