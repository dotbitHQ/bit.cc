<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <v-card>
        <v-card-title class="headline">
        </v-card-title>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo,
  },
  computed: {
    ...mapState(['config'])
  },
  async mounted () {
    // const ret = await this.$backend.ABCService.getTokens()
  }
}
</script>
