<style lang="scss">
@import "src/assets/variables";

.records-nav {
  display: flex;
  justify-content: center;
  overflow: auto;
  background: rgba(126, 126, 126, 0.2);
  border-radius: 12px;
  padding: 4px 2px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }

  .nav_item {
    flex: 1;

    a {
      display: block;
      margin: 0 2px;
      padding: 8px 12px;
      font-size: 14px;
      line-height: 16px;
      white-space: nowrap;
      border-radius: 8px;
      color: #2F3238;
      text-align: center;

      &:hover {
        background: rgba(3, 3, 3, 0.03);
      }
    }

    &._active {
      a {
        box-shadow: 0px 1px 1px 0px rgb(24 33 77 / 10%);
        font-weight: bold;
        color: #11142d;
        background: #FFFFFF;
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
        color: #7C7F84;

        &:hover {
          background: rgba(126, 126, 126, 0.2);
        }
      }

      &._active {
        a {
          color: #FFFFFF;
          background-color: rgba(126, 126, 126, 0.5);
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
      text: root.$tt('Addresses'),
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
