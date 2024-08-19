import { useRouter } from 'next/router'

export type PartnerType =
  | 'ANOTHER'
  | 'MERCHANT'
  | 'OEM'
  | 'PAYMENT'
  | 'B2C'
  | 'SHIPPING'
  | 'VENDOR'
  | 'B2B'

const useCheckPathPartnerType = () => {
  const router = useRouter()

  const type: PartnerType = router.asPath.startsWith('/salesOrder/wholesale')
    ? 'B2B'
    : router.asPath.startsWith('/salesOrder/retail')
    ? 'B2C'
    : router.asPath.startsWith('/salesOrder/merchant')
    ? 'MERCHANT'
    : 'OEM'
  // : router.asPath.startsWith('/partner/merchant')
  // ? 'MERCHANT'
  // : router.asPath.startsWith('/partner/payment')
  // ? 'PAYMENT'
  // : router.asPath.startsWith('/partner/shipping')
  // ? 'SHIPPING'

  return { type }
}

export default useCheckPathPartnerType
