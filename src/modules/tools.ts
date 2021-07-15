/**
 * strip '0x' prefix of hex string
 * @param {string} str
 * @returns {string}
 */
export function stripHexPrefix (str = ''): string {
  return str.startsWith('0x') ? str.slice(2) : str
}
