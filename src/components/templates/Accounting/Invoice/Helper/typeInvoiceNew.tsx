import { TypePathInvoice } from '@/path'
import { MENU_URL } from '@/routes'

export const typeInvoiceNew = (
  typePath: 'CUSTOMER' | 'PROVIDER',
  invoiceCk: 'NORMAL' | 'INTERNAL',
  typeInvoice: string,
  typeOfInvoice: 'INVOICE' | 'REFUND',
  typeOfInvoiceCustomer: 'INVOICE' | 'REFUND'
) => {
  // return typePath === 'CUSTOMER'
  //   ? invoiceCk === 'NORMAL'
  //     ? typeOfInvoiceCustomer  === "INVOICE" ?typeInvoice.toLowerCase()
  //     : `${typeInvoice.toLowerCase()}-internal` : typeInvoice.toLowerCase()
  //     : `${typeInvoice.toLowerCase()}-internal`
  //   : typeOfInvoice === 'INVOICE'
  //   ? 'PROVIDER'
  //   : null
  if (typePath === 'CUSTOMER') {
    if (typeOfInvoiceCustomer === 'INVOICE') {
      if (invoiceCk === 'NORMAL') {
        return typeInvoice.toLowerCase()
      } else return `${typeInvoice.toLowerCase()}-internal`
    } else {
      if (invoiceCk === 'NORMAL') {
        return `${typeInvoice.toLowerCase()}-return`
      } else return `${invoiceCk.toLowerCase()}-return`
    }
  } else {
    return typeOfInvoice === 'INVOICE' ? 'vendor' : null
  }
}

export const typePathInvoiceNew = (
  typePath: 'CUSTOMER' | 'PROVIDER',
  invoiceCk: 'NORMAL' | 'INTERNAL',
  typeOfInvoiceCustomer: 'INVOICE' | 'REFUND',
  typeInvoice: TypePathInvoice,
  typeOfInvoice: 'INVOICE' | 'REFUND'
) => {
  return typePath === 'CUSTOMER'
    ? invoiceCk === 'NORMAL'
      ? `${MENU_URL.CUSTOMER[typeOfInvoiceCustomer].NORMAL[typeInvoice]}`
      : `${MENU_URL.CUSTOMER[typeOfInvoiceCustomer].NORMAL.INTERNAL}`
    : typeOfInvoice === 'INVOICE'
    ? `${MENU_URL.PROVIDER.INVOICE}`
    : `${MENU_URL.PROVIDER.REFUND}`
}

export const typeInvoiceOrRefund = ({
  router,
}: {
  router: any
}): 'OUT_INVOICE' | 'OUT_REFUND' | 'IN_REFUND' | 'IN_INVOICE' => {
  let currentPath: 'OUT_INVOICE' | 'OUT_REFUND' | 'IN_REFUND' | 'IN_INVOICE'
  if (router.pathname.includes('/customerInvoice')) {
    currentPath = 'OUT_INVOICE'
  } else if (router.pathname.includes('/customerRefund')) {
    currentPath = 'OUT_REFUND'
  } else if (router.pathname.includes('/providerRefund')) {
    currentPath = 'IN_REFUND'
  } else {
    currentPath = 'IN_INVOICE'
  }
  return currentPath
}
