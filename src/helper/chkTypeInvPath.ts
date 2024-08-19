
export const checkingTypeInvoice = (
  typeInvoice: string,
  typePathOfInv: string,
  typeInvCustomer?: string,
  typeOfInvoiceCustomer?: string
) => {
  if (typeInvoice === 'CUSTOMER') {
    if (typeOfInvoiceCustomer !== 'REFUND') {
      if (typeInvCustomer) {
        return typeInvCustomer.toLowerCase()
      } else return `${typeOfInvoiceCustomer?.toLowerCase()}-return`
    }
  } else {
    if (typePathOfInv === 'REFUND') {
      return 'vendor-return'
    } else return null
  }
}

export const checkTypeGetPriceList = (typeInvoice: string) => {
  if (typeInvoice === 'B2B') {
    return 'WHOLESALE'
  } else if (typeInvoice === 'B2C') {
    return 'RETAIL'
  } else if (typeInvoice === 'MERCHANT') {
    return 'MERCHANT'
  } else if (typeInvoice === 'OEM') {
    return 'OEM'
  } else return 'CLEARANCE'
}

export const checkTypeGetUnitPriceForPriceListProduct = (
  typeInvoice: string
) => {
  if (typeInvoice === 'B2B') {
    return 'B2B'
  } else if (typeInvoice === 'B2C') {
    return 'B2C'
  } else if (typeInvoice === 'MERCHANT') {
    return 'MERCHANT'
  }
}
