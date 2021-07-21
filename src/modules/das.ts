import UrlParse from 'url-parse'
import uts46 from 'idna-uts46-hx'

interface ResolveResult {
  account: string, // xxx.bit
  domain: string, // abc.xyz.com => xyz.com
  fromHost: boolean,
  isPunyCode: boolean,
  redirectTo: string,
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
      account = accountBit
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
    account = parsed.hostname.split('.').shift() || ''

    if (account.match(/^xn--/)) {
      isPunyCode = true

      account = uts46.toUnicode(account)

      redirectTo = `https://${domain}/${account}.bit`
    }

    account = account + '.bit'
  }

  return {
    account,
    isPunyCode,
    fromHost,
    domain,
    redirectTo,
  }
}
