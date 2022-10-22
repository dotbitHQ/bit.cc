import uts46 from 'idna-uts46-hx'
import UrlParse from 'url-parse'
import { digitalEmojiUnifiedHandle } from '~/modules/tools'
import { BitAccountRecord } from 'dotbit/lib/fetchers/BitIndexer.type'

export interface ResolveResult {
  account: string, // xxx.bit
  domain: string, // abc.xyz.com => xyz.com
  fromHost: boolean,
  isPunyCode: boolean,
  redirectTo: string,
  url: string,
}

export function resolveAccountFromUrl (url: string): ResolveResult {
  const parsed = UrlParse(url)

  let fromHost: boolean
  let account: string
  let isPunyCode = false
  let redirectTo = ''

  const domain = parsed.hostname.match(/bit\.cc$/) ? 'bit.cc' : 'bit.host'

  if (parsed.hostname === 'bit.cc' || parsed.hostname === 'bit.host') {
    fromHost = false
    const accountBit = decodeURIComponent(parsed.pathname.split('/')[1]) // '/das.bit/aabbcc' => ['', 'das.bit', 'aabbcc']

    if (accountBit.match(/\.bit$/)) {
      account = digitalEmojiUnifiedHandle(accountBit)
    }
    else if (!accountBit) {
      account = ''
    }
    else {
      throw new Error(`Resolve account from url failed: ${url}`)
    }
  }
  else {
    fromHost = true
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const accountSplitList = parsed.hostname.split('.')
    if (accountSplitList.length === 4) {
      account = accountSplitList[0] + '.' + accountSplitList[1]
    }
    else {
      account = accountSplitList.shift() || ''
    }

    if (account.match(/^xn--/)) {
      isPunyCode = true

      account = digitalEmojiUnifiedHandle(uts46.toUnicode(account))

      redirectTo = `https://${domain}/${account}.bit`
    }

    account = digitalEmojiUnifiedHandle(account) + '.bit'
  }

  return {
    account,
    isPunyCode,
    fromHost,
    domain,
    redirectTo,
    url,
  }
}

export function buildProfileUrl<T extends Pick<BitAccountRecord, 'value'|'key'>> (record: T): string {
  if (record.value.match(/https?:\/\//)) {
    return record.value
  }
  if (record.key === 'profile.twitter') {
    return `https://twitter.com/${record.value.replace(/^@/, '')}`
  }
  if (record.key === 'profile.facebook') {
    return `https://www.facebook.com/${record.value}`
  }
  if (record.key === 'profile.reddit') {
    return `https://www.reddit.com/user/${record.value}`
  }
  if (record.key === 'profile.bilibili') {
    return `https://space.bilibili.com/${record.value}`
  }
  if (record.key === 'profile.github') {
    return `https://github.com/${record.value}`
  }
  if (record.key === 'profile.mirror') {
    return `https://mirror.xyz/${record.value}`
  }
  if (record.key === 'profile.medium') {
    return `https://medium.com/@${record.value}`
  }
  if (record.key === 'profile.website') {
    return record.value.indexOf('http') === 0 ? record.value : `http://${record.value}`
  }
  if (record.key === 'address.eth') {
    return `https://etherscan.io/address/${record.value}`
  }
  if (record.key === 'address.ckb') {
    return `https://explorer.nervos.org/address/${record.value}`
  }
  if (record.key === 'address.btc') {
    return `https://explorer.viawallet.com/btc/address/${record.value}`
  }
  if (record.key === 'address.trx') {
    return `https://tronscan.org/#/address/${record.value}`
  }
  return record.value
}
