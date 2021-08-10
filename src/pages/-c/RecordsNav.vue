<style lang="scss">
@import "src/assets/variables";

.records-nav {
  display: flex;
  justify-content: center;
  overflow: auto;

  .nav_item {
    a {
      display: inline-block;
      margin: 0 14px;
      padding: 7px 16px;
      font-size: 14px;
      line-height: 1;
      white-space: nowrap;
      border-radius: 20px;
      color: #22262e;

      &:hover {
        background: rgba(3, 3, 3, 0.03);
      }
    }

    &._active {
      a {
        border: 1px solid rgba(151, 151, 151, 0.08);
        font-weight: bold;
        color: #11142d;
        background: rgba(255, 255, 255, 0.66);
      }
    }
  }

  @media all and (max-width: $screen_sm) {
    justify-content: flex-start;
  }
}

.theme_dark {
  .records-nav {
    .nav_item {
      a {
        color: #6f7684;

        &:hover {
          background-color: black;
        }
      }

      &._active {
        a {
          color: rgba(255, 255, 255, 0.8);
          background-color: #6f7684;
        }
      }
    }
  }
}
</style>

<template>
  <ul class="records-nav">
    <li v-for="item in navList"
        :key="item.value"
        class="nav_item"
        :class="{'_active': value === item.value}"
        @click="onClickItem(item)">
      <a :href="`#J_${item.value}`">{{ item.text }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IOption } from '~/constant/types'

const EVENTS = {
  input: 'input',
}

export const NavItem = {
  nft: 'nft',
  address: 'address',
  profile: 'profile',
  custom: 'custom_key',
}

export default defineComponent({
  name: 'RecordsNav',
  components: {},
  events: EVENTS,
  props: {
    value: {
      type: String,
      default: NavItem.nft,
    }
  },
  setup (props, { emit, root }) {
    const navList: IOption[] = [{
      value: NavItem.nft,
      text: root.$tt('NFTs')
    }, {
      value: NavItem.address,
      text: root.$tt('Crypto Address'),
    }, {
      value: NavItem.profile,
      text: root.$tt('Profile'),
    }, {
      value: NavItem.custom,
      text: root.$tt('Custom'),
    }]

    function onClickItem (item: IOption): void {
      emit(EVENTS.input, item.value)
    }

    return {
      navList,
      onClickItem,
    }
  }
}
)</script>
