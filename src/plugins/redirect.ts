import { Context } from '@nuxt/types'
import { onGlobalSetup, provide } from '@nuxtjs/composition-api'
import { resolveAccountFromUrl } from '~/modules/das'

export const INJECTED_BITCC_ACCOUNT = 'INJECTED_BITCC_ACCOUNT'

export default function redirectPlugin (context: Context): void {
  onGlobalSetup(() => {
    let url

    if (process.server) {
      if (context.isDev) {
        url = `https://bit.cc${context.req.url || ''}`
      }
      else {
        url = `https://${context.req.headers.host || ''}/${context.req.url || ''}`
      }
    }
    else {
      url = window.location.href
    }

    const { account, domain, fromHost, isPunyCode, redirectTo } = resolveAccountFromUrl(url)

    if (redirectTo) {
      context.redirect(redirectTo)
    }

    provide(INJECTED_BITCC_ACCOUNT, account)
  })
}
