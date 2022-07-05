import { Ref, ref, watch } from '@nuxtjs/composition-api'
import { AccountData } from 'das-sdk'
import { AccountInfo } from '~/hooks/useAccount'
import { das, services } from '~/services'
import { JinseAsset } from '../../types/jinse'
import { OpenSeaAsset } from '../../types/opensea'
import { XdaiPoap } from '../../types/xdai.poap'
import { TreasurelandAsset } from '../../types/treasureland'
import { AirNFTsNft } from '../../types/airnfts'

export enum NFTProviderType {
  opensea,
  jinse,
  das,
  xdai,
  treasureland,
  airnfts
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
      // imageUrl: asset.animation_url || asset.image_url,
      imageUrl: asset.image_url,
      link: asset.permalink,
      providerType: NFTProviderType.opensea,
      price: asset.last_sale ? Number(asset.last_sale.total_price) / (Math.pow(10, asset.last_sale.payment_token.decimals)) : undefined,
      priceToken: asset.last_sale ? asset.last_sale.payment_token.symbol : undefined
    }
  }).filter(asset => asset.imageUrl)
}

function normalizeXdaiPoaps (poaps: XdaiPoap[]): NFT[] {
  return poaps.map(poap => {
    return {
      name: poap.event.name,
      imageUrl: poap.event.image_url,
      link: `https://app.poap.xyz/token/${poap.tokenId}`,
      providerType: NFTProviderType.xdai,
    }
  })
}

function normalizeJinseAssets (assets: JinseAsset[]): NFT[] {
  return assets.map(asset => {
    return {
      name: asset.class_name,
      imageUrl: `${asset.class_bg_image_url}?tid=${asset.n_token_id}`,
      link: `https://explorer.mibao.net/nft/${asset.class_uuid}`,
      providerType: NFTProviderType.jinse,
    }
  })
}

function normalizeDASAccounts (accounts: Array<{account: string}> = []): NFT[] {
  return accounts.map(account => {
    return {
      name: account.account,
      imageUrl: '',
      link: `https://data.did.id/${account.account}`,
      providerType: NFTProviderType.das,
    }
  })
}

function normalizeTreasurelandAssets (assets: TreasurelandAsset[]): NFT[] {
  return assets.map(asset => {
    let imageUrl = ''
    if (asset.resource_type === 'image') {
      if (asset.resource?.includes('https://')) {
        imageUrl = asset.resource
      }
      else if (asset.resource) {
        imageUrl = `https://d3ky2du9j9kl06.cloudfront.net/${asset.resource}`
      }
    }

    return {
      name: asset.name,
      imageUrl: imageUrl,
      link: asset.order_id ? `https://treasureland.market/assets/${asset.contract}/${asset.token_id}/${asset.order_id}?chain_id=${asset.chain_id}` : `https://treasureland.market/assets/${asset.contract}/${asset.token_id}?chain_id=${asset.chain_id}`,
      providerType: NFTProviderType.treasureland,
    }
  }).filter(asset => asset.imageUrl)
}

function normalizeAirNFTsAssets (assets: AirNFTsNft[]): NFT[] {
  return assets.map(asset => {
    return {
      name: asset.name,
      imageUrl: asset.image,
      link: asset.external_url,
      providerType: NFTProviderType.airnfts,
    }
  }).filter(asset => asset.imageUrl)
}

export function useNFT (account: Ref<AccountInfo>): {loading: Ref<boolean>, nfts: Ref<NFT[]>, fetchNFTs: Function} {
  const nfts = ref<NFT[]>([])
  const loading = ref(true)

  function fetchNFTs (): void {
    const ownerAddress = account.value.owner_address
    // const ckbAddressRecords = account.value.addresses.filter(record => record.key === 'address.ckb')

    // const ethAddressRecords = account.value.addresses.filter(record => record.key === 'address.eth')
    // for (const record of ethAddressRecords) {
    //   void services.getOpenseaAssets(record.value).then(res => {
    //     nfts.value = nfts.value.concat(normalizeOpenseaAssets(res.assets))
    //   })
    // }

    const openseaAssets = ref<NFT[]>([])
    const xdaiPoaps = ref<NFT[]>([])
    const treasurelandBSCAssets = ref<NFT[]>([])
    const treasurelandPolygonAssets = ref<NFT[]>([])
    const treasurelandETHAssets = ref<NFT[]>([])
    const treasurelandMoonriverAssets = ref<NFT[]>([])
    const treasurelandIotexAssets = ref<NFT[]>([])
    const airNFTsAssets = ref<NFT[]>([])
    const jinseAssets = ref<NFT[]>([])
    const dasAccounts = ref<NFT[]>([])

    watch([
      dasAccounts,
      openseaAssets,
      jinseAssets,
      xdaiPoaps,
      treasurelandBSCAssets,
      treasurelandPolygonAssets,
      treasurelandETHAssets,
      treasurelandMoonriverAssets,
      treasurelandIotexAssets,
      airNFTsAssets,
    ], () => {
      nfts.value = dasAccounts.value
        .concat(openseaAssets.value)
        .concat(jinseAssets.value)
        .concat(xdaiPoaps.value)
        .concat(treasurelandBSCAssets.value)
        .concat(treasurelandPolygonAssets.value)
        .concat(treasurelandETHAssets.value)
        .concat(treasurelandMoonriverAssets.value)
        .concat(treasurelandIotexAssets.value)
        .concat(airNFTsAssets.value)
    })

    if (account.value.owner_address_chain === 'eth') {
      void services.getOpenseaAssets(ownerAddress).then(res => {
        openseaAssets.value = normalizeOpenseaAssets(res.assets)
      })

      void services.getXdaiPoaps(ownerAddress).then(res => {
        xdaiPoaps.value = normalizeXdaiPoaps(res)
      })

      void services.getTreasurelandBscAssets(ownerAddress).then(res => {
        if (res?.data?.list?.length > 0) {
          treasurelandBSCAssets.value = normalizeTreasurelandAssets(res.data.list)
        }
      })

      void services.getTreasurelandPolygonAssets(ownerAddress).then(res => {
        if (res?.data?.list?.length > 0) {
          treasurelandPolygonAssets.value = normalizeTreasurelandAssets(res.data.list)
        }
      })

      void services.getTreasurelandETHAssets(ownerAddress).then(res => {
        if (res?.data?.list?.length > 0) {
          treasurelandETHAssets.value = normalizeTreasurelandAssets(res.data.list)
        }
      })

      void services.getTreasurelandMoonriverAssets(ownerAddress).then(res => {
        if (res?.data?.list?.length > 0) {
          treasurelandMoonriverAssets.value = normalizeTreasurelandAssets(res.data.list)
        }
      })

      void services.getTreasurelandIotexAssets(ownerAddress).then(res => {
        if (res?.data?.list?.length > 0) {
          treasurelandIotexAssets.value = normalizeTreasurelandAssets(res.data.list)
        }
      })

      void services.getAirNFTsAssets(ownerAddress).then(res => {
        if (res?.nfts?.length > 0) {
          airNFTsAssets.value = normalizeAirNFTsAssets(res.nfts)
        }
      })

      if (process.browser) {
        void import('@lay2/pw-core').then(async (PWCoreImported) => {
          const { Platform, Address, AddressType, Provider, PwCollector, default: PWCore } = PWCoreImported

          // only used as a placeholder for pw-core initialization
          class DummyProvider extends Provider {
            async init (): Promise<DummyProvider> {
              this.address = new Address(ownerAddress, AddressType.eth)
              return this
            }

            async sign (message: string): Promise<string> {
              return ''
            }

            close (): any {
              return this
            }
          }

          // PWCore need to initialized to use Address
          await new PWCore('https://mainnet.ckb.dev/').init(
            new DummyProvider(Platform.eth),
            new PwCollector('https://mainnet.ckb.dev/'),
          )

          const ethAddressForPW = new Address(ownerAddress, AddressType.eth).toCKBAddress()

          void services.getJinseAssets(ethAddressForPW).then((res) => {
            jinseAssets.value = normalizeJinseAssets(res)
          })
        })
      }
    }

    const addressChain2CoinType = {
      tron: '195',
      eth: '60',
    }
    const coinType = (addressChain2CoinType as any)[account.value.owner_address_chain]

    void das.accountsForOwner(ownerAddress, coinType).then(res => {
      dasAccounts.value = normalizeDASAccounts(res)
    })
  }

  return {
    loading,
    nfts,
    fetchNFTs
  }
}
