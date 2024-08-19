import { errorMsg } from '@/helper/message'
import { parseJwt } from '@/helper/parseJwt'
import { postLogout } from '@/service/auth/logout'
import { postRefreshToken } from '@/service/auth/refreshToken'
import axios, { AxiosRequestConfig } from 'axios'
import getConfig from 'next/config'
import queryString from 'query-string'
import { getCmsToken, removeCmsToken, setCmsToken } from './token'

const {
  publicRuntimeConfig: {
    SUBDOMAIN,
    AUTH_URL,
    APUS_URL,
    COMMON_URL,
    UAA_URL,
    PRODUCT_URL,
    SO_URL,
    PO_URL,
    ASSET_URL,
    WAREHOUSE_URL,
    ACCOUNTING_URL,
    FINANCE_URL,
    MANUFACTORY_URL,
    CONTRACT_URL,
    HRM_URL
  },
} = getConfig()

const requestAuth = axios.create({
  baseURL: AUTH_URL,
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
    window.location.replace('/accounting/login')
  }
}

export const middlewareRequest = async (config: any) => {
  try {
    const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')
    if (
      config.url &&
      config.url.includes('/oauth') &&
      !config.url.includes('/oauth/logout')
    ) {
      return {
        ...config,
        headers: {
          ...config.headers,
          'Accept-Language': 'vi',
          'Current-Domain': !window.location.origin.includes('localhost')
            ? window.location.origin
                .replace('https://', '')
                .replace('http://', '')
            : 'apodio' + SUBDOMAIN,
        },
      }
    }

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
          : 'apodio' + SUBDOMAIN,
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

  if (!status || status === 503 || status === 404) {
    //   window.location.replace('/accounting/500')
  }

  if (
    status === 401 &&
    !config.url.includes('/oauth') &&
    !originalRequest._retry
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
export const authApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_URL,
    ...options,
  })
}
export const authWarehouseApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: WAREHOUSE_URL,
    ...options,
  })
}
export const commonApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: COMMON_URL,
    ...options,
  })
}

export const authUaaApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: UAA_URL,
    ...options,
  })
}

export const productApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: PRODUCT_URL,
    ...options,
  })
}

export const accountingApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: ACCOUNTING_URL,
    ...options,
  })
}

export const financeApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: FINANCE_URL,
    ...options,
  })
}

export const authCommonAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: COMMON_URL,
    ...options,
  })
}

export const authSOApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: SO_URL,
    ...options,
  })
}

export const poApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: PO_URL,
    ...options,
  })
}

export const assetApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: ASSET_URL,
    ...options,
  })
}

export const authApusApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: APUS_URL,
    ...options,
  })
}

export const manufactoryApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: MANUFACTORY_URL,
    ...options,
  })
}

export const contractApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: CONTRACT_URL,
    ...options,
  })
}

export const hrmApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: HRM_URL,
    ...options,
  })
}
