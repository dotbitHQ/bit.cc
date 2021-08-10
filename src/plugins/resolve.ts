import { Context } from '@nuxt/types'
import { onGlobalSetup, provide } from '@nuxtjs/composition-api'
import { resolveAccountFromUrl } from '~/modules/das'

export const INJECTED_BITCC_ACCOUNT = 'INJECTED_BITCC_ACCOUNT'

export default function redirectPlugin (context: Context): void {
  // only apply to DAS account page
  if (context.route.name === 'ACCOUNT_BIT') {
    onGlobalSetup(() => {
      let url

      if (process.server) {
        if (context.isDev) {
          url = `https://bit.cc${context.req.url || ''}`
        }
        else {
          url = `https://${context.req.headers.host || ''}${context.req.url || ''}`
        }
      }
      else {
        url = window.location.href
      }

      console.log(url)

      const result = resolveAccountFromUrl(url)

      if (result.redirectTo) {
        context.redirect(result.redirectTo)
      }

      provide(INJECTED_BITCC_ACCOUNT, result)
    })

    if (process.server) {
      context.res.setHeader('cache-control', 'max-age=60, s-maxage=60, public')
    }
  }
}
