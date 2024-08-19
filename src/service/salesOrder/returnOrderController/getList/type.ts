import { PageResponse } from '@/service/type'

export type ResponseReturnOrder = {
  id: number
  code: string
  name: string
  saleOrderResponse: {
    id: number
    code: string
    sequence: number
    state: string
    partnerId: number
    partner: {
      id: number
      code: string
      name: string
    }
    invoiceAddressId: number
    deliveryAddressId: number
    createDate: string
    quotationDate: string
    orderDate: string
    validityDate: string
    pricelistId: number
    priceList: {
      id: number
      code: string
      name: string
    }
    paymentTermId: number
    paymentTerm: {
      id: number
      name: string
    }
    promotionIds: Array<number>
    promotions: [
      {
        id: number
        name: number
      }
    ]
    paymentMethod: string
    deliveryType: string
    commitmentDatstringtatus: string
    campaignId: number
    pickingIds: Array<number>
    discount: number
    discountComputeType: string
    note: string
    companyId: number
    branchId: number
    deliveryPolicy: string
    totalPrice: number
    saleOrderLines: [
      {
        id: number
        sequence: number
        productId: number
        productInfo: {}
        quantity: number
        quantityInventory: number
        requestedQty: number
        deliveredQty: number
        uomId: number
        unitPrice: number
        amountUntaxed: number
        amountTotal: number
        taxIds: Array<number>
        tax: [
          {
            id: number
            code: string
            name: string
          }
        ]
        discount: number
        discountComputeType: string
        type: string
        note: string
      }
    ]
  }
  partnerResponse: {
    id: number
    code: string
    name: string
  }
  partnerId: number
  plannedDate: string
  warehouseResponse: {
    id: number
    name: string
  }
  returnTermId: number
  responsiblePersonIds: Array<number>
  returnMethod: string
  note: string
  state: string
  pickingIds: Array<number>
  amountUntaxed: number
  amountTotal: number
  returnOrderLineResponseList: [
    {
      id: number
      productInfo: {}
      returnQty: number
      unitPrice: number
      discount: number
      priceSubtotal: number
      taxIds: Array<number>
      priceTotal: number
      uomId: number
      soldQty: number
      returnOrderId: number
      productId: number
    }
  ]
  isManager: boolean
  createdAt: string
  doneDate: string
}

export type Response = {
  GET: PageResponse<ResponseReturnOrder[]>
}

export type Request = {
  GET: {
    search?: string
    dateTime?: string
    state?: string
    page: number
    size: number
  }
}
