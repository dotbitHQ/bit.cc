import { Context } from '@nuxt/types'
import { Services } from '~/services'

export default function ({ store }: Context, inject: (key: string, value: any) => void) {
  inject('service', new Services())
}
