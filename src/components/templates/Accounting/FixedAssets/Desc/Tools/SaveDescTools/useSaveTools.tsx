import DeleteIcon from '@/assets/svg/action/delete.svg'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { calculatorDec } from '@/service/accounting/increaseTools/calculatorRemain'
import { useQueryGetDecreaseToolDetail } from '@/service/accounting/increaseTools/getDetail/getDecrease'
import { getDecreasedToolsList } from '@/service/accounting/increaseTools/getList/getDecreasedTools'
import {
  postDecreaseTool,
  putDecreaseTool,
} from '@/service/accounting/increaseTools/save/saveDecrease'
import { RequestBody } from '@/service/accounting/increaseTools/save/saveDecrease/type'
import { getDateNow } from '@/utils/date/date'
import { IconButton, Typography } from '@mui/material'
import { debounce } from 'lodash'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const useSaveDescTools = () => {
  const { t } = useTranslation('')

  let exceptValues = useRef<{ id: number }[]>([])

  const router = useRouter()

  const id = Number(router.query?.id)

  const isUpdate = !!id

  const { actionType, typeAddNew: typeAddNewRouter } = router.query

  const { currencyId, currency } = useAppSelector(
    (state) => state.companyConfigData
  )

  const accountLedger = useAppSelector((state) => state.ledgerRefData)

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      increaseRecordDate: getDateNow(),
      accountLedger: {
        code: accountLedger.code,
        name: accountLedger.name,
        id: accountLedger.id,
      },
      lines: [],
    },
  })

  const pathRedirect =
    typeAddNewRouter === 'HANDMADE' ? 'handMade' : 'divProToolsOrAsset'

  const { handleSubmit, reset, watch, setError, setValue, control, getValues } =
    methodForm

  const {
    fields,
    append: apLinesTool,
    remove: rmLinesSaveTool,
  } = useFieldArray({
    control,
    name: 'lines',
  })

  const {
    data: dataDescTool,
    isLoading: isLoadingSaveDescTool,
    refetch,
  } = useQueryGetDecreaseToolDetail({ id }, { enabled: !!id })

  useMemo(() => {
    if (!watch('increaseRecordDate')) {
      setValue('lines', [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('increaseRecordDate')])
  const tableData = (fields ?? []).map((item, index) => {
    if (actionType === 'VIEW') {
      return {
        ...item,
        product: item?.product?.sku,
        productName: item?.product?.name,
        quantityHaving: (
          <Typography>
            {item?.quantityHaving} {item?.unit?.name}
          </Typography>
        ),
        quantityDecrease: item?.quantityDecrease,
        quantityRemain: item?.quantityRemain,
        remainAmount: item?.remainAmount,
      }
    }

    return {
      ...item,
      product: (
        <CoreAutoCompleteAPI
          isViewProp={!watch('increaseRecordDate')}
          exceptValues={exceptValues.current}
          control={control}
          name={`lines.${index}`}
          label=''
          valuePath='product.id'
          labelPath='product.sku'
          placeholder='Chọn CCDC'
          params={{
            toolsAsset: 'TOOLS',
            increaseType: 'INCREASE',
            accountLedgerId: accountLedger.id,
            decreaseDate: watch('increaseRecordDate'),
          }}
          fetchDataFn={getDecreasedToolsList}
          onChangeValue={(val) => {
            if (val) {
              exceptValues.current.push(val?.product?.id)
              setValue(`lines.${index}.quantityRemain`, val?.quantityRemain)
              setValue(`lines.${index}.remainAmount`, val?.remainAmount)
              setValue(`lines.${index}.quantityHaving`, val?.quantityHaving)
              setValue(`lines.${index}.unit`, val?.unit)
            } else {
              setValue(
                `lines.${index}.quantityDecrease`,
                null as unknown as any
              )
            }
          }}
        />
      ),
      productName: watch(`lines.${index}.product.name`),
      quantityHaving: (
        <Typography>
          {watch(`lines.${index}.quantityHaving`)}
          {watch(`lines.${index}.unit`)?.name}
        </Typography>
      ),
      quantityDecrease: (
        <CoreInput
          control={control}
          name={`lines.${index}.quantityDecrease`}
          type='number'
          label=''
          required
          rules={{
            required: t('common:validation.required'),
            validate: (val: number) => {
              if (val <= 0 || val > watch(`lines.${index}.quantityHaving`)) {
                return 'Số lượng không hợp lệ!'
              }
            },
          }}
          onChangeValue={debounce(async (val) => {
            try {
              if (
                val &&
                val > 0 &&
                val <= watch(`lines.${index}.quantityHaving`)
              ) {
                const res = await calculatorDec({
                  lines: watch('lines'),
                  decreaseDate: watch('increaseRecordDate'),
                })

                if (res && res?.data) {
                  setValue(
                    `lines.${index}.quantityRemain`,
                    res?.data[index]?.quantityRemain
                  )
                  setValue(
                    `lines.${index}.remainAmount`,
                    res?.data[index]?.remainAmount
                  )
                  setValue(
                    `lines.${index}.accumulatedDepreciation`,
                    res?.data[index]?.accumulatedDepreciation
                  )
                }
              }
            } catch (ex: any) {
              errorMsg(ex.message)
            }
          }, 2000)}
        />
      ),
      quantityRemain: watch(`lines.${index}.quantityRemain`),
      remainAmount: watch(`lines.${index}.remainAmount`) ? (
        <CurrencyFormatCustom
          amount={watch(`lines.${index}.remainAmount`)}
          showCurrencyName
        />
      ) : (
        <>{watch(`lines.${index}.remainAmount`)}</>
      ),
      remove: (
        <IconButton onClick={() => rmLinesSaveTool(index)}>
          <Image alt='' width={15} height={15} src={DeleteIcon} />
        </IconButton>
      ),
    }
  })

  useEffect(() => {
    if (id) {
      reset({
        ...dataDescTool?.data,
        accountLedger: {
          code: accountLedger.code,
          name: accountLedger.name,
          id: accountLedger.id,
        },
        lines: dataDescTool?.data?.lines ? dataDescTool?.data?.lines : [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDescTool?.data, id, reset])

  const columns = useMemo(
    () =>
      [
        {
          header: 'Mã CCDC',
          fieldName: 'product',
          styleCell: {
            styleCell: { style: { width: '180px' } },
          },
        },
        {
          header: 'Tên CCDC',
          fieldName: 'productName',
        },
        {
          header: 'Số lượng đang có',
          fieldName: 'quantityHaving',
        },
        {
          header: 'Số lượng ghi giảm',
          fieldName: 'quantityDecrease',
        },
        {
          header: 'Số lượng còn lại',
          fieldName: 'quantityRemain',
        },
        {
          header: 'Giá trị còn lại' + ` ${currency}`,
          fieldName: 'remainAmount',
        },
        {
          header: ' ',
          fieldName: 'remove',
          styleCell: {
            styleCell: { style: { width: 10 } },
          },
        },
      ] as ColumnProps[],
    [currency]
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putDecreaseTool : postDecreaseTool,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.TOOL.DESC}/[id]`,
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
    const { lines, ...rest } = input

    try {
      if (input) {
        await mutate(input)
      }
    } catch (ex: any) {
      errorMsg(ex.message)
    }
  })

  return [
    {
      id,
      actionType,
      fields,
      currencyId,
      currency,
      isUpdate: !!id,
      methodForm,
      columns,
      isLoadingSubmit,
      tableData,
      typeAddNewRouter,
      pathRedirect,
    },
    {
      setValue,
      onCancel,
      onSubmit,
      refetch,
      apLinesTool,
      rmLinesSaveTool,
    },
  ] as const
}

export default useSaveDescTools
