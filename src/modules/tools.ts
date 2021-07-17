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
