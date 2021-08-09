import { Ref, ref } from '@nuxtjs/composition-api'
import { AccountData } from 'das-sdk'
import { AccountInfo } from '~/hooks/useAccount'
import { das, services } from '~/services'
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
      price: asset.last_sale ? Number(asset.last_sale.total_price) / (Math.pow(10, asset.last_sale.payment_token.decimals)) : undefined,
      priceToken: asset.last_sale ? asset.last_sale.payment_token.symbol : undefined
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

function normalizeDASAccounts (accounts: AccountData[]): NFT[] {
  return accounts.map(account => {
    return {
      name: account.account,
      imageUrl: '',
      link: `https://${account.account}.bit.cc`,
      providerType: NFTProviderType.das,
    }
  })
}

export function useNFT (account: Ref<AccountInfo>): {loading: Ref<boolean>, nfts: Ref<NFT[]>, fetchNFTs: Function} {
  const nfts = ref<NFT[]>([])
  const loading = ref(true)

  function fetchNFTs (): void {
    const ownerAddress = account.value.owner_address
    const ckbAddressRecords = account.value.addresses.filter(record => record.key === 'address.ckb')

    const ethAddressRecords = account.value.addresses.filter(record => record.key === 'address.eth')
    for (const record of ethAddressRecords) {
      void services.getOpenseaAssets(record.value).then(res => {
        nfts.value = nfts.value.concat(normalizeOpenseaAssets(res.assets))
      })
    }

    // if (account.value.owner_address_chain === 'ETH') {
    //   void services.getOpenseaAssets(ownerAddress).then(res => {
    //     nfts.value = nfts.value.concat(normalizeOpenseaAssets(res.assets))
    //   })
    // }

    for (const record of ckbAddressRecords) {
      void services.getJinseAssets(record.value).then(res => {
        nfts.value = nfts.value.concat(normalizeJinseAssets(res))
      })
    }

    void das.accountsForOwner(ownerAddress).then(res => {
      nfts.value = nfts.value.concat(normalizeDASAccounts(res))
    })
  }

  return {
    loading,
    nfts,
    fetchNFTs
  }
}
