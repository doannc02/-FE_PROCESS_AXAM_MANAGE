import { BaseResponse, CommonObject } from '@/service/type'

export type AccountConfig = {
  materialCostAccountTypes: any[]
  salaryCostAccountTypes: any[]
  //update tài khoản mặc định
  customerDebtAccountTypes: { id: number; code: string; name: string }[]
  vendorDebtAccountTypes: { id: number; code: string; name: string }[]
  internalReceiveAccountTypes: { id: number; code: string; name: string }[]
  internalPayableDebtAccountTypes: { id: number; code: string; name: string }[]
  staffReceiveAccountTypes: { id: number; code: string; name: string }[]
  staffPayableAccountTypes: { id: number; code: string; name: string }[]
  recordAllocatedCostAccountTypes: { id: number; code: string; name: string }[]
  recordGeneralExpensesAccountTypes: {
    id: number
    code: string
    name: string
  }[]

  id: number
  saleDefaultTax: CommonObject
  purchaseDefaultTax: CommonObject
  receivableInternalAccount: CommonObject
  saleDefaultJournal: CommonObject
  purchaseDefaultJournal: CommonObject
  payableAccount: CommonObject
  cashRounding: CommonObject
  internalTransferAccount: CommonObject
  discountGainAccount: CommonObject
  discountLossAccount: CommonObject
  incomeAccount: CommonObject
  expenseAccount: CommonObject
  incomeCurrencyExchangeAccount: CommonObject
  expenseCurrencyExchangeAccount: CommonObject
  stockAutomaticAccounting: boolean
  stockValuationAccount: CommonObject
  stockJournal: CommonObject
  stockInputAccount: CommonObject
  stockOutputAccount: CommonObject
  fiscalLastMonth: number
  fiscalLastDay: number
  isFiscalYear: boolean
  fiscalYear: {
    id: number
    name: string
    startDate: string
    endDate: string
    activated: boolean
  }
  upperBoundDate: string
  idConfigJournal: number | null
  country: CommonObject
  receivableAccount: CommonObject
  payableInternalAccount: CommonObject
  posReceivableAccount: CommonObject
  branchAccounting: {
    id?: number | null
    branch: CommonObject
    accountingForm?: 'DEPENDENCE' | 'INDEPENDENCE'
  }[]
  waitingAllocation: CommonObject
  vatTaxes: CommonObject[]
  deleteBranchIds: number[]
  isSimpleProduction: boolean // sản xuất giản đơn
  isCoefficientsRatiosProduction: boolean // sản xuất theo hệ số, tỷ lệ
  isStepStoolProduction: boolean // sản xuất phân bước
  isSaleOrder: boolean // đơn hàng
  isContract: boolean // hợp đồng

  commonCostAllocationMethod: 'BOM' | 'LABOR' | 'COMPLETE_QTY_PRODUCT'
  methodCalculatingCost: 'RATIO' | 'COMPLETE_QTY_PRODUCT'
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AccountConfig>
}
