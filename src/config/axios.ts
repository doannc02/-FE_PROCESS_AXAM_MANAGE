import { errorMsg } from '@/helper/message'
import { parseJwt } from '@/helper/parseJwt'
import { postLogout } from '@/service/auth/logout'
import { postRefreshToken } from '@/service/auth/refreshToken'
import axios, { AxiosRequestConfig } from 'axios'
import getConfig from 'next/config'
import queryString from 'query-string'
import { getCmsToken, removeCmsToken, setCmsToken } from './token'

const {
  publicRuntimeConfig: { SUBDOMAIN, COMMON_URL },
} = getConfig()

const requestAuth = axios.create({
  baseURL: COMMON_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params: any) =>
      queryString.stringify(params, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
      }),
  },
})

export const logoutAccount = async () => {
  try {
    const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')
    if (tokenAccess && tokenAccess?.jti) await postLogout(tokenAccess.jti)
  } catch (error) {
    console.log(error)
  } finally {
    localStorage.clear()
    sessionStorage.clear()
    await removeCmsToken()
    window.location.replace('/login')
  }
}

export const middlewareRequest = async (config: any) => {
  try {
    const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')
    console.log(tokenAccess, 'tkacc')
    if (
      config.url &&
      config.url.includes('/oauth') &&
      !config.url.includes('/oauth/logout')
    ) {
      console.log(tokenAccess, config, 'inconfig')
      return {
        ...config,
        headers: {
          ...config.headers,
          'Accept-Language': 'vi',
          'Current-Domain': !window.location.origin.includes('localhost')
            ? window.location.origin
                .replace('https://', '')
                .replace('http://', '')
            : SUBDOMAIN,
        },
      }
    }
    console.log(tokenAccess, config, 'inconfig2')
    return {
      ...config,
      headers: {
        ...config.headers,
        'Accept-Language': 'vi',
        Authorization: `Bearer ${tokenAccess?.accessToken}`,
        'Current-Domain': !window.location.origin.includes('localhost')
          ? window.location.origin
              .replace('https://', '')
              .replace('http://', '')
          : SUBDOMAIN,
      },
    }
  } catch (error) {
    console.log(error)
  }
}

let isRefreshing = false
let refreshSubscribers: any = []

export const middlewareResponseError = async (error: any) => {
  const { config, response } = error
  const originalRequest = config

  const status = response?.status
  console.log(response, 'res')
  if (!status || status === 503 || status === 404) {
    //   window.location.replace('/accounting/500')
  }

  if (
    status === 401
    // &&
    // !originalRequest._retry
  ) {
    if (!isRefreshing) {
      isRefreshing = true
      const tokenAccess = JSON.parse(getCmsToken() ?? '{}')

      if (tokenAccess && tokenAccess?.refreshToken) {
        postRefreshToken(
          tokenAccess?.refreshToken,
          parseJwt(tokenAccess?.accessToken)?.branch_id
        )
          .then((res) => {
            isRefreshing = false

            if (res && res?.data && res.data.accessToken) {
              setCmsToken(res.data)
            }

            refreshSubscribers.map((su: any) => {
              su(res.data.accessToken)
            })
          })
          .catch(() => {
            logoutAccount()
          })
      } else {
        logoutAccount()
      }
    }

    const retryOrigReq = new Promise((resolve, _) => {
      refreshSubscribers.push((accessToken: string) => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        resolve(axios(originalRequest))
      })
    })

    return retryOrigReq
  } else if (status === 403) {
    errorMsg('Bạn không có quyền thực hiện tính năng này.')
  }

  return Promise.reject(error)
}

requestAuth.interceptors.request.use(middlewareRequest, (error: any) =>
  Promise.reject(error)
)

requestAuth.interceptors.response.use((res) => {
  const { data } = res

  if (!!data?.errorCodes)
    return Promise.reject(data?.errorCodes ?? 'Hệ thống đang bị lỗi !!!')

  return res
}, middlewareResponseError)

export const defaultOption = {
  // cacheTime: Infinity,
  refetchOnWindowFocus: false,
  // staleTime: Infinity,
  refetchInterval: 0,
  keepPreviousData: false,
}

export const commonApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: COMMON_URL,
    ...options,
  })
}
