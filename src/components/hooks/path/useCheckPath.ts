import { useRouter } from 'next/router'

export type TypePath = 'RETAIL' | 'WHOLESALE' | 'CLEARANCE' | 'OEM' | 'MERCHANT'
export type TypeToolAsset = 'TOOL' | 'ASSET'
export type TypeMethodAddToolAsset = 'HANDMADE' | 'ASSET_OR_TOOLS'
export type TypeIncreaseOrDecrease = 'INCREASE' | 'DECREASE'
export type TypeAddNewRequest = 'HANDMADE' | 'ASSET' | 'PURCHASE'
export type WarehouseType = 'INTERNAL' | 'SALE' | 'FACTORY'

export const warehouseNestedType: { [key in WarehouseType]: string } = {
  INTERNAL: 'internal',
  SALE: 'sale',
  FACTORY: 'factory',
}

const useCheckPath = () => {
  const router = useRouter()

  let type: TypePath = router.asPath.startsWith('/salesOrder/retail')
    ? 'RETAIL'
    : router.asPath.startsWith('/salesOrder/wholesale')
    ? 'WHOLESALE'
    : router.asPath.startsWith('/salesOrder/merchant')
    ? 'MERCHANT'
    : router.asPath.startsWith('/salesOrder/oem')
    ? 'OEM'
    : 'CLEARANCE'

  let typeToolAsset: TypeToolAsset = router.asPath.includes('/fixedAssets/')
    ? 'ASSET'
    : 'TOOL'
  let typeAddNewRequest: TypeAddNewRequest = router.asPath.includes('/handMade')
    ? 'HANDMADE'
    : router.asPath.includes('/asset')
    ? 'ASSET'
    : 'PURCHASE'
  let typeMethodAddToolAsset: TypeMethodAddToolAsset = router.asPath.includes(
    '/handMade/'
  )
    ? 'HANDMADE'
    : 'ASSET_OR_TOOLS'

  let typeIncreaseOrDecrease: TypeIncreaseOrDecrease = router.asPath.includes(
    '/esc'
  )
    ? 'INCREASE'
    : 'DECREASE'

  let typeWareHouse: WarehouseType = router.asPath.includes('/internal')
    ? 'INTERNAL'
    : router.asPath.includes('/sale')
    ? 'SALE'
    : 'FACTORY'

  let typeDebt: 'PAYABLE' | 'RECEIVE' = router.pathname.includes('debt/payable')
    ? 'PAYABLE'
    : 'RECEIVE'

  return {
    type,
    typeToolAsset,
    typeIncreaseOrDecrease,
    router,
    typeMethodAddToolAsset,
    typeAddNewRequest,
    typeWareHouse,
    typeDebt,
  }
}

export default useCheckPath
