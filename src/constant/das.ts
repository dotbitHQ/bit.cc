export const enum DasRecordType {
  address = 'address',
  profile = 'profile',
  custom = 'custom',
}

export interface IDasRecord {
  key: string, // address.btc
  type: DasRecordType, // address
  name: string, // BTC
  label: string,
  value: string,
  ttl: string,
}
