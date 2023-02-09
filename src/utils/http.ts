import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.type'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage,
} from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.instance.interceptors.request.use(
      config => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      error => {
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      response => {
        const { url } = response.config
        const data = response.data as AuthResponse
        if (url === path.login || url === path.register) {
          this.accessToken = data.data.access_token
          setAccessTokenToLocalStorage(this.accessToken)
          setProfileToLocalStorage(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      },
    )
  }
}

const http = new Http().instance

export default http
