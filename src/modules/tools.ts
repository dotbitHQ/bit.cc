import GraphemeSplitter from 'grapheme-splitter'
import { DigitalEmojiUnifiedMap } from '~/constant'
import { Buffer } from 'buffer'
import BN from 'bn.js'
// @ts-ignore
import blake2b from 'blake2b'

/**
 * strip '0x' prefix of hex string
 * @param {string} str
 * @returns {string}
 */
export function stripHexPrefix (str = ''): string {
  return str.startsWith('0x') ? str.slice(2) : str
}

interface CollapseStringConfig {
  head: number,
  tail: number,
  maxLength: number,
  fill: string,
}

/**
 * 将一个长字符串（大于 maxLength，压缩成 xxxx...yyyy 结构的字符串）
 * @param inputString
 * @param headOrConfig
 * @param tail
 * @param maxLength
 * @param fill
 */
export function collapseString (inputString: string, headOrConfig: CollapseStringConfig | number = 4, tail = 4, maxLength = 12, fill = '...'): string {
  inputString = inputString || ''

  let head = 4
  if (typeof headOrConfig === 'number') {
    head = headOrConfig
  }
  else if (headOrConfig) {
    head = headOrConfig.head || 4
    tail = headOrConfig.tail || tail
    maxLength = headOrConfig.maxLength || maxLength
    fill = headOrConfig.fill || fill
  }

  if (inputString.length < head + tail) {
    return inputString
  }
  else if (inputString.length > maxLength) {
    return inputString.slice(0, head) + fill + inputString.slice(-tail)
  }
  else {
    return inputString
  }
}

/**
 * extract first letter of a string, taking Unicode into consideration
 * the basic idea is that we can leverage the fact that String#[@iterator] works with code points
 * @ref https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
 * @param first
 */
export function extractFirstLetter ([first]: string): string {
  return first
}

export function capitalizeFirstLetter ([first, ...rest]: string): string {
  return first.toLocaleUpperCase() + rest.join('')
}

/**
 * handles the mapping of digital emoji
 * @param str
 */
export function digitalEmojiUnifiedHandle (str: string): string {
  const splitter = new GraphemeSplitter()
  const split = splitter.splitGraphemes(str)
  const list = split.map((item) => {
    // @ts-ignore
    if (DigitalEmojiUnifiedMap[item]) {
      // @ts-ignore
      return DigitalEmojiUnifiedMap[item]
    }
    else {
      return item
    }
  })
  return list.join('')
}

/**
 * the account is converted to an NFT ID.
 * @param account
 */
export function dotbitToNftTokenId (account: string): string {
  const personal = Buffer.from('ckb-default-hash')
  const accountBuf = Buffer.from(account)
  const hasher = blake2b(32, null, null, personal)
  hasher.update(accountBuf)
  const hashBuffer = hasher.digest('binary') as Uint8Array
  const first20Bytes = Buffer.from(hashBuffer.slice(0, 20))
  const tokenId = new BN(first20Bytes.toString('hex'), 16).toString(10)
  return tokenId
}
