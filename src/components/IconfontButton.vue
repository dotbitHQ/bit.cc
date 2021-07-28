<style lang="scss">
.iconfont-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color ease 400ms;

  .button_message {
    $color: #424a5c;

    display: none;
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    color: #fff;
    background: $color;
    text-shadow: 0 20px 16px rgba(43, 54, 77, 0.16);
    box-shadow: 0 20px 16px 0 rgba(43, 54, 77, 0.16);

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%) rotateZ(45deg);
      height: 8px;
      width: 8px;
      background-color: $color;
    }
  }

  &:hover {
    background: rgba(3, 3, 3, 0.2);

    .button_message {
      display: inline-block;
    }
  }

  &:active {
    background: rgba(3, 3, 3, 0.4);
  }
}
</style>

<template>
  <span class="iconfont-button">
    <span v-if="message" class="button_message">{{ message }}</span>

    <slot />
  </span>
</template>

<script>

export default {
  name: 'IconfontButton',
  components: {},
  props: {
    message: {
      type: String,
      default: '',
    }
  },
  data () {
    return {}
  },
}
</script>
