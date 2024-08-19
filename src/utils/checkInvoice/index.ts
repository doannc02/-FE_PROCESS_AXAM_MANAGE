import { MENU_URL } from '@/routes'
import { PaymentPopUpResponse } from '@/service/accounting/accountMove/getDetail/type'
import { DebtPaidLine } from '@/service/accounting/debtReceivable/getDetail/type'

export const checkInvoice = (val: DebtPaidLine | PaymentPopUpResponse) => {
  if (!val) return null
  else {
    const {
      type,
      saleType,
      moveType,
      payType,
      paymentType,
      paymentMethod,
      accountPaymentId,
      accountMoveId,
    } = val

    let pathname = '#'
    if (payType === 'BY_PAYMENT') {
      if (paymentMethod === 'CASH') {
        pathname = `${MENU_URL.CASH_ACCOUNT[paymentType]}/[id]`
      } else if (paymentMethod === 'BANK') {
        pathname = `${MENU_URL.BANK_ACCOUNT[paymentType]}/[id]`
      }
    } else if (payType === 'BY_ACCOUNT_MOVE') {
      if (moveType === 'IN_INVOICE' || moveType === 'IN_REFUND') {
        pathname = `${
          MENU_URL.PROVIDER[moveType === 'IN_INVOICE' ? 'INVOICE' : 'REFUND']
        }/[id]`
      } else if (moveType === 'OUT_INVOICE' || moveType === 'OUT_REFUND') {
        if (type === 'INTERNAL') {
          pathname = `${
            MENU_URL.CUSTOMER[moveType === 'OUT_INVOICE' ? 'INVOICE' : 'REFUND']
              .NORMAL.INTERNAL
          }/[id]`
        } else {
          pathname = `${
            MENU_URL.CUSTOMER[moveType === 'OUT_INVOICE' ? 'INVOICE' : 'REFUND']
              .NORMAL[saleType]
          }/[id]`
        }
      } else if (moveType === 'ENTRY') {
        pathname = `${MENU_URL.ENTRY.ENTRY_INVOICE}/[id]`
      }
    } else if (payType === 'DECLARE_BANK') {
      pathname = `${MENU_URL.BALANCE.BANK_BALANCE}/[id]`
    } else if (payType === 'DECLARE_CUSTOMER') {
      pathname = `${MENU_URL.BALANCE.CUSTOMER}/[id]`
    } else if (payType === 'DECLARE_VENDOR') {
      pathname = `${MENU_URL.BALANCE.PROVIDER}/[id]`
    } else if (payType === 'BY_ANOTHER') {
      pathname = `${MENU_URL.GENERAL_ACC.OTHER_DOC}/[id]`
    }

    return {
      pathname,
      id: accountPaymentId || accountMoveId,
    }
  }
}
