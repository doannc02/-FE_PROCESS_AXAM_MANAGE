import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import { ColumnProps } from '@/components/organism/CoreTable'
import { taxType } from '@/enum'
import { RED } from '@/helper/colors'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL, TRANSLATE } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountConfig } from '@/service/accounting/accountConfig/get'
import { actionOtherDocument } from '@/service/accounting/otherDocument/action'
import { ReqSaveOtherDocument } from '@/service/accounting/otherDocument/action/type'
import { useQueryGetOtherDocumentDetail } from '@/service/accounting/otherDocument/get'
import { getTaxList } from '@/service/accounting/tax/getList'
import { getBranchList } from '@/service/common/branch/getList'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { CommonObject } from '@/service/type'
import { getDateNow } from '@/utils/date/date'
import { getTranText } from '@/utils/tranText'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'
import { computeTaxUntil } from './computeTax'

const useSaveOtherDocument = () => {
  const { t } = useTranslation(TRANSLATE.OTHER_DOCUMENT)
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { showDialog, hideDialog } = useDialog()

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { id: branchNowId } = useAppSelector((state) => state.branchData)

  const { paymentType, paymentMethod, paymentMethodURL, typePath } =
    useCheckPath()
  const { id: idLedger } = useAppSelector((state) => state.ledgerRefData)

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

  const methodForm = useFormCustom<ReqSaveOtherDocument>({
    defaultValues: {
      accountLedger: {
        id: Number(idLedger),
      },
      documentType: 'OTHER',
      code: '',
      date: getDateNow(),
      accountingDate: getDateNow(),
      isWithInvoice: true,
      entryList: [
        {
          label: 'Nội dung',
          amount: 0,
        },
      ],
      invoiceTaxes: [
        {
          taxType: 'INPUT_TAX_INCREASE',
          amountUntaxed: 0,
          taxAmount: 0,
          numberInvoice: 'HD1',
          date: getDateNow(),
        },
      ],
    },
  })

  const {
    handleSubmit,
    reset,
    watch,
    control,
    setError,
    getValues,
    setValue,
    trigger,
  } = methodForm

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'entryList',
    keyName: 'key',
  })

  const [documentTypeWatch] = watch(['documentType'])

  const {
    data: otherDocumentData,
    isLoading,
    refetch,
  } = useQueryGetOtherDocumentDetail({ id: Number(id) }, { enabled: !!id })

  const { data: dataAccountConfig, isLoading: isAccountingConfigLoading } =
    useQueryGetAccountConfig()

  useEffect(() => {
    if (id && otherDocumentData?.data) {
      reset({
        ...otherDocumentData?.data,
        accountLedger: {
          id: Number(idLedger),
        },
        entryList: otherDocumentData?.data?.entryList ?? [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, idLedger, otherDocumentData?.data])

  const {
    fields: invoiceTaxesFields,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control,
    name: 'invoiceTaxes',
  })

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
          header: t('enTryTable.amount') + ` (${currency})`,
          fieldName: 'amount',
        },

        ...(documentTypeWatch === 'OTHER'
          ? [
              {
                header: t('enTryTable.partnerDebit'),
                fieldName: 'partnerDebit',
              },
              {
                header: t('enTryTable.partnerCredit'),
                fieldName: 'partnerCredit',
              },
            ]
          : []),

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
    [t, currency, documentTypeWatch]
  )

  const isCheckPartner = (account: CommonObject) => {
    if (dataAccountConfig && account) {
      if (account.id === dataAccountConfig?.data?.receivableAccount?.id) {
        return 'EXTERNAL'
      } else if (account.id === dataAccountConfig?.data?.payableAccount?.id) {
        return 'EXTERNAL'
      } else if (
        account.id === dataAccountConfig?.data?.receivableInternalAccount?.id ||
        account.id === dataAccountConfig?.data?.payableInternalAccount?.id
      ) {
        return 'INTERNAL'
      }
    }

    return null
  }

  const getFilterParam = (account: CommonObject, account2: CommonObject) => {
    if (dataAccountConfig && account) {
      if (account2) {
        if (
          (dataAccountConfig?.data?.receivableAccount?.id === account.id &&
            dataAccountConfig?.data?.payableAccount?.id === account2.id) ||
          (dataAccountConfig?.data?.receivableAccount?.id === account2.id &&
            dataAccountConfig?.data?.payableAccount?.id === account.id)
        ) {
          return {
            isCustomerAndVendor: true,
            activated: true,
          }
        }
      }

      if (account.id === dataAccountConfig?.data?.receivableAccount?.id) {
        return {
          isCustomer: true,
          activated: true,
        }
      } else if (account.id === dataAccountConfig?.data?.payableAccount?.id) {
        return {
          isVendor: true,
          vendorActivated: true,
        }
      } else if (
        account.id === dataAccountConfig?.data?.receivableInternalAccount?.id ||
        account.id === dataAccountConfig?.data?.payableInternalAccount?.id
      ) {
        return {
          isDefaultCompany: true,
          branchNowId,
          activated: true,
        }
      }
    }

    return {}
  }

  const getFilterFn = (account: CommonObject) => {
    if (dataAccountConfig && account) {
      if (
        account.id === dataAccountConfig?.data?.receivableAccount?.id ||
        account.id === dataAccountConfig?.data?.payableAccount?.id
      ) {
        return getPartnerList
      } else if (
        account.id === dataAccountConfig?.data?.receivableInternalAccount?.id ||
        account.id === dataAccountConfig?.data?.payableInternalAccount?.id
      ) {
        return getBranchList
      }
    }

    return getPartnerList
  }

  const tableData = fields.map((field, index) => {
    return isView
      ? {
          ...field,
          key: field.key,
          label: watch(`entryList.${index}.label`),
          accountDebit: getTranText(watch(`entryList.${index}.accountDebit`)),
          accountCredit: getTranText(watch(`entryList.${index}.accountCredit`)),
          partnerDebit: getTranText(watch(`entryList.${index}.partnerDebit`)),
          partnerCredit: getTranText(watch(`entryList.${index}.partnerCredit`)),
          amount: (
            <CurrencyFormatCustom
              amount={watch(`entryList.${index}.amount`)}
              color={RED}
            />
          ),
        }
      : {
          ...field,
          key: field.key,
          label: (
            <CoreInput
              key={field.key}
              control={control}
              name={`entryList.${index}.label`}
              placeholder='Nhập nội dung'
            />
          ),
          accountDebit: (
            <CoreAutoCompleteAPI
              key={field.key}
              control={control}
              name={`entryList.${index}.accountDebit`}
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
              onChangeValue={(val) => {
                if (val?.id) {
                  setValue(
                    `entryList.${index}.typeDebit`,
                    isCheckPartner(watch(`entryList.${index}.accountDebit`))
                  )
                }
              }}
            />
          ),
          accountCredit: (
            <CoreAutoCompleteAPI
              key={field.key}
              control={control}
              name={`entryList.${index}.accountCredit`}
              label={''}
              placeholder='Chọn tài khoản có'
              fetchDataFn={getAccountList}
              required
              rules={{
                required: t('common:validation.required'),
                validate: {
                  diff: (v: any) =>
                    v?.id !== watch(`entryList.${index}.accountDebit`)?.id ||
                    'diff',
                },
              }}
              labelPath='name'
              labelPath2='code'
              isHasMessageError={false}
              disableClearable
              onChangeValue={(val) => {
                if (val?.id) {
                  setValue(
                    `entryList.${index}.typeCredit`,
                    isCheckPartner(watch(`entryList.${index}.accountCredit`))
                  )
                }
              }}
            />
          ),
          amount: (
            <CoreInput
              key={field.key}
              control={control}
              type='number'
              name={`entryList.${index}.amount`}
              placeholder='Nhập số tiền'
              required
              rules={{
                required: t('common:validation.required'),
                validate: {
                  min: (v: number) => v > 0 || 'min',
                },
              }}
              isHasMessageError={false}
              onChangeValue={(val) => {
                setValue(`invoiceTaxes.${index}.amountUntaxed`, val)
              }}
            />
          ),
          partnerDebit: isCheckPartner(
            watch(`entryList.${index}.accountDebit`)
          ) ? (
            <CoreAutoCompleteAPI
              key={field.key}
              control={control}
              name={`entryList.${index}.partnerDebit`}
              label={''}
              placeholder='Đối tượng nợ'
              fetchDataFn={
                getFilterFn(watch(`entryList.${index}.accountDebit`)) as any
              }
              params={getFilterParam(
                watch(`entryList.${index}.accountDebit`),
                watch(`entryList.${index}.accountCredit`)
              )}
              isHasMessageError={false}
              disableClearable
            />
          ) : null,
          partnerCredit: isCheckPartner(
            watch(`entryList.${index}.accountCredit`)
          ) ? (
            <CoreAutoCompleteAPI
              key={field.key}
              control={control}
              name={`entryList.${index}.partnerCredit`}
              label={''}
              placeholder='Đối tượng có'
              fetchDataFn={
                getFilterFn(watch(`entryList.${index}.accountCredit`)) as any
              }
              params={getFilterParam(
                watch(`entryList.${index}.accountCredit`),
                watch(`entryList.${index}.accountDebit`)
              )}
              isHasMessageError={false}
              disableClearable
            />
          ) : null,
          remove: (
            <div className='flex justify-center'>
              {index > 0 && (
                <TopAction
                  key={field.key}
                  actionList={['delete']}
                  isShowText={false}
                  onDeleteAction={() => {
                    remove(index)
                    remove2(index)
                  }}
                />
              )}
            </div>
          ),
        }
  })

  const columns2 = useMemo(
    () =>
      [
        {
          header: 'Loại thuế',
          fieldName: 'taxType',
        },
        {
          header: 'Giá trị hàng hóa trước thuế' + ` (${currency})`,
          fieldName: 'amountUntaxed',
        },
        {
          header: 'Thuế GTGT',
          fieldName: 'tax',
        },
        {
          header: 'Tiền thuế GTGT' + ` (${currency})`,
          fieldName: 'taxAmount',
        },
        {
          header: 'Số hóa đơn',
          fieldName: 'numberInvoice',
        },
        {
          header: 'Ngày lập chứng từ',
          fieldName: 'date',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, currency]
  )

  const tableData2 = (watch('invoiceTaxes') ?? []).map((item, index) => {
    return isView
      ? {
          ...item,
          taxType: taxType.find((ele) => ele.value === item.taxType)?.label,
          tax: item?.tax?.name,
          taxAmount: (
            <CurrencyFormatCustom
              amount={watch(`invoiceTaxes.${index}.taxAmount`)}
              color={RED}
            />
          ),
          amountUntaxed: (
            <CurrencyFormatCustom amount={item.amountUntaxed} color={RED} />
          ),
        }
      : {
          ...item,
          tax: (
            <CoreAutoCompleteAPI
              control={control}
              name={`invoiceTaxes.${index}.tax`}
              label={''}
              placeholder='Chọn thuế'
              fetchDataFn={getTaxList}
              isHasMessageError={false}
              disableClearable
              onChangeValue={async (val) => {
                const taxAmount = await computeTaxUntil(
                  item.amountUntaxed,
                  val,
                  watch(`invoiceTaxes.${index}.taxType`)
                )
                setValue(`invoiceTaxes.${index}.taxAmount`, taxAmount)
              }}
            />
          ),
          taxType: (
            <CoreAutocomplete
              control={control}
              name={`invoiceTaxes.${index}.taxType`}
              placeholder='Chọn thuế'
              options={taxType}
              disableClearable
              onChangeValue={async (val) => {
                const taxAmount = await computeTaxUntil(
                  item.amountUntaxed,
                  watch(`invoiceTaxes.${index}.tax`),
                  val
                )
                setValue(`invoiceTaxes.${index}.taxAmount`, taxAmount)
              }}
            />
          ),
          taxAmount: (
            <CurrencyFormatCustom
              amount={watch(`invoiceTaxes.${index}.taxAmount`)}
              color={RED}
            />
          ),
          amountUntaxed: (
            <CurrencyFormatCustom
              amount={watch(`invoiceTaxes.${index}.amountUntaxed`)}
              color={RED}
            />
          ),

          numberInvoice: (
            <CoreInput
              control={control}
              name={`invoiceTaxes.${index}.numberInvoice`}
              placeholder='Nhập số hóa đơn'
              required
              rules={{
                required: t('common:validation.required'),
              }}
              isHasMessageError={false}
            />
          ),
          date: (
            <CoreDatePicker
              control={control}
              name={`invoiceTaxes.${index}.date`}
              title=''
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
              required
              rules={{
                required: t('common:validation.required'),
              }}
              isHasMessageError={false}
            />
          ),
        }
  })

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    actionOtherDocument,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))

        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.GENERAL_ACC.OTHER_DOC}/[id]`,
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
    router.push(MENU_URL.GENERAL_ACC.OTHER_DOC)
  }

  const onSubmit = handleSubmit(async (input) => {
    mutate({
      method: isUpdate ? 'put' : 'post',
      params: {},
      data: {
        ...input,
        invoiceTaxes: input.isWithInvoice ? input.invoiceTaxes : [],
      },
    })
  })

  return [
    {
      id,
      code: getValues('code'),
      isUpdate,
      isView,
      isLoading,
      methodForm,
      isLoadingSubmit,
      paymentType,
      paymentMethod,
      paymentMethodURL,
      incomeExpenseColumns,
      tableData,
      tableData2,
      columns,
      columns2,
    },
    {
      t,
      showDialog,
      hideDialog,
      onCancel,
      onSubmit,
      refetch,
      remove,
      append,
      remove2,
      append2,
    },
  ] as const
}

export default useSaveOtherDocument
