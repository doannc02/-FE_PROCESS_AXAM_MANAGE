import { useRouter } from 'next/router'

export type TypePath = 'RETAIL' | 'WHOLESALE' | 'CLEARANCE' | 'OEM' | 'MERCHANT'

export type TypePathSale = 'B2C' | 'B2B' | 'CLEARANCE' | 'OEM' | 'MERCHANT'
export type TypePathInvoice =
  | 'B2C'
  | 'B2B'
  | 'LIQUIDATION'
  | 'OEM'
  | 'MERCHANT'
  | 'INTERNAL'
  | 'EXTERNAL'

export const useCheckPath = () => {
  const router = useRouter()
  let typeSaleRequest: TypePath = router.asPath.includes(
    '/accounting/salesOrder/b2c'
  )
    ? 'RETAIL'
    : router.asPath.includes('/accounting/saleOrder/b2b')
    ? 'WHOLESALE'
    : router.asPath.includes('/accounting/saleOrder/merchant')
    ? 'MERCHANT'
    : router.asPath.includes('/accounting/saleOrder/oem/')
    ? 'OEM'
    : 'CLEARANCE'
  let typePathSale: TypePathSale = router.asPath.includes(
    '/accounting/saleOrder/b2c'
  )
    ? 'B2C'
    : router.asPath.includes('/accounting/accounting/saleOrder/b2b')
    ? 'B2B'
    : router.asPath.includes('/accounting/saleOrder/merchant')
    ? 'MERCHANT'
    : router.asPath.includes('/accounting/saleOrder/oem')
    ? 'OEM'
    : 'CLEARANCE'
  const typeInvoice: TypePathInvoice = router.asPath.includes('/b2c')
    ? 'B2C'
    : router.asPath.includes('/merchant')
    ? 'MERCHANT'
    : router.asPath.includes('/oem')
    ? 'OEM'
    : router.asPath.includes('/b2b')
    ? 'B2B'
    : router.asPath.includes('/liquidation')
    ? 'LIQUIDATION'
    : router.asPath.includes('/internal/all')
    ? 'INTERNAL'
    : 'EXTERNAL'

  const typePath: 'CUSTOMER' | 'PROVIDER' = router.pathname.includes('customer')
    ? 'CUSTOMER'
    : 'PROVIDER'

  const typeOfInvoice: 'INVOICE' | 'REFUND' = router.pathname.includes(
    '/providerInvoice'
  )
    ? 'INVOICE'
    : 'REFUND'

  const typeOfInvoiceCustomer: 'INVOICE' | 'REFUND' = router.pathname.includes(
    '/customerInvoice'
  )
    ? 'INVOICE'
    : 'REFUND'
  const balanceTypePath: 'CUSTOMER' | 'PROVIDER' = router.pathname.includes(
    'balance/customer'
  )
    ? 'CUSTOMER'
    : 'PROVIDER'

  const paymentMethod: 'BANK' | 'CASH' = router.pathname.includes('bankAccount')
    ? 'BANK'
    : 'CASH'

  const paymentMethodURL: 'BANK_ACCOUNT' | 'CASH_ACCOUNT' =
    router.pathname.includes('bankAccount') ? 'BANK_ACCOUNT' : 'CASH_ACCOUNT'

  const paymentType: 'INBOUND' | 'OUTBOUND' = router.pathname.includes(
    'inbound'
  )
    ? 'INBOUND'
    : 'OUTBOUND'

  const invoiceCk: 'NORMAL' | 'INTERNAL' = router.pathname.includes('/internal')
    ? 'INTERNAL'
    : 'NORMAL'

  return {
    invoiceCk,
    typePathSale,
    typeSaleRequest,
    typePath,
    paymentMethod,
    paymentMethodURL,
    paymentType,
    balanceTypePath,
    typeInvoice,
    typeOfInvoice,
    typeOfInvoiceCustomer,
  }
}
