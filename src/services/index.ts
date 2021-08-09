import DasSDK from '_das-sdk@0.4.1@das-sdk'
import { BasicService } from '~/services/BasicService'
import { JinseAsset } from '../../types/jinse'
import { OpenSeaAsset } from '../../types/opensea'

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
      params: {
        owner,
        order_direction: 'desc',
        offset: 0,
        limit: 50, // maximum 50
        // 'X-API-KEY': '',
      }
    })
  }

  getJinseAssets (address: string): Promise<JinseAsset[]> {
    return this.axios.get(`/mibao/holder_tokens/${address}`)
  }
}

export const services = new Services()

export const das = new DasSDK({
  url: 'https://indexer.da.systems',
})
