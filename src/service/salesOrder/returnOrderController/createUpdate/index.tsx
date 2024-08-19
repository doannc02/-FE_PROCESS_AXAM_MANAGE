import { useCheckPath, TypePath } from '@/path'
//import { CreateUpdateSaleOrderBackup } from '@/components/templates/BackPurchaseOrderManagement/AddBackPurchaseOrderManagement/type'
import { authSOApi, authWarehouseApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { PageResponse } from '@/service/type'

export const getListWarehouse = async (
  params: any
): Promise<PageResponse<any>> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/stock-warehouse/list',
    params,
  })
  return data
}

export const useQueryGetWarehouse = (params: any, options?: any) => {
  return useQuery<any>(
    ['api/v1/sale-return-order/list', params],
    () => getListWarehouse(params),
    { ...defaultOption, ...options }
  )
}

export const getListProductBySaleOrder = async (
  params: any,
  typePath: TypePath
): Promise<any> => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-return-order/returned-quantity`
  const { data } = await authSOApi({
    method: 'get',
    url,
    params,
  })
  return data ? data.data : data
}

export const useQueryGetProductByOrder = (params: any, options?: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<any>(
    ['/api/v1/sale-return-order/returned-quantity', params],
    () => getListProductBySaleOrder(params, typeSaleRequest),
    { ...defaultOption, ...options, enabled: !!params?.saleOrderId }
  )
}

// export const createUpdateRetailOrderReturn = async (
//   body: CreateUpdateSaleOrderBackup
// ) => {
//   const { data } = await authSOApi({
//     method: body?.id ? 'put' : 'post',
//     url: '/api/v1/retail/sale-return-order',
//     data: body,
//     params: { id: body?.id ?? undefined },
//   })
//   return data ? data.data : data
// }

// export const createUpdateWholesaleOrderReturn = async (
//   body: CreateUpdateSaleOrderBackup
// ) => {
//   const { data } = await authSOApi({
//     method: body?.id ? 'put' : 'post',
//     url: '/api/v1/wholesale/sale-return-order',
//     data: body,
//     params: { id: body?.id ?? undefined },
//   })
//   return data ? data.data : data
// }

export const getListSerialLotByRetailOrderProduct = async (
  params: any
): Promise<any> => {
  const { data } = await authSOApi({
    method: 'get',
    url: '/api/v1/retail/sale-return-order/serial-lot/order',
    params,
  })
  return data ? data.data : data
}

export const getListSerialLotByWholesaleOrderProduct = async (
  params: any
): Promise<any> => {
  const { data } = await authSOApi({
    method: 'get',
    url: '/api/v1/wholesale/sale-return-order/serial-lot/order',
    params,
  })
  return data ? data.data : data
}

export const useQueryGetSerialLotByOrderProduct = (
  params: any,
  options?: any
) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<any[]>(
    ['/api/v1/sale-return-order/serial-lot/order', params],
    () =>
      typeSaleRequest === 'RETAIL'
        ? getListSerialLotByRetailOrderProduct(params)
        : getListSerialLotByWholesaleOrderProduct(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params?.saleOrderId && !!params.productId,
    }
  )
}

const getDetailRetailOrderReturn = async (params: any) => {
  const { data } = await authSOApi({
    method: 'get',
    url: '/api/v1/retail/sale-return-order',
    params,
  })
  return data ? data.data : data
}

const getDetailWholesaleOrderReturn = async (params: any) => {
  const { data } = await authSOApi({
    method: 'get',
    url: '/api/v1/wholesale/sale-return-order',
    params,
  })
  return data ? data.data : data
}

// export const useQueryGetDetailSaleOrderReturn = (
//   params: any,
//   options?: any
// ) => {
//   const { typeSaleRequest } = useCheckPath()

//   return useQuery<CreateUpdateSaleOrderBackup>(
//     ['/api/v1/sale-return-order/serial-lot/order1', params],
//     () =>
//       typeSaleRequest === 'RETAIL'
//         ? getDetailRetailOrderReturn(params)
//         : getDetailWholesaleOrderReturn(params),
//     {
//       ...defaultOption,
//       ...options,
//     }
//   )
// }

export const updateStateRetailOrderReturn = async (params: any, data?: any) => {
  const paramss = { ...params, state: data?.state }
  const { data: res } = await authSOApi({
    method: 'put',
    url: '/api/v1/retail/sale-return-order/update-state',
    params: paramss,
    data,
  })
  return res ? res.data : res
}

export const updateStateWholesaleOrderReturn = async (
  params: any,
  data?: any
) => {
  const paramss = { ...params, state: data?.state }
  const { data: res } = await authSOApi({
    method: 'put',
    url: '/api/v1/wholesale/sale-return-order/update-state',
    params: paramss,
    data,
  })
  return res ? res.data : res
}

export const rejectApproveRetailOrderReturn = async (
  params: any,
  data?: any
) => {
  const paramss = { ...params, state: data?.state }
  const { data: res } = await authSOApi({
    method: 'put',
    url: '/api/v1/retail/sale-return-order/reject',
    params: paramss,
    data,
  })
  return res ? res.data : res
}

export const rejectApproveWholesaleOrderReturn = async (
  params: any,
  data?: any
) => {
  const paramss = { ...params, state: data?.state }
  const { data: res } = await authSOApi({
    method: 'put',
    url: '/api/v1/wholesale/sale-return-order/reject',
    params: paramss,
    data,
  })
  return res ? res.data : res
}
