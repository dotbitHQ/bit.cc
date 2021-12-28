export interface AirNFTs {
  meta: AirNFTsMeta,
  nfts: AirNFTsNft[],
}

export interface AirNFTsMeta {
  currentPage: number,
  totalPages: number,
  totalNfts: number,
}

export interface AirNFTsNft {
  id: string,
  external_url: string,
  baseID: string,
  creatorAddress: string,
  ownerAddress: string,
  tokenID: string,
  name: string,
  attributes: AirNFTsNftAttribute[],
  description: string,
  category: string,
  image: string,
  animation_url: null | string,
  price: number,
  createdAt: string,
}

export interface AirNFTsNftAttribute {
  value: number,
  trait_type: string,
}
