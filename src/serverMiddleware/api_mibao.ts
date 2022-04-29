import config from 'config'
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { NextFunction, Request, Response } from 'express'
import { createHmac } from 'crypto'
import { JinseAssetsRes } from '../../types/jinse'

function mibaoAuthInterceptor (axiosRequestConfig: AxiosRequestConfig): AxiosRequestConfig {
  const key: string = (config as any).jinse.key
  const secret = (config as any).jinse.secret
  const date = new Date().toUTCString()

  const plaintext = [
    axiosRequestConfig.method?.toUpperCase(),
    axiosRequestConfig.url,
    '',
    'application/json',
    date
  ].join('\n')

  const signature = createHmac('sha1', secret).update(plaintext).digest('base64')

  const authorization = 'NFT ' + key + ':' + signature

  Object.assign(axiosRequestConfig.headers, {
    'content-md5': '',
    'content-type': 'application/json',
    date: date,
    authorization: authorization,
  })

  return axiosRequestConfig
}

const axios = Axios.create({
  baseURL: 'https://goldenlegend.nervina.cn',
})

axios.interceptors.request.use(mibaoAuthInterceptor)

function getJinseAssets (address: string): Promise<AxiosResponse<JinseAssetsRes>> {
  return axios.get(`/api/v1/indexer/holder_tokens/${address}`)
}

export default {
  path: '/api/mibao/holder_tokens/',
  async handler (req: Request, res: Response, next: NextFunction) {
    try {
      const ckbAddress = req.url.split('/')[1]

      if (ckbAddress.match(/(ckb|ckt)1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{42,}/)) {
        const tokenList = (await getJinseAssets(ckbAddress)).data.token_list
        res.end(JSON.stringify(tokenList))
      }
      else {
        res.end(JSON.stringify([]))
      }
    }
    catch (err) {
      next(err)
      console.error(req.url, err)
      return
    }

    next()
  }
}
