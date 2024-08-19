import { manufactoryApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const getProcessProduct = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await manufactoryApi({
    method: 'get',
    url: '/api/v1/product/production-process/list',
    params,
  })
  return data
}

export const getStageOfProcessProduct = async (params?: {
  id: number
}): Promise<PageResponse<any[]>> => {
  const { data } = await manufactoryApi({
    method: 'get',
    url: '/api/v1/product/production-process/stage-list',
    params,
  })
  let dt: any[] = []

  let numberOfElements = 0
  let totalElements = 0
  let page = 0
  let size = 0
  let sort = 'ASC'
  let totalPages = 0
  dt = (data.data ?? []).map((ele: any) => {
    return {
      id: ele.id,
      code: ele.code,
      name: ele.name,
    }
  })
  const data2: PageResponse<any[]> = {
    message: '',
    traceId: '',
    data: {
      content: dt,
      numberOfElements,
      totalElements,
      page,
      size,
      totalPages,
      sort,
    },
  }

  return data2
}

export const getProductPlaneBoms = async (
  params: any
): Promise<PageResponse<any[]>> => {
  const { data } = await manufactoryApi({
    method: 'get',
    url: '/api/v1/boms/plan/product',
    params,
  })
  return data
}

import { PageResponse } from '@/service/type'

export type PageContent<T> = {
  content: T
  page: number
  size: number
  sort: string
  totalElements: number
  totalPages: number
  numberOfElements: number
}

export const getListBomDistributionById = async (params: {
  productId: number
  isAllocation?: boolean
}): Promise<PageResponse<any[]>> => {
  const { data } = await manufactoryApi({
    method: 'get',
    url: '/api/v1/boms/list/by-productId',
    params,
  })

  return data
}

export const handleGetListListBomNotDistribution = async (params: {
  productId: number
  isAllocation?: boolean
}): Promise<PageResponse<any[]>> => {
  let bom: any[] = []

  let numberOfElements = 0
  let totalElements = 0
  let page = 0
  let size = 0
  let sort = 'ASC'
  let totalPages = 0

  await getListBomDistributionById(params).then((res) => {
    numberOfElements = res.data.numberOfElements
    totalElements = res.data.totalElements
    page = res.data.page
    size = res.data.size
    sort = res.data.sort
    totalPages = res.data.totalPages
    bom = res.data.content.map(({ bom, bomChildId }) => {
      return {
        id: bomChildId,
        code: bom.code,
      }
    })
  })

  const data: PageContent<any[]> = {
    content: bom,
    numberOfElements,
    totalElements,
    page,
    size,
    totalPages,
    sort,
  }

  return {
    data,
    message: '',
    traceId: '',
  }
}

export const handleGetListListProduct = async (
  params: any
): Promise<PageResponse<any[]>> => {
  let product: any[] = []

  let numberOfElements = 0
  let totalElements = 0
  let page = 0
  let size = 0
  let sort = 'ASC'
  let totalPages = 0

  await getProductPlaneBoms(params).then((res) => {
    numberOfElements = res.data.numberOfElements
    totalElements = res.data.totalElements
    page = res.data.page
    size = res.data.size
    sort = res.data.sort
    totalPages = res.data.totalPages
    product = res.data.content.map(({ product, process }) => {
      return {
        id: product.id,
        name: product.name,
        uomName: product.uomName,
        processId: process.id,
      }
    })
  })

  const data: PageContent<any[]> = {
    content: product,
    numberOfElements,
    totalElements,
    page,
    size,
    totalPages,
    sort,
  }

  console.log(data, 'log')

  return {
    data,
    message: '',
    traceId: '',
  }
}
