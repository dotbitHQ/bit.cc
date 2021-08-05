import { Ref, ref } from '@nuxtjs/composition-api'
import { AccountInfo } from '~/hooks/useAccount'
import { Services } from '~/services'
import { OpenSeaAsset } from '../../types/opensea'

export enum NFTProviderType {
  opensea,
  mibao,
  das,
}

export interface NFT {
  name: string,
  imageUrl: string,
  link: string,
  providerType: NFTProviderType,
  price?: number,
  priceToken?: string,
}

function normalizeOpenseaAssets (assets: OpenSeaAsset[]): NFT[] {
  return assets.map(asset => {
    return {
      name: asset.name,
      imageUrl: asset.image_url,
      link: asset.permalink,
      providerType: NFTProviderType.opensea,
    }
  }).filter(asset => asset.imageUrl)
}

export function useNFT (account: AccountInfo) {
  const nfts = ref<NFT[]>([])
  const loading = ref(true)

  async function fetchNFTs (): Promise<void> {
    const fetchOpensea = new Services().getOpenseaAssets('').then(res => {
      nfts.value = nfts.value.concat(normalizeOpenseaAssets(res.assets))
    })
  }

  return {
    loading,
    nfts,
    fetchNFTs
  }
}
