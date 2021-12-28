<style lang="scss">
@import "src/assets/variables";

.brand-filters {
  display: block;

  .nav_item {
    display: inline-block;
    padding: 4px 2px;

    span {
      display: inline-grid;
      grid-column-gap: 4px;
      grid-auto-flow: column;
      margin: 0 2px;
      padding: 8px 12px;
      font-size: 14px;
      line-height: 1;
      white-space: nowrap;
      border-radius: 16px;
      color: #2F3238;
      background: rgba(126, 126, 126, 0.2);
      cursor: pointer;
    }

    &._active {
      span {
        box-shadow: 0 1px 1px 0 rgba(24, 33, 77, 0.1);
        font-weight: bold;
        color: #11142d;
        background: #FFFFFF;
      }
    }

    .nav_item_logo {
      width: 13px;
    }
  }

  @media all and (max-width: $screen_sm) {
    justify-content: flex-start;
  }
}

.theme_dark {
  .brand-filters {
    .nav_item {
      span {
        color: #7C7F84;
      }

      &._active {
        span {
          color: #FFFFFF;
          background-color: rgba(126, 126, 126, 0.5);
        }
      }
    }
  }
}
</style>

<template>
  <ul class="brand-filters">
    <li v-for="item in navList"
        :key="item.value"
        class="nav_item"
        :class="{'_active': value === item.value}"
        @click="onClickItem(item)">
      <span>
        <img
          v-if="item.value === BrandItem.airnfts"
          class="nav_item_logo"
          :src="`/imgs/${item.value}-logo.png`"
        />
        <Iconfont v-else-if="item.value !== BrandItem.all" :name="item.value" />
        {{ item.text }}
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IOption } from '~/constant/types'
import Iconfont from '~/components/Iconfont.vue'

const EVENTS = {
  input: 'input',
}

export const BrandItem = {
  all: 'all',
  opensea: 'opensea',
  poap: 'poap',
  treasureland: 'treasureland',
  airnfts: 'airnfts',
}

export default defineComponent({
  name: 'BrandFilters',
  components: {
    Iconfont
  },
  events: EVENTS,
  props: {
    value: {
      type: String,
      default: BrandItem.all,
    }
  },
  setup (props, { emit, root }) {
    const navList: IOption[] = [{
      value: BrandItem.all,
      text: root.$tt('All')
    }, {
      value: BrandItem.opensea,
      text: 'OpenSea',
    }, {
      value: BrandItem.poap,
      text: 'POAP',
    }, {
      value: BrandItem.airnfts,
      text: 'AirNFTs'
    }, {
      value: BrandItem.treasureland,
      text: 'Treasureland',
    }]

    function onClickItem (item: IOption): void {
      emit(EVENTS.input, item.value)
    }

    return {
      BrandItem,
      navList,
      onClickItem,
    }
  }
}
)</script>
