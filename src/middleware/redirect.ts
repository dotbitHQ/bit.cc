import { Context } from '@nuxt/types'
import { resolveAccountFromUrl } from '~/modules/das'

export default function redirectMiddleware (context: Context): void {
  const { account, domain, fromHost, isPunyCode, redirectTo } = resolveAccountFromUrl(window.location.href)

  if (redirectTo) {
    window.location.href = redirectTo
  }
}
