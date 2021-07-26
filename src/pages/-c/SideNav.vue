<style lang="scss">
.side-nav {
  .nav_item {
    font-size: 14px;
    line-height: 2;
    color: rgba(65, 67, 87, 0.4);

    &._active {
      color: black;
    }

    a {
      color: inherit;
    }
  }
}
</style>

<template>
  <ul class="side-nav">
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
  overview: 'overview',
  address: 'address',
  profile: 'profile',
  custom: 'custom_key',
}

export default defineComponent({
  name: 'SideNav',
  components: {},
  events: EVENTS,
  props: {
    value: {
      type: String,
      default: NavItem.overview,
    }
  },
  setup (props, { emit, root }) {
    const navList: IOption<string>[] = [{
      value: NavItem.overview,
      text: root.$tt('Overview'),
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
