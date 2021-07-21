import { resolveAccountFromUrl } from '~/modules/das'

describe('extractAccountFromUrl()', () => {
  test('das.bit.cc', () => {
    const url = 'https://das.bit.cc'
    const { account, domain, fromHost, isPunyCode } = resolveAccountFromUrl(url)

    expect(account).toEqual('das.bit')
    expect(domain).toEqual('bit.cc')
    expect(fromHost).toBe(true)
    expect(isPunyCode).toBe(false)
  })

  test('das.bit.host', () => {
    const url = 'https://das.bit.host'
    const { domain } = resolveAccountFromUrl(url)

    expect(domain).toBe('bit.host')
  })

  test('🦄.bit.cc', () => {
    const url = 'https://xn--3s9h.bit.cc' // 🦄.bit.cc
    const { account, fromHost, isPunyCode, redirectTo } = resolveAccountFromUrl(url)

    expect(account).toBe('🦄.bit')
    expect(fromHost).toBe(true)
    expect(isPunyCode).toBe(true)
    expect(redirectTo).toBe('https://bit.cc/🦄.bit')
  })

  test('bit.cc/das.bit', () => {
    const url = 'https://bit.cc/das.bit'
    const { account, fromHost, domain } = resolveAccountFromUrl(url)

    expect(account).toBe('das.bit')
    expect(domain).toBe('bit.cc')
    expect(fromHost).toBe(false)
  })

  test('bit.cc/🦄.bit', () => {
    const encodedAccount = encodeURIComponent('🦄.bit')
    const url = `https://bit.cc/${encodedAccount}`
    const { account, fromHost, domain, isPunyCode } = resolveAccountFromUrl(url)

    expect(account).toBe('🦄.bit')
    expect(domain).toBe('bit.cc')
    expect(fromHost).toBe(false)
    expect(isPunyCode).toBe(false)
  })

  test('bit.cc/🦄.bit?utm_source=google', () => {
    const encodedAccount = encodeURIComponent('🦄.bit')
    const url = `https://bit.cc/${encodedAccount}`
    const { account, fromHost, domain, isPunyCode, redirectTo } = resolveAccountFromUrl(url)

    expect(account).toBe('🦄.bit')
    expect(domain).toBe('bit.cc')
    expect(fromHost).toBe(false)
    expect(isPunyCode).toBe(false)
    expect(redirectTo).toBe('')
  })
})
