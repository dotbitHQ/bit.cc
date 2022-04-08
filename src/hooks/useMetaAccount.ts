import { useMeta } from '@nuxtjs/composition-api'
import { AccountInfo } from '~/hooks/useAccount'
import { socialMeta } from '~/modules/social-media'

export function useMetaAccount (account: AccountInfo, url: string): void {
  // @ts-expect-error
  useMeta(() => {
    const title = `${account.account} - My decentralized identity`
    const img = `https://identicons.did.id/seo/${account.account}`
    const icon = `https://identicons.did.id/identicon/${account.account}`
    // const icon = 'https://phone.bit.cc/favicon.png'
    return {
      title,
      meta: socialMeta({
        url,
        title,
        site_name: title,
        description: account.description || "Welcome to my .bit planet. Let's see some amazing NFTs!",
        img,
        twitter: '@dotbitHQ',
        twitter_card: 'summary_large_image',
        theme_color: '#000000',
      }),
      link: [{
        hid: 'apple-touch-icon',
        rel: 'apple-touch-icon',
        href: icon,
      }, {
        hid: 'favicon',
        rel: 'icon',
        type: 'image/png',
        href: icon,
      }]
    }
  })
}
