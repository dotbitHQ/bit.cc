import { Services } from '~/services'

declare module 'vuex/types/index' {
  interface Store<S> {
    $service: Services,
  }
}
