import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response } from './type'
import {useCheckPath} from '@/path'

export const getListWareHouseRetail = async (params: any): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/retail/return-synthesis/warehouse`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const getListWareHouseWholesale = async (params: any): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/wholesale/return-synthesis/warehouse`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const useQueryGetListWareHouse = (params?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['WAREHOUSE']>(
    ['/return-synthesis/warehouse', params],
    () =>
      typeSaleRequest === 'RETAIL'
        ? getListWareHouseRetail(params)
        : getListWareHouseWholesale(params),
    { ...defaultOption }
  )
}

export const getListUOMRetail = async (params: any): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/retail/return-synthesis/uom`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const getListUOMWhosale = async (params: any): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/wholesale/return-synthesis/uom`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const useQueryGetListUOM = (params?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['UOM']>(
    ['/return-synthesis/uom', params],
    () =>
      typeSaleRequest === 'RETAIL' ? getListUOMRetail(params) : getListUOMWhosale(params),
    { ...defaultOption }
  )
}

export const getListSKURetail = async (params: any): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/retail/return-synthesis/sku`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const getListSKUWholesale = async (params: any): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/wholesale/return-synthesis/sku`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const useQueryGetListSKU = (params?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['SKU']>(
    ['/return-synthesis/sku', params],
    () =>
      typeSaleRequest === 'RETAIL'
        ? getListSKURetail(params)
        : getListSKUWholesale(params),
    { ...defaultOption }
  )
}

export const getListProductCategoryRetail = async (
  params: any
): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/retail/return-synthesis/product-category`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const getListProductCategoryWholesale = async (
  params: any
): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/wholesale/return-synthesis/product-category`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const useQueryGetListProductCategory = (params?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['CATEGORY']>(
    ['/return-synthesis/product-category', params],
    () =>
      typeSaleRequest === 'RETAIL'
        ? getListProductCategoryRetail(params)
        : getListProductCategoryWholesale(params),
    { ...defaultOption }
  )
}

export const getListProductCustomerRetail = async (
  params: any
): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/retail/return-synthesis/customer`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const getListProductCustomerWholesale = async (
  params: any
): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/wholesale/return-synthesis/customer`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const useQueryGetListProductCustomer = (params?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['CUSTOMER']>(
    ['/return-synthesis/customer', params],
    () =>
      typeSaleRequest === 'RETAIL'
        ? getListProductCustomerRetail(params)
        : getListProductCustomerWholesale(params),
    { ...defaultOption }
  )
}

export const getListProductCodeRetail = async (params: any): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/retail/return-synthesis/code`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const getListProductCodeWholesale = async (
  params: any
): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `api/v1/wholesale/return-synthesis/code`,
    params: { ...paramsOption },
  })
  return data ? data.data : data
}

export const useQueryGetListProductCode = (params?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['CODE']>(
    ['/return-synthesis/code', params],
    () =>
      typeSaleRequest === 'RETAIL'
        ? getListProductCodeRetail(params)
        : getListProductCodeWholesale(params),
    { ...defaultOption }
  )
}
