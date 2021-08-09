import { Ref, ref } from '@nuxtjs/composition-api'
import { AccountInfo } from '~/hooks/useAccount'
import { services } from '~/services'
import { JinseAsset } from '../../types/jinse'
import { OpenSeaAsset } from '../../types/opensea'

export enum NFTProviderType {
  opensea,
  jinse,
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

function normalizeJinseAssets (assets: JinseAsset[]): NFT[] {
  return assets.map(asset => {
    return {
      name: asset.class_name,
      imageUrl: asset.class_bg_image_url,
      link: `https://explorer.jinse.cc/nft/${asset.token_uuid}`,
      providerType: NFTProviderType.jinse,
    }
  })
}

export function useNFT (account: Ref<AccountInfo>): {loading: Ref<boolean>, nfts: Ref<NFT[]>, fetchNFTs: Function} {
  const nfts = ref<NFT[]>([])
  const loading = ref(true)

  function fetchNFTs (): void {
    const ethAddressRecords = account.value.addresses.filter(record => record.key === 'address.eth')
    const ckbAddressRecords = account.value.addresses.filter(record => record.key === 'address.ckb')

    for (const record of ethAddressRecords) {
      void services.getOpenseaAssets(record.value).then(res => {
        nfts.value = nfts.value.concat(normalizeOpenseaAssets(res.assets))
      })
    }

    for (const record of ckbAddressRecords) {
      void services.getJinseAssets(record.value).then(res => {
        nfts.value = nfts.value.concat(normalizeJinseAssets(res))
      })
    }
  }

  return {
    loading,
    nfts,
    fetchNFTs
  }
}
