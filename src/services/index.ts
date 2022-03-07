import DasSDK from 'das-sdk'
import Web3Utils from 'web3-utils'
import { BasicService } from '~/services/BasicService'
import { JinseAsset } from '../../types/jinse'
import { OpenSeaAsset } from '../../types/opensea'
import { XdaiPoap } from '../../types/xdai.poap'
import { Treasureland } from '../../types/treasureland'
import { CHAIN_ID } from '~/constant'
import { AirNFTs } from '../../types/airnfts'

// for simple app, service can all be placed under BasicService
export class Services extends BasicService {
  // for complicated app, other service goes here
  // other = new OtherService()

  /**
   * get opensea assets for address
   * @param owner eth address
   * @doc https://docs.opensea.io/reference/getting-assets
   */
  getOpenseaAssets (owner: string): Promise<{ assets: OpenSeaAsset[] }> {
    return this.axios.get('https://api.opensea.io/api/v1/assets', {
      headers: {
        'x-api-key': 'f12d1e8b7b7f4aa585182333858b7177', // borrowed from cyber connect
      },
      params: {
        owner,
        order_direction: 'desc',
        offset: 0,
        limit: 50, // maximum 50
      }
    })
  }

  /**
   * get xDai POAP assets for address
   * @param owner eth address
   * @doc https://app.poap.xyz
   */
  getXdaiPoaps (owner: string): Promise<XdaiPoap[]> {
    return this.axios.get(`https://api.poap.xyz/actions/scan/${owner}`)
  }

  /**
   * get Treasureland BSC assets for address
   * @param owner eth address
   * @doc https://docs.treasureland.market/api-reference/retrieve-nft-collections
   */
  getTreasurelandBscAssets (owner: string): Promise<Treasureland> {
    return this.axios.get('https://api.treasureland.market/v1/account/assets', {
      params: {
        owner: owner,
        chain_id: CHAIN_ID.bsc,
        page_no: 1,
        page_size: 100,
      }
    })
  }

  /**
   * get Treasureland Polygon assets for address
   * @param owner eth address
   * @doc https://docs.treasureland.market/api-reference/retrieve-nft-collections
   */
  getTreasurelandPolygonAssets (owner: string): Promise<Treasureland> {
    return this.axios.get('https://api.treasureland.market/v1/account/assets', {
      params: {
        owner: owner,
        chain_id: CHAIN_ID.polygon,
        page_no: 1,
        page_size: 100,
      }
    })
  }

  /**
   * get Treasureland ETH assets for address
   * @param owner eth address
   * @doc https://docs.treasureland.market/api-reference/retrieve-nft-collections
   */
  getTreasurelandETHAssets (owner: string): Promise<Treasureland> {
    return this.axios.get('https://api.treasureland.market/v1/account/assets', {
      params: {
        owner: owner,
        chain_id: CHAIN_ID.eth,
        page_no: 1,
        page_size: 100,
      }
    })
  }

  /**
   * get Treasureland Moonriver assets for address
   * @param owner eth address
   * @doc https://docs.treasureland.market/api-reference/retrieve-nft-collections
   */
  getTreasurelandMoonriverAssets (owner: string): Promise<Treasureland> {
    return this.axios.get('https://api.treasureland.market/v1/account/assets', {
      params: {
        owner: owner,
        chain_id: CHAIN_ID.moonriver,
        page_no: 1,
        page_size: 100,
      }
    })
  }

  /**
   * get Treasureland Iotex assets for address
   * @param owner eth address
   * @doc https://docs.treasureland.market/api-reference/retrieve-nft-collections
   */
  getTreasurelandIotexAssets (owner: string): Promise<Treasureland> {
    return this.axios.get('https://api.treasureland.market/v1/account/assets', {
      params: {
        owner: owner,
        chain_id: CHAIN_ID.iotex,
        page_no: 1,
        page_size: 100,
      }
    })
  }

  /**
   * get AirNFTs assets for address
   * @param owner eth address
   * @doc https://api.airnfts.com/v1/users/0xa0b96533FEdDc37Cd46ED9c9f587073F8E678e32/nfts/simple
   */
  getAirNFTsAssets (owner: string): Promise<AirNFTs> {
    owner = Web3Utils.toChecksumAddress(owner)
    return this.axios.get(`https://api.airnfts.com/v1/users/${owner}/nfts/simple?page=1&limit=200`)
  }

  getJinseAssets (address: string): Promise<JinseAsset[]> {
    return this.axios.get(`/mibao/holder_tokens/${address}`)
  }
}

export const services = new Services()

export const das = new DasSDK({
  url: 'https://indexer.da.systems',
})
