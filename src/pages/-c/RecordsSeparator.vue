<style lang="scss">
@import "src/assets/variables";

.records-separator {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 6%;

  .separator {
    &._dark {
      display: none;
    }
  }
}

.theme_dark {
  .records-separator {
    .separator {
      &._dark {
        display: flex;
      }

      &._light {
        display: none;
      }
    }
  }
}
</style>

<template>
  <div class="records-separator">
    <img class="separator _dark" src="imgs/separator-dark.svg" alt="">
    <img class="separator _light" src="imgs/separator-light.svg" alt="">
  </div>
</template>

<script>

export default {
  name: 'RecordsSeparator',
  components: {},
  data () {
    return {}
  },
}
</script>
