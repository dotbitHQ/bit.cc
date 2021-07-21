<style lang="scss">
.das-record-card {
  padding: 10px 16px;

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
    margin: 16px 0 20px 0;
    font-size: 16px;
    word-break: break-all;
    color: rgba(17, 20, 45, 0.7);
    line-height: 20px;
  }

  .card_footer {
    display: flex;
    justify-content: space-between;
  }

  .card_label {
    padding: 2px 5px;
    font-size: 14px;
    border-radius: 5px;
    background: rgba(50, 54, 61, 0.1);
    color: rgba(30, 34, 42, 1);
  }
}
</style>

<template>
  <BitCard class="das-record-card">
    <div class="card_title">
      <span class="card_name">{{ record.name }}</span>
      <IconRecord :record="record.name" :size="30" />
    </div>

    <p class="card_content">
      {{record.value}}
    </p>

    <div class="card_footer">
      <span class="card_label">{{ record.label ? collapseString(record.label) : record.key }}</span>
      <BitCopy />
    </div>
  </BitCard>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BitCard from '~/components/BitCard'
import BitCopy from '~/components/BitCopy.vue'
import IconRecord from '~/components/IconRecord'
import { IDasRecord } from '~/constant/das'
import { collapseString } from '~/modules/tools'

export default defineComponent({
  name: 'DasRecord',
  components: {
    BitCard,
    BitCopy,
    IconRecord,
  },
  props: {
    record: {
      type: IDasRecord,
      default: null
    }
  },
  setup () {
    return {
      collapseString
    }
  }
}
)</script>
