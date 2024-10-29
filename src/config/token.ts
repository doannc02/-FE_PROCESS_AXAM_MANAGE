import cookie from 'js-cookie'
import getConfig from 'next/config'

export const getCmsToken = () => {
  return cookie.get('ACCESS_TOKEN')
}

export const getRole = () => {
  const val = cookie.get('ACCESS_TOKEN')
  return JSON.parse(val ?? '').role
}

export const setCmsToken = (val: any) => {
  return cookie.set('ACCESS_TOKEN', JSON.stringify(val))
}

export const removeCmsToken = () => {
  cookie.remove('ACCESS_TOKEN')
}
