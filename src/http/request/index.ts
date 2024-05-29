import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { message } from 'antd'
import { clearUserInfo, getTokenAccess, getUserInfo, setUserInfo } from '@/utils/token'

class NRequest {
  protected instance: AxiosInstance | null = null
  protected BASE_URL: string | undefined

  constructor(config: AxiosRequestConfig, prefix: string = '') {
    const { baseURL, ...rest } = config

    this.BASE_URL = baseURL

    this.instance = axios.create({
      baseURL: prefix ? baseURL + prefix : baseURL,
      // withCredentials: true,
      ...rest
    })

    this.requestInterceptor()
    this.responseInterceptor()
  }

  private requestInterceptor() {
    this.instance!.interceptors.request.use(
      (config: AxiosRequestConfig = {}) => {
        const token = getTokenAccess()
        if (config.headers && token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        message.error(error.message)
        return Promise.reject(error)
      }
    )
  }

  private responseInterceptor() {
    this.instance!.interceptors.response.use(
      (response: AxiosResponse): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
          const { status, data } = response
          if (status !== 200 && status !== 201) reject(data)
          resolve(data)
        })
      },
      async (error) => {
        const originalConfig = error.config
        const responseStatus = error.response.status

        const tokenData = getUserInfo()

        if (responseStatus === 401) {
          message.error("Sizda kirishga ruxsat yo'q. O'zingizda yuqoridagilar bilan bog'laning")
        }

        try {
          if (responseStatus === 403 && !originalConfig._retry && getTokenAccess()) {
            originalConfig._retry = true
            const res = await fetch(`${this.BASE_URL}/api/v1/auth/refresh`, {
              headers: {
                authorization: `Bearer ${tokenData?.refresh_token}`
              }
            })

            const data = await res.json()
            setUserInfo({ ...tokenData, ...data })
            return axios(originalConfig)
          }
        } catch (err) {
          clearUserInfo()
          window.location.href = '/login'
          return Promise.reject(error)
        }

        return Promise.reject(error)
      }
    )
  }

  public request<T>(config: AxiosRequestConfig<T>): Promise<T> {
    return this.instance!.request(config)
  }

  public get = <T>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    const option: AxiosRequestConfig = { url, method: 'GET', params, ...config }
    return this.request(option)
  }

  public post = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    const option: AxiosRequestConfig = { url, method: 'POST', data, ...config }
    return this.request(option)
  }

  public put = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    const option: AxiosRequestConfig = { url, method: 'PUT', data, ...config }
    return this.request(option)
  }
  public patch = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    const option: AxiosRequestConfig = { url, method: 'PATCH', data, ...config }
    return this.request(option)
  }
}

const { get, post, put, patch } = new NRequest({ baseURL: import.meta.env.VITE_BACKEND_URI }, '/api/v1')

export { get, post, put, patch }

export default NRequest
