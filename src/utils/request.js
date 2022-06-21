import axios from 'axios'
import store from '@/stores'
import { getToken } from '@/utils/auth'

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL

// create an axios instance
const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: process.env.VUE_APP_API_TIMEOUT || 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    if (store.getters.language) {
      config.headers['Accept-Language'] = store.getters.language
      config.headers['locale'] = store.getters.language
    }

    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line space-before-function-paren
  async (error) => {
    return Promise.reject(error)
  }
)

export default service
