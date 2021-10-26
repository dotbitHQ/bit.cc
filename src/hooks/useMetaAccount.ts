import { useMeta } from '@nuxtjs/composition-api'
import { AccountInfo } from '~/hooks/useAccount'
import { socialMeta } from '~/modules/social-media'

export function useMetaAccount (account: AccountInfo, url: string): void {
  // @ts-expect-error
  useMeta(() => {
    const title = `${account.account} - Share your crypto identity`
    const img = `https://identicons.da.systems/seo/${account.account}`
    const icon = `https://identicons.da.systems/identicon/${account.account}`
    // const icon = 'https://phone.bit.cc/favicon.png'
    return {
      title,
      meta: socialMeta({
        url,
        title,
        site_name: title,
        description: account.description || 'Welcome to My DAS planet, the most decentralized bio systems',
        img,
        twitter: '@realDASystems',
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
