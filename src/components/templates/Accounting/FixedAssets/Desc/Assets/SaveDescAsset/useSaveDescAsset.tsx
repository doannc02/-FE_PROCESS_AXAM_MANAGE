import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetDecreaseAssetDetail } from '@/service/accounting/fixedAsset/getDetail/getDetailDescAsset'
import {
  postDecreaseAsset,
  putDecreaseAsset,
} from '@/service/accounting/fixedAsset/save/saveDecrease'
import { RequestBody } from '@/service/accounting/fixedAsset/save/saveDecrease/type'
import { getDateNow } from '@/utils/date/date'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const useSaveDescAsset = () => {
  const { t } = useTranslation('')

  const [isShowAllocationAcc, setShowAllocationAcc] = useState(false)

  const [indexLineCurrent, setIndexLineCurrent] = useState(0)

  const router = useRouter()

  const id = Number(router.query?.id)

  const isUpdate = !!id

  const { actionType, typeAddNew: typeAddNewRouter } = router.query

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const accountLedger = useAppSelector((state) => state.ledgerRefData)

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      accountingDate: getDateNow(),
      increaseRecordDate: getDateNow(),
      accountLedger: {
        code: accountLedger.code,
        name: accountLedger.name,
        id: accountLedger.id,
      },
      lines: [
        {
          //   accountingLines: [],
        },
      ],
    },
  })

  const { handleSubmit, reset, watch, setError, setValue, control } = methodForm

  const {
    fields,
    append: apLinesTool,
    remove: rmLinesSaveTool,
  } = useFieldArray({
    control,
    name: 'lines',
    keyName: 'key',
  })

  useMemo(() => {
    if (!watch('increaseRecordDate')) {
      setValue('lines', [{ ratio: '' }])
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('increaseRecordDate')])

  const {
    data: dataDescAsset,
    isLoading: isLoadingQueryDescAsset,
    refetch,
  } = useQueryGetDecreaseAssetDetail({ id }, { enabled: !!id })

  useEffect(() => {
    if (id) {
      const obj = {
        ...dataDescAsset?.data,
        accountLedger: {
          code: accountLedger.code,
          name: accountLedger.name,
          id: accountLedger.id,
        },
        lines: dataDescAsset?.data?.lines ? dataDescAsset?.data?.lines : [],
      }
      reset(obj)
    }
  }, [
    accountLedger.code,
    accountLedger.id,
    accountLedger.name,
    dataDescAsset,
    id,
    reset,
  ])

  const columns = useMemo(
    () =>
      [
        {
          header: 'Mã tài sản',
          fieldName: 'product',
          styleCell: {
            styleCell: { style: { width: '180px' } },
          },
        },
        {
          header: 'Tên tài sản',
          fieldName: 'productName',
        },
        {
          header: 'Nguyên giá' + ` (${currency})`,
          fieldName: 'recordedValue',
        },
        {
          header: 'Giá trị khấu hao',
          fieldName: 'periodicAllocation',
        },
        {
          header: 'Hao mòn lũy kế',
          fieldName: 'accumulatedDepreciation',
        },
        {
          header: 'Giá trị còn lại',
          fieldName: 'remainAmount',
        },
        {
          header: 'TK nguyên giá',
          fieldName: 'originalPriceAccount',
        },
        {
          header: 'TK ghi nhận GT còn lại',
          fieldName: 'accountRecordsTheRemainingValue',
        },
        {
          header: ' ',
          fieldName: 'btn',
          styleCell: {
            styleCell: { style: { width: 10 } },
          },
        },
      ] as ColumnProps[],
    [currency]
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putDecreaseAsset : postDecreaseAsset,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.ASSET.DESC}/[id]`,
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

  const onSubmit = handleSubmit(async (input) => {
    try {
      if (input) {
        mutate(input)
        console.log(input)
      }
    } catch (ex: any) {
      errorMsg(ex.message)
    }
  })

  return [
    {
      id,
      accountLedger,
      indexLineCurrent,
      isShowAllocationAcc,
      isLoadingQueryDescAsset,
      actionType,
      fields,
      currency,
      isUpdate: !!id,
      methodForm,
      columns,
      isLoadingSubmit,
    },
    {
      onCancel,
      onSubmit,
      refetch,
      apLinesTool,
      rmLinesSaveTool,
    },
  ] as const
}

export default useSaveDescAsset
