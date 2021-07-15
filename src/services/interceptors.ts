import { AxiosResponse } from 'axios'
export const commonRequestInterceptor = function (config: any) {
  // config.headers.Timestamp = Math.floor(Date.now() / 1000)
  return config
}

export const commonResponseInterceptor = function (res: AxiosResponse) {
  return res.data
}
