import {
  stripHexPrefix
} from '~/modules/tools'

describe('stripHexPrefix', () => {
  test('with0x', () => {
    const stringWithHex = '0x123'
    expect(stripHexPrefix(stringWithHex)).toEqual('123')
  })
  test('without0x', () => {
    const stringWithHex = '123'
    expect(stripHexPrefix(stringWithHex)).toEqual('123')
  })
})
