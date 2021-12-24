import { Ref, ref } from '@nuxtjs/composition-api'
import { AccountData } from 'das-sdk'
import { AccountInfo } from '~/hooks/useAccount'
import { das, services } from '~/services'
import { JinseAsset } from '../../types/jinse'
import { OpenSeaAsset } from '../../types/opensea'
import { XdaiPoap } from '../../types/xdai.poap'

export enum NFTProviderType {
  opensea,
  jinse,
  das,
  xdai
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
      imageUrl: asset.class_bg_image_url,
      link: `https://explorer.mibao.net/nft/${asset.class_uuid}`,
      providerType: NFTProviderType.jinse,
    }
  })
}

function normalizeDASAccounts (accounts: AccountData[]): NFT[] {
  return accounts.map(account => {
    return {
      name: account.account,
      imageUrl: '',
      link: window.location.host.includes('bit.cc') ? `https://${account.account}.cc` : `https://${account.account}.host`,
      providerType: NFTProviderType.das,
    }
  })
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

    let openseaAssets: NFT[] = []
    let xdaiPoaps: NFT[] = []
    let jinseAssets: NFT[] = []
    let dasAccounts: NFT[] = []

    if (account.value.owner_address_chain === 'eth') {
      void services.getOpenseaAssets(ownerAddress).then(res => {
        openseaAssets = normalizeOpenseaAssets(res.assets)

        nfts.value = xdaiPoaps.concat(dasAccounts).concat(openseaAssets).concat(jinseAssets)
      })

      void services.getXdaiPoaps(ownerAddress).then(res => {
        xdaiPoaps = normalizeXdaiPoaps(res)
        nfts.value = xdaiPoaps.concat(dasAccounts).concat(openseaAssets).concat(jinseAssets)
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
            jinseAssets = normalizeJinseAssets(res)
            nfts.value = xdaiPoaps.concat(dasAccounts).concat(openseaAssets).concat(jinseAssets)
          })
        })
      }
    }

    void das.accountsForOwner(ownerAddress).then(res => {
      dasAccounts = normalizeDASAccounts(res)
      nfts.value = xdaiPoaps.concat(dasAccounts).concat(openseaAssets).concat(jinseAssets)
    })
  }

  return {
    loading,
    nfts,
    fetchNFTs
  }
}
