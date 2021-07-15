import Axios, { AxiosInstance } from 'axios'
import config from '~/config'
import { commonRequestInterceptor, commonResponseInterceptor } from '~/services/interceptors'

export class BasicService {
  axios: AxiosInstance

  constructor () {
    this.axios = Axios.create({
      baseURL: config.apiOrigin + '/api'
    })

    this.axios.interceptors.request.use(commonRequestInterceptor)
    this.axios.interceptors.response.use(commonResponseInterceptor)
  }
}
