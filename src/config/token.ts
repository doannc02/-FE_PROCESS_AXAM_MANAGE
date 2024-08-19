import cookie from 'js-cookie'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { SUBDOMAIN },
} = getConfig()

export const getCmsToken = () => {
  return cookie.get('ACCESS_TOKEN')
}

export const setCmsToken = (val: any) => {
  if (window.location.origin.includes('localhost')) {
    return cookie.set('ACCESS_TOKEN', JSON.stringify(val))
  }
  return cookie.set('ACCESS_TOKEN', JSON.stringify(val), {
    domain: SUBDOMAIN,
  })
}

export const removeCmsToken = () => {
  cookie.remove('ACCESS_TOKEN')
  cookie.remove('ACCESS_TOKEN', {
    domain: SUBDOMAIN,
  })
}
