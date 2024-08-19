import { useDialog } from '@/components/hooks/dialog/useDialog'
import { checkingTypeInvoice } from '@/helper/chkTypeInvPath'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { useQueryGetAccountMoveDetail } from '@/service/accounting/accountMove/getDetail'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import {
  postAccountMove,
  putAccountMove,
} from '@/service/accounting/accountMove/save'
import { getDateNow } from '@/utils/date/date'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import {
  typeInvoiceNew,
  typeInvoiceOrRefund,
  typePathInvoiceNew,
} from '../Helper/typeInvoiceNew'

const useSaveInvoice = () => {
  const { t } = useTranslation(TRANSLATE.ACCOUNT_INVOICE)
  const {
    typePath,
    typeOfInvoice,
    typeInvoice: typeCustomerInv,
    typeOfInvoiceCustomer,
    invoiceCk,
  } = useCheckPath()

  const typeInvoice = useMemo(() => {
    return checkingTypeInvoice(
      typePath,
      typeOfInvoice,
      typeCustomerInv,
      typeOfInvoiceCustomer
    )
  }, [typeCustomerInv, typeOfInvoice, typeOfInvoiceCustomer, typePath])

  let pathname = useMemo(() => {
    return typePathInvoiceNew(
      typePath,
      invoiceCk,
      typeOfInvoiceCustomer,
      typeCustomerInv,
      typeOfInvoice
    )
  }, [
    invoiceCk,
    typeCustomerInv,
    typeOfInvoice,
    typeOfInvoiceCustomer,
    typePath,
  ])

  const router = useRouter()
  const { actionType, id } = router.query
  const isUpdate = !!id

  const { showDialog } = useDialog()
  const { id: idLedger } = useAppSelector((state) => state.ledgerRefData)
  const currencyId = useAppSelector(
    (state) => state.companyConfigData.currencyId
  )

  const moveType = useMemo(() => {
    return typeInvoiceOrRefund({ router })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  const methodForm = useFormCustom<AccountMoveDetail>({
    defaultValues: {
      id: null,
      code: '',
      isWithInvoice: true,
      moveType: moveType,
      paymentStatus: 'NOT_PAYMENT',
      state: 'DRAFT',
      scopeType:
        typePath === 'CUSTOMER' ? 'DOMESTICALLY' : 'DOMESTIC_WAREHOUSE',
      date: getDateNow(),
      accountingDate: getDateNow(),
      dueDate: null,
      accountPaymentId: null,
      purchaseOrderId: null,
      saleOrderId: null,
      currency: { id: currencyId },
      invoiceLines: [
        {
          taxes: [],
          discount: 0,
          //  warehouse: {},
          amountTotal: 0,
          amountUntaxed: 0,
          lineTax: 0,
          importTax: 0, // thuế nhập khẩu   (không được bằng null, auto thì truyền 0)
          specialConsumptionTax: 0, // thuế tiêu thụ đặc biệt   (không được bằng null, auto thì truyền 0)
          environmentalResourceTax: 0, //  môi trường  (không được bằng null, auto thì truyền 0)
          vat: 0, // thuế GTGT        (không được bằng null, auto thì truyền 0)
        },
      ],
      invoiceDate: getDateNow(),
      amountTotal: 0,
      movePunishes: [],
      paymentResponses: [],
      moneyBalanceResponses: [],
      ledgerRefs: [{ accountLedger: null, accountJournal: null }],
      accountLedger: {
        id: idLedger,
        name: '',
        code: '',
      },
      ...(typePath === 'CUSTOMER'
        ? {
            isWithDeliveryNote: true,
            isTakePricePolicy:
              typeCustomerInv !== 'OEM' &&
              typeCustomerInv !== 'LIQUIDATION' &&
              typeCustomerInv !== 'INTERNAL'
                ? true
                : false,
          }
        : {}), // kèm phiếu xuất kho
      isAnotherBook: false,
      isCreateAnotherBook: false,
      moveLines: [],
      invoiceFormNumber: 'ELECTRONIC_BILL',
    },
  })

  const { handleSubmit, reset, setError } = methodForm

  const { isLoading, data, refetch } = useQueryGetAccountMoveDetail(
    {
      moveType: moveType,
      id: Number(id),
      typePathInv: typePath,
      typeSale: typeOfInvoice,
      typeInvoice: typeInvoiceNew(
        typePath,
        invoiceCk,
        typeCustomerInv,
        typeOfInvoice,
        typeOfInvoiceCustomer
      ),
    },
    { enabled: !!id }
  )

  const [tabNumber, setTabNumber] = useState<number>(0)

  useEffect(() => {
    if (id && data?.data) {
      reset({
        ...data.data,
        invoiceLines: (data?.data?.invoiceLines ?? []).map((item) =>
          item?.warehouse
            ? {
                ...item,
                taxIds: (item?.taxes ?? []).map((item) => item?.id),
                lineTax: item.amountTotal - item.amountUntaxed,
              }
            : {
                ...item,

                taxIds: (item?.taxes ?? []).map((item) => item?.id),
                lineTax: item.amountTotal - item.amountUntaxed,
              }
        ),
        moveLines: (data?.data?.moveLines ?? []).map((item) => ({
          ...item,
          accountId: item.account.id,
          accountTagIds: (item.accountTags ?? []).map((item) => item.id),
        })),
        totalTax: data.data.amountTotal - data.data.amountUntaxed,
        accountLedger: {
          id: idLedger,
          name: '',
          code: '',
        },
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data?.data])

  // SUBMIT
  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAccountMove : postAccountMove,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))

        if (res?.data?.data?.id) {
          router.push({
            pathname: `${pathname}/[id]`,
            query: {
              id: res?.data?.data?.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        }
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const checkValidateFn = (input: AccountMoveDetail) => {
    let flag = true

    const { moveLines, invoiceLines } = input

    if (!invoiceLines || invoiceLines.length < 1) {
      errorMsg('Vui lòng nhập thông tin sản phẩm.')
      flag = false
    }

    ;(moveLines ?? []).map((item, index) => {
      if (!item.account?.id) {
        if (tabNumber !== 1) setTabNumber(1)
        setError(`moveLines.${index}.account`, {
          message: t('common:validation.required').toString(),
        })
        flag = false
      }
    })

    return flag
  }

  const onSubmit = handleSubmit(async (input) => {
    const { invoiceFormNumber, invoiceDate, codeInvoice, symbol, ...rest } =
      input
    if (checkValidateFn(input)) {
      mutate({
        requestBody: {
          ...(input.isWithInvoice ? input : rest),
          state: 'AWAITING_POSTED',
          ledgerRefs: input.isAnotherBook ? input.ledgerRefs : [],
        },
        typeInvoice: typeInvoice,
      })
    }
  })

  const onDraftSubmit = async (input: AccountMoveDetail) => {
    const { invoiceFormNumber, invoiceDate, codeInvoice, symbol, ...rest } =
      input
    mutate({
      requestBody: {
        ...(input.isWithInvoice ? input : rest),
        state: 'DRAFT',
        ledgerRefs: input.isAnotherBook ? input.ledgerRefs : [],
      },
      typeInvoice: typeInvoice,
    })
  }

  return [
    {
      pathname,
      tabNumber,
      typeInvoice,
      typePath,
      typeOfInvoice,
      id,
      actionType,
      data,
      invoiceName: data ? data?.data?.code : '',
      isUpdate,
      isLoading,
      isLoadingSubmit,
      methodForm,
    },
    {
      refetch,
      onSubmit,
      onDraftSubmit,
      onCancel,
      showDialog,
      checkValidateFn,
    },
  ] as const
}

export default useSaveInvoice
