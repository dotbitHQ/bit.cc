import { createInstance } from 'dotbit'
import Web3Utils from 'web3-utils'
import { CHAIN_ID } from '~/constant'
import { BasicService } from '~/services/BasicService'
import { AirNFTs } from '../../types/airnfts'
import { JinseAsset } from '../../types/jinse'
import { OpenSeaAsset } from '../../types/opensea'
import { Treasureland } from '../../types/treasureland'
import { XdaiPoap } from '../../types/xdai.poap'
import { KoloAssets } from '../../types/kolo'

// for simple app, service can all be placed under BasicService
export class Services extends BasicService {
  // for complicated app, other service goes here
  // other = new OtherService()

  // @ts-expect-error
  async runOpenSeaTasks (tasks: Array<() => Promise<{ assets: OpenSeaAsset[] }>>): Promise<{ assets: OpenSeaAsset[] }> {
    for (let i = 0; i < tasks.length; i++) {
      try {
        const task = tasks[i]

        return await task()
      }
      catch (e) {
        console.log('Opensea: Running next task', i)
      }
    }
  }

  /**
   * get opensea assets for address
   * @param owner eth address
   * @doc https://docs.opensea.io/reference/getting-assets
   */
  getOpenseaAssets (owner: string): Promise<{ assets: OpenSeaAsset[] }> {
    return this.runOpenSeaTasks([
      this._getOpenseaAssetsTask(owner, '2065401f46a84c019b3945684dbfa278'), // borrowed from https://github.com/Amad-Ahmed/NFT-marketplace/blob/53ff7d7cb9f3df1c16c4b39490989ae93de0a7d1/app/Http/Controllers/ActivityController.php#L16
      this._getOpenseaAssetsTask(owner, '29930174fbb94c91bd30a31e79153922'), // borrowed from https://github.com/node777/playsk8/blob/7b74269cb495adcfd9697ad46ed1fffb67a9f7c9/www/scripts/play.js#L38
      this._getOpenseaAssetsTask(owner, '4714cd73a39041bf9cffda161163f8a5'), // borrowed from https://github.com/mobile1st/sudocoins-svc/blob/30604184f2222b6058883fdc58be185e13d3b867/src/art/chat/add_chat.py#L158
    ])
  }

  _getOpenseaAssetsTask (owner: string, apiKey: string): () => Promise<{ assets: OpenSeaAsset[] }> {
    return () => this.axios.get('https://api.opensea.io/api/v1/assets', {
      headers: {
        'x-api-key': apiKey,
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

  /**
   * get Kolo assets for address
   * @param owner eth address
   * @doc https://api.airnfts.com/v1/users/0xa0b96533FEdDc37Cd46ED9c9f587073F8E678e32/nfts/simple
   */
  getKoloAssets (owner: string): Promise<any> {
    owner = Web3Utils.toChecksumAddress(owner)
    return this.axios.get(`https://www.kolo.market/api/outer/nftinfo/0x81a5788a4b635f6d5ead3d9d7b447967d8b2d30a`)
  }
}

export const services = new Services()

export const dotbit = createInstance()
