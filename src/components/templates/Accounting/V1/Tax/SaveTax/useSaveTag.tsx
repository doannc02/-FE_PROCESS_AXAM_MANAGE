import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { scopeTypeWithAllSelect, taxTypeList } from '@/enum'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { useQueryGetTaxDetail } from '@/service/accounting/tax/getDetail'
import { postTax, putTax } from '@/service/accounting/tax/save'
import { RequestBody } from '@/service/accounting/tax/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const defaultValues = {
  name: '',
  scopeType: null,
  taxComputeType: '',
  type: '',
  isIncludedPrice: false,
  isAffectingBase: false,
  baseIsAffected: false,
  description: ' ',
  isActive: true,
  repartitions: [
    {
      scopeType: null,
      account: null,
    },
  ],
}

const useSaveTax = () => {
  const { t } = useTranslation(TRANSLATE.TAX)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { control, handleSubmit, reset, watch, setError, setValue } = methodForm

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putTax : postTax,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.CONFIG.ACCOUNTING.TAX}/[id]`,
            query: {
              id: res?.data?.data?.id,
              actionType: 'VIEW',
            },
          })
        }
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      ...data,
      amount: data.amount ?? 0,
      repartitions: data?.repartitions?.map((item, index) => {
        return { ...item, sequence: index }
      }),
    })
  })

  const { data, isLoading } = useQueryGetTaxDetail({ id }, { enabled: !!id })

  useEffect(() => {
    if (id && data && data.data) {
      reset({
        ...data.data,
      })
    }
  }, [id, data, reset])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'repartitions',
    keyName: 'key',
  })

  const columns = useMemo(
    () =>
      [
        ...(watch('type') === 'VAT_RATES'
          ? [
              {
                header: 'Phạm vi sử dụng',
                fieldName: 'scopeType',
              },
            ]
          : [
              {
                header: 'Kiểu thuế',
                fieldName: 'type',
              },
            ]),
        {
          header: 'Tài khoản',
          fieldName: 'account',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch('type')]
  )

  const tableData = fields.map((field, index) => {
    return {
      type: taxTypeList.find((ele) => ele.value === watch('type'))?.label,
      scopeType: scopeTypeWithAllSelect.find(
        (ele) => ele.value === watch(`repartitions.${index}.scopeType`)
      )?.label,
      account: (
        <CoreAutoCompleteAPI
          key={field.key}
          label=''
          control={control}
          name={`repartitions.${index}.account`}
          placeholder='Chọn tài khoản'
          disableClearable
          valuePath='id'
          labelPath='name'
          labelPath2='code'
          isHasMessageError={false}
          rules={{ required: t('common:validation.required') }}
          fetchDataFn={getAccountList}
        />
      ),
      action:
        index > 0 ? (
          <Action
            actionList={['delete']}
            onDeleteAction={() => remove(index)}
          />
        ) : null,
    }
  })

  return [
    {
      id,
      name: data?.data.name,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      methodForm,
      columns,
      tableData,
      isView,
    },
    { t, onSubmit, onCancel, append },
  ] as const
}

export default useSaveTax
