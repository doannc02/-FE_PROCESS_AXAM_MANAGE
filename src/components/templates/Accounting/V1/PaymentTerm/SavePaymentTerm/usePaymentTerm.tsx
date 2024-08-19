import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { useQueryGetPaymentTermDetail } from '@/service/accounting/paymentTerm/getDetail'
import {
  postPaymentTerm,
  putPaymentTerm,
} from '@/service/accounting/paymentTerm/save'
import { RequestBody } from '@/service/accounting/paymentTerm/save/type'
import { format } from 'date-fns'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const defaultValues = {
  name: '',
  hasEarlyDiscount: false,
  discountAmount: 0,
  discountComputeType: 'PERCENT',
  withinDays: 0,
  description: '',
  lines: [
    {
      id: null,
      amountDue: 0,
      computeType: 'PERCENT',
      afterDays: 0,
      anchorDate: 'INVOICE_DATE',
    },
  ],
  deleteLineIds: [],
}

const computeTypeSelect = [
  {
    label: 'Giá cố định',
    value: 'FIXED',
  },
  {
    label: 'Phần trăm',
    value: 'PERCENT',
  },
]

const anchorDateSelect = [
  {
    label: 'Ngày tạo chứng từ',
    value: 'INVOICE_DATE',
  },
  {
    label: 'Ngày cuối tháng này',
    value: 'END_OF_MONTH',
  },
  {
    label: 'Ngày cuối của tháng tiếp theo',
    value: 'END_OF_NEXT_MONTH',
  },
]

const usePaymentTerm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const id = Number(router.query?.id)
  const { actionType } = router.query
  const isUpdate = !!id

  const { typePath } = useCheckPath()

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      ...defaultValues,
      type: typePath === 'PROVIDER' ? 'PURCHASE' : 'SALE',
    },
  })

  let pathname = useMemo(() => {
    return typePath === 'PROVIDER'
      ? `${MENU_URL.PROVIDER.PAYMENT_TERM}/[id]`
      : `${MENU_URL.CUSTOMER.PAYMENT_TERM}/[id]`
  }, [typePath])

  const { control, formState, handleSubmit, reset, setError, setValue, watch } =
    methodForm

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putPaymentTerm : postPaymentTerm,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${pathname}`,
          query: {
            id: res?.data?.data?.id,
            actionType: 'VIEW',
          },
        })
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lines',
    keyName: 'key',
  })

  const columns = useMemo(
    () =>
      [
        {
          header: 'Đến hạn',
          fieldName: 'due',
          styleCell: {
            width: '315px',
          },
        },
        {
          header: 'Sau',
          fieldName: 'after',
          styleCell: {
            width: '375px',
          },
        },
        {
          header: '',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    []
  )

  const updateDes = useCallback(() => {
    let result: string[] = []
    const lines = watch('lines') ?? []

    const totalFixed = lines
      .filter((item) => item.computeType === 'FIXED')
      .map((item) => item.amountDue)
      .reduce((a, b) => a + b, 0)

    let discount = 0

    if (
      watch('hasEarlyDiscount') &&
      watch('discountAmount') &&
      watch('withinDays')
    ) {
      let dateDiscount = moment()
        .add(watch('withinDays'), 'd')
        .format('DD/MM/YYYY')

      if (watch('discountComputeType') === 'FIXED') {
        discount = watch('discountAmount')
        result.push(
          `+ Giảm giá thanh toán sớm ${watch(
            'discountAmount'
          )}đ nếu thanh toán trước ${dateDiscount}`
        )
      } else if (watch('discountComputeType') === 'PERCENT') {
        discount = (watch('discountAmount') / 100) * 1000
        result.push(
          `+ Giảm giá thanh toán sớm ${
            (watch('discountAmount') / 100) * 1000
          }đ nếu thanh toán trước ${dateDiscount}`
        )
      }
    }

    lines
      .filter((item) => item.amountDue > 0)
      .map((item) => {
        let date = moment().add(item.afterDays, 'd').format('DD/MM/YYYY')
        if (item.anchorDate === 'END_OF_MONTH') {
          date = moment()
            .endOf('month')
            .add(item.afterDays, 'd')
            .format('DD/MM/YYYY')
        } else if (item.anchorDate === 'END_OF_NEXT_MONTH') {
          date = moment()
            .add(1, 'months')
            .endOf('month')
            .add(item.afterDays, 'd')
            .format('DD/MM/YYYY')
        }

        if (item.computeType === 'FIXED') {
          result.push(
            `+ Cần phải thanh toán ${item.amountDue}đ nếu thanh toán trước ${date}`
          )
        } else if (item.computeType === 'PERCENT') {
          result.push(
            `+ Cần phải thanh toán ${
              ((1000 - discount - totalFixed) * item.amountDue) / 100
            }đ nếu thanh toán trước ${date}`
          )
        }
      })

    setValue('description', result.join('--'))
  }, [setValue, watch])

  const tableData = (fields ?? []).map((field, index) => {
    if (actionType === 'VIEW') {
      return {
        due:
          field.amountDue +
          ' - ' +
          computeTypeSelect.find((c) => c.value === field.computeType)?.label,
        after:
          field.afterDays +
          ' ' +
          anchorDateSelect.find((a) => a.value === field.anchorDate)?.label,
      }
    }
    return {
      due: (
        <CoreInput
          control={control}
          name={`lines.${index}.amountDue`}
          type='number'
          onChangeValue={updateDes}
          InputProps={{
            style: { paddingRight: 0, width: '310px' },
            endAdornment: (
              <CoreAutocomplete
                InputProps={{ style: { borderRadius: 0, width: '120px' } }}
                control={control}
                name={`lines.${index}.computeType`}
                placeholder='Đơn vị'
                disableClearable
                onChangeValue={updateDes}
                options={computeTypeSelect}
                isHasMessageError={false}
              />
            ),
          }}
        />
      ),
      after: (
        <CoreInput
          control={control}
          name={`lines.${index}.afterDays`}
          type='number'
          onChangeValue={updateDes}
          InputProps={{
            style: { paddingRight: 0, width: '370px' },
            endAdornment: (
              <CoreAutocomplete
                InputProps={{ style: { borderRadius: 0, width: '240px' } }}
                control={control}
                name={`lines.${index}.anchorDate`}
                placeholder='Đơn vị'
                disableClearable
                onChangeValue={updateDes}
                options={anchorDateSelect}
                isHasMessageError={false}
              />
            ),
          }}
        />
      ),
      action:
        index > 0 ? (
          <Action
            actionList={['delete']}
            onDeleteAction={() =>
              onRemoveLine(index, methodForm.watch(`lines.${index}.id`))
            }
          />
        ) : null,
    }
  })

  const onAddLine = () => {
    append({
      id: null,
      amountDue: 0,
      computeType: 'PERCENT',
      afterDays: 0,
      anchorDate: 'INVOICE_DATE',
    })
    updateDes()
  }

  const onRemoveLine = (index: number, id: number | null) => {
    if (!!id) {
      methodForm.setValue('deleteLineIds', [
        ...methodForm.watch('deleteLineIds'),
        id,
      ])
    }
    remove(index)
    updateDes()
  }

  const onSubmit = handleSubmit(async (data) => {
    let t = 0
    data?.lines?.map((i) => {
      t = t + i.amountDue
    })
    if (t <= 100 || t > 0) {
      mutate(data)
    } else {
      errorMsg('Tổng phần trăm không được khác 100')
    }
  })

  const { data, isLoading } = useQueryGetPaymentTermDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset({ ...data.data, deleteLineIds: [] })
    }

    updateDes()
  }, [id, data, reset, updateDes])

  return [
    {
      id,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      methodForm,
      columns,
      tableData,
      dateExample: format(new Date(), 'dd/MM/yyyy'),
    },
    { onSubmit, onCancel, onAddLine, onRemoveLine, updateDes },
  ] as const
}

export default usePaymentTerm
