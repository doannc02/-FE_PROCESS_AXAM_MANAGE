import { BaseResponse } from '@/service/type'

export type UpdateHisDetail = {
    paymentChange: {
      id: number,
      code: string,
      accountJournal: {
        id: number,
        code: string,
        name: string
      },
      paymentMethod: string,
      partner: {
        id: number,
        name: string,
        code: string
      },
      amount: number,
      currency: {
        id: number,
        name: string
      },
      paymentDate: string,
      incomeExpense: {
        id: number,
        name: string,
        code: string
      },
      state: string,
      reason: string
    },
    paymentMain: {
      id: number,
      code: string,
      accountJournal: {
        id: number,
        code: string,
        name: string
      },
      paymentMethod: string,
      partner: {
        id: number,
        name: string,
        code: string
      },
      amount: number,
      currency: {
        id: number,
        name: string
      },
      paymentDate: string,
      incomeExpense: {
        id: number,
        name: string,
        code: string
      },
      state: string,
      reason: string
    },
    createdBy: string
  }
export type UpdateHisInvoice = {
  invoiceMain: {
    VAT?: number,
    id: number,
    orderName: string,
    moveType: string,
    code: string,
    partner: {
      id: number,
      name: string,
      code: string
    },
    scopeType: string,
    date: string,
    dueDate: string,
    accountingDate: string,
    incomeExpense: {
      id: number,
      name: string,
      code: string
    },
    paymentTerm: {
      id: number,
      name: string,
      hasEarlyDiscount: true,
      discountAmount: number,
      discountComputeType: string,
      withinDays: number,
      reducedTaxOnDiscount: true,
      description: string,
      createdAt: string,
      type: string,
      lines: [
        {
          id: number,
          amountDue: number,
          computeType: string,
          afterDays: number,
          anchorDate: string,
          paymentTermId: number,
          date: string
        }
      ]
    },
    accountJournal: {
      id: number,
      code: string,
      name: string
    },
    paymentStatus: string,
    state: string,
    currency: {
      id: number,
      name: string
    },
    amountUntaxed: number,
    amountTotal: number,
    moneyPaid: number,
    discount: number,
    totalRemainPunish: number,
    reason: string,
    invoiceLines: {
      id: number,
      sequence: number,
      product: {
        id: number,
        name: string,
        sku: string,
        uomId: number,
        uomName: string
      },
      quantity: number,
      uom: {
        id: number,
        code: string,
        name: string
      },
      unitPrice: number,
      amountUntaxed: number,
      amountTotal: number,
      discount: number,
      displayType: string,
      note: string,
      taxes: string[]
    }[],
    computeTaxInfo: {
      taxLines: [
        {
          items: [
            {
              taxId: number,
              taxName: string,
              repartitions: [
                {
                  id: number,
                  accountId: number,
                  accountTagId: number,
                  amount: number
                }
              ],
              amount: number
            }
          ],
          amount: number,
          untaxedAmount: number
        }
      ],
      summaryItems: [
        {
          taxId: number,
          taxName: string,
          amount: number
        }
      ],
      cashRounding: {
        id: number,
        name: string,
        roundingPrecision: number,
        roundingStrategy: 'DO_THE_LINE',
        profitAccountId: number,
        lossAccountId: number,
        roundingMethod: 'UP',
        description: string,
        activated: true
      }
    }
  },
  invoiceChange: {
    VAT?: number,
    id: number,
    orderName: string,
    moveType: string,
    code: string,
    partner: {
      id: number,
      name: string,
      code: string
    },
    scopeType: string,
    date: string,
    dueDate: string,
    accountingDate: string,
    incomeExpense: {
      id: number,
      name: string,
      code: string
    },
    paymentTerm: {
      id: number,
      name: string,
      hasEarlyDiscount: true,
      discountAmount: number,
      discountComputeType: string,
      withinDays: number,
      reducedTaxOnDiscount: true,
      description: string,
      createdAt: string,
      type: string,
      lines: [
        {
          id: number,
          amountDue: number,
          computeType: string,
          afterDays: number,
          anchorDate: string,
          paymentTermId: number,
          date: string
        }
      ]
    },
    accountJournal: {
      id: number,
      code: string,
      name: string
    },
    paymentStatus: string,
    state: string,
    currency: {
      id: number,
      name: string
    },
    amountUntaxed: number,
    amountTotal: number,
    moneyPaid: number,
    discount: number,
    totalRemainPunish: number,
    reason: string,
    invoiceLines:  {
      id: number,
      sequence: number,
      product: {
        id: number,
        name: string,
        sku: string,
        uomId: number,
        uomName: string
      },
      quantity: number,
      uom: {
        id: number,
        code: string,
        name: string
      },
      unitPrice: number,
      amountUntaxed: number,
      amountTotal: number,
      discount: number,
      displayType: string,
      note: string,
      taxes: string[]
    }[],
    computeTaxInfo: {
      taxLines: [
        {
          items: [
            {
              taxId: number,
              taxName: string,
              repartitions: [
                {
                  id: number,
                  accountId: number,
                  accountTagId: number,
                  amount: number
                }
              ],
              amount: number
            }
          ],
          amount: number,
          untaxedAmount: number
        }
      ],
      summaryItems: [
        {
          taxId: number,
          taxName: string,
          amount: number
        }
      ],
      cashRounding: {
        id: number,
        name: string,
        roundingPrecision: number,
        roundingStrategy: 'DO_THE_LINE',
        profitAccountId: number,
        lossAccountId: number,
        roundingMethod: 'UP',
        description: string,
        activated: true
      }
    }
  },
  createdBy: string
}
export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<UpdateHisDetail>
}
export type ResponseInv = {
  GET: BaseResponse<UpdateHisInvoice>
}
