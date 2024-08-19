import ConvertCurrency from '@/components/atoms/ConvertCurrency'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RED } from '@/helper/colors'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL, TRANSLATE } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountPaymentDetail } from '@/service/accounting/accountPayment/getDetail'
import {
  postCreateInternalTransfer,
  putCreateInternalTransfer,
} from '@/service/accounting/accountPayment/saveTransfer'
import { RequestBody } from '@/service/accounting/accountPayment/saveTransfer/type'
import { getCurrencyRate } from '@/service/common/currencyRate/getRate'
import { getDateNow } from '@/utils/date/date'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const useSaveBankAndCashAccount = () => {
  const { t } = useTranslation(TRANSLATE.BANK_CASH_ACCOUNT)
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { showDialog, hideDialog } = useDialog()

  const { currencyId, currency } = useAppSelector(
    (state) => state.companyConfigData
  )

  const { paymentType, paymentMethod, paymentMethodURL, typePath } =
    useCheckPath()
  const { id: idLedger } = useAppSelector((state) => state.ledgerRefData)

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      code: '',
      type: 'PARTNER',
      partnerType: paymentType === 'INBOUND' ? 'CUSTOMER' : 'VENDOR',
      paymentType,
      paymentDate: getDateNow(),
      ledgerRefs: [
        {
          accountLedger: null,
          accountJournal: null,
        },
      ],
      accountLedger: {
        id: idLedger,
      },
      currency: {
        id: currencyId,
        name: currency,
      },
      isAnotherBook: false,
      isCreateAnotherBook: null,
      state: 'DRAFT',
      paymentEntry: [
        {
          label: 'Nội dung',
          accountCredit: null,
          accountDebit: null,
          amount: 0,
          manufactures: [],
        },
      ],
    },
  })

  const { handleSubmit, reset, watch, control, setError, getValues, setValue } =
    methodForm

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ledgerRefs',
  })

  const {
    fields: paymentEntryFields,
    append: paymentEntryAppend,
    remove: paymentEntryRemove,
  } = useFieldArray({
    control,
    name: 'paymentEntry',
  })

  const {
    data: paymentData,
    isLoading,
    refetch,
  } = useQueryGetAccountPaymentDetail({ id: Number(id) }, { enabled: !!id })

  const tableData = (paymentEntryFields ?? []).map((item, index) => {
    console.log(item)
    return isView
      ? {
          ...item,
          accountCredit:
            item?.accountCredit?.code + ' - ' + item?.accountCredit?.name,
          accountDebit:
            item?.accountDebit?.code + ' - ' + item?.accountDebit?.name,
          amount:
            item?.currencySource?.name !== item?.currency?.name ? (
              <div className='flex gap-3'>
                <CurrencyFormatCustom
                  amount={item.amount}
                  color={RED}
                  showCurrencyName
                  currencyProp={item.currencySource?.name}
                />
                -
                <ConvertCurrency
                  currencyRateData={
                    {
                      amount: item?.amount,
                      amountSource: item?.amountSource,
                      amountChange: item.amountSource,
                      currencySource: item?.currencySource,
                      currencyDes: item?.currency,
                    } as any
                  }
                />
              </div>
            ) : (
              <CurrencyFormatCustom
                amount={item.amount}
                color={RED}
                showCurrencyName
                currencyProp={item.currencySource?.name}
              />
            ),
        }
      : {
          ...item,
          label: (
            <CoreInput
              control={control}
              name={`paymentEntry.${index}.label`}
              placeholder='Nhập nội dung'
            />
          ),
          accountDebit: (
            <CoreAutoCompleteAPI
              control={control}
              name={`paymentEntry.${index}.accountDebit`}
              label={''}
              placeholder='Chọn tài khoản nợ'
              fetchDataFn={getAccountList}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              labelPath='name'
              labelPath2='code'
              isHasMessageError={false}
              disableClearable
            />
          ),
          accountCredit: (
            <CoreAutoCompleteAPI
              control={control}
              name={`paymentEntry.${index}.accountCredit`}
              label={''}
              placeholder='Chọn tài khoản có'
              fetchDataFn={getAccountList}
              required
              rules={{
                required: t('common:validation.required'),
                validate: {
                  diff: (v: any) =>
                    v?.id !== watch(`paymentEntry.${index}.accountDebit`)?.id ||
                    'diff',
                },
              }}
              labelPath='name'
              labelPath2='code'
              isHasMessageError={false}
              disableClearable
            />
          ),
          amount: (
            <div className='flex flex-col gap-4'>
              <CoreInput
                control={control}
                type='number'
                name={`paymentEntry.${index}.amount`}
                placeholder='Nhập số tiền'
                required
                rules={{
                  required: t('common:validation.required'),
                  validate: {
                    min: (v: number) => v > 0 || 'min',
                  },
                }}
                isHasMessageError={false}
                onChangeValue={async (val) => {
                  if (val && watch('currency')?.id !== currencyId) {
                    const { data } = await getCurrencyRate({
                      isSale: paymentType === 'OUTBOUND' ? false : true,
                      amount: val,
                      currencySourceId: watch('currency')?.id,
                    })
                    setValue(`paymentEntry.${index}.currencyRate`, data)
                  }
                }}
              />

              {watch(`paymentEntry.${index}.amount`) > 0 &&
                watch('currency')?.id !== currencyId &&
                watch(`paymentEntry.${index}.currencyRate`) && (
                  <ConvertCurrency
                    variant='body1'
                    currencyRateData={
                      watch(`paymentEntry.${index}.currencyRate`) as any
                    }
                  />
                )}
            </div>
          ),
          remove: (
            <div className='flex justify-center'>
              {index > 0 && (
                <TopAction
                  actionList={['delete']}
                  isShowText={false}
                  onDeleteAction={() => {
                    paymentEntryRemove(index)
                  }}
                />
              )}
            </div>
          ),
        }
  })

  useEffect(() => {
    if (id && paymentData) {
      reset({
        ...paymentData.data,
        accountLedger: {
          id: idLedger,
        },
      })
    }
  }, [id, idLedger, paymentData, reset])

  const columns = useMemo(
    () =>
      [
        {
          header: t('enTryTable.label'),
          fieldName: 'label',
        },
        {
          header: t('enTryTable.accountDebit'),
          fieldName: 'accountDebit',
        },
        {
          header: t('enTryTable.accountCredit'),
          fieldName: 'accountCredit',
        },
        {
          header: t('enTryTable.amount') + ` (${watch('currency')?.name})`,
          fieldName: 'amount',
        },
        ...(!isView
          ? [
              {
                header: '',
                fieldName: 'remove',
              },
            ]
          : []),
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, watch('currency')?.name]
  )

  const incomeExpenseColumns = useMemo(
    () =>
      [
        {
          header: 'Mã đối tượng',
          fieldName: 'code',
        },
        {
          header: 'Tên đối tượng',
          fieldName: 'name',
        },
        {
          header: 'Mô tả',
          fieldName: 'description',
        },
      ] as ColumnProps[],
    []
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putCreateInternalTransfer : postCreateInternalTransfer,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL[paymentMethodURL][paymentType]}/[id]`,
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

  const onCancel = () => {
    router.back()
  }

  const onDraftSubmit = handleSubmit(async (input) => {
    console.log(input, 'input')
    watch('isAnotherBook') === false
      ? mutate({ ...input, ledgerRefs: [], state: 'DRAFT' })
      : mutate({ ...input, state: 'DRAFT' })
  })

  const onSubmit = handleSubmit(async (input) => {
    watch('isAnotherBook') === false
      ? mutate({ ...input, ledgerRefs: [], state: 'POSTED' })
      : mutate({ ...input, state: 'POSTED' })
  })

  return [
    {
      id,
      code: getValues('code'),
      currencyId,
      isUpdate: !!id,
      isView: actionType === 'VIEW',
      isLoading,
      methodForm,
      columns,
      tableData,
      isLoadingSubmit,
      incomeExpenseColumns,
      fields,
      idLedger,
      paymentType,
      paymentMethod,
      paymentMethodURL,
    },
    {
      t,
      showDialog,
      hideDialog,
      onCancel,
      onSubmit,
      onDraftSubmit,
      refetch,
      append,
      remove,
      paymentEntryAppend,
      paymentEntryRemove,
    },
  ] as const
}

export default useSaveBankAndCashAccount
