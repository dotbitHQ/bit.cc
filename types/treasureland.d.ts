export interface Treasureland {
  code: number,
  message: string,
  data: TreasurelandAssets,
}

export interface TreasurelandAssets {
  list: TreasurelandAsset[],
  dataCount: number,
  pageSize: number,
  pageNo: number,
}

export interface TreasurelandAsset {
  chain_id: number,
  contract: string,
  token_id: string,
  owner: string,
  name: string,
  resource: string,
  resource_type: string,
  token_uri: string,
  collect_name: string,
  erc_type: string,
  price: string,
  on_sale: boolean,
  order_id: number,
  amount: string,
  thumb: string,
}
