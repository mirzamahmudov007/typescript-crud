import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { message } from 'antd'
import { getTokenAccess } from '@/utils/token'
import i18n from '@/i18n/locales/uz_UZB'

class NRequest {
  protected instance: AxiosInstance | null = null

  constructor(config: AxiosRequestConfig, prefix: string = '') {
    const { baseURL, ...rest } = config

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

          if (status !== 200 && status !== 201) {
            reject(data)
          }

          resolve(data)
        })
      },
      (error) => {
        switch (error.response.status) {
          case 403:
            // Processing errors globally like this increases code coupling, which is retarded.
            // For example: How tf am I supposed to use dynamic internationalization here?
            // I just can't. I have to show error here and handle the redirection on the call-site anyways.
            // Which forces me to always think about 2 or more places to handle the trivial error.
            //
            // This is what I call a useless abstraction — making the code complex for the sake of being complex.
            // Cringe.
            message.error(i18n['login']['forbidden'])
            break
          default:
            message.error(error.response.data && error.response.data.message ? error.response.data.message : 'Error!')
            break
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
