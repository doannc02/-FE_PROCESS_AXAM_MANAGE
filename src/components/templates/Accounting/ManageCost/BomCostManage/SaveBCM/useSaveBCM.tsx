import iconRemove from '@/assets/svg/action/delete.svg'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL, TRANSLATE } from '@/routes'
import { BCM } from '@/service/accounting/manageCost/bomCostManage/getList/type'
import { calculatePricing } from '@/service/accounting/manageCost/bomPrice'
import { actionSaveMMCInput } from '@/service/accounting/manageCost/manageMaterialCost/action'
import { useQueryGetDetailMMCInput } from '@/service/accounting/manageCost/manageMaterialCost/get'
import {
  getProductPlaneBoms,
  handleGetListListBomNotDistribution,
  handleGetListListProduct,
} from '@/service/manufactory/productProcess/getList'
import { debounce, isArray } from 'lodash'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'
import { number } from 'zod'
const defaultValues = {
  data: [
    {
      product: null,
    },
  ],
}

const useSaveBCM = () => {
  const { t } = useTranslation(TRANSLATE.THCP)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const currency = useAppSelector((state) => state.companyConfigData.currency)
  const methodForm = useFormCustom<{
    data: BCM[] | BCM | any
  }>({
    defaultValues,
  })

  const { handleSubmit, setValue, reset, setError, control, watch, getValues } =
    methodForm

  const { data, isLoading, refetch } = useQueryGetDetailMMCInput(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data) {
      reset({
        data: data?.data,
      })
    }
  }, [id, data, reset])

  const onCancel = () => {
    router.back()
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
    keyName: 'key',
  })
  const columns = useMemo(
    () =>
      [
        {
          header: 'Thành phẩm',
          fieldName: 'product',
        },
        {
          header: 'Mã định mức',
          fieldName: 'bom',
        },
        {
          header: 'Chiếm số % tổng chi phí trực tiếp',
          fieldName: 'costPercentage',
        },
        {
          header: 'Đơn giá' + ` (${currency})`,
          fieldName: 'price',
        },
        ...(router.pathname.includes('/addNew')
          ? [{ header: '', fieldName: 'action' }]
          : []),
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const tableData = (fields ?? []).map((ele, index) => {
    if (actionType === 'VIEW') {
      return {
        product: getValues(`data.${index}.product.name`),
        bom: getValues(`data.${index}.bom.code`),
        costPercentage: getValues(`data.${index}.costPercentage`),
        price: (
          <CurrencyFormatCustom
            amount={getValues(`data.${index}.price`) ?? 0}
          />
        ),
      }
    }
    return {
      product: (
        <CoreAutoCompleteAPI
          params={{}}
          label=''
          placeholder='Chọn NVL'
          labelPath='name'
          valuePath='id'
          fetchDataFn={handleGetListListProduct}
          control={control}
          name={`data.${index}.product`}
          onChangeValue={async (val) => {
            // setValue(`invoiceLines.${index}`, currentLine)
            if (val) {
              if (
                getValues(`data.${index}.bom`)?.id &&
                getValues(`data.${index}.costPercentage`)
              ) {
                const res = await calculatePricing({
                  productId: val?.id,
                  bomId: getValues(`data.${index}.bom`)?.id,
                  processId: val.processId,
                  costPercentage: getValues(`data.${index}.costPercentage`),
                })

                if (res.data && typeof res.data === 'number') {
                  setValue(`data.${index}.price`, res.data)
                }
              }
            } else {
              setValue(`data.${index}.bom`, null)
              setValue(`data.${index}.price`, 0)
              setValue(`data.${index}.costPercentage`, 0)
            }
          }}
        />
      ),
      bom: (
        <CoreAutoCompleteAPI
          label=''
          placeholder='Chọn mã định mức'
          control={control}
          isViewProp={!watch(`data.${index}.product`)?.id}
          params={{
            isAllocation: false,
            productId: watch(`data.${index}.product`)?.id,
          }}
          labelPath='code'
          valuePath='id'
          fetchDataFn={handleGetListListBomNotDistribution}
          // onChangeValue={(e) => {
          //   if (e?.bom) {
          //     setValue(`data.${index}.bom`, e.bom)
          //   }
          // }}
          onChangeValue={async (val) => {
            // setValue(`invoiceLines.${index}`, currentLine)
            if (val) {
              if (
                getValues(`data.${index}.product`)?.id &&
                getValues(`data.${index}.costPercentage`) &&
                getValues(`data.${index}.product`)?.processId
              ) {
                const res = await calculatePricing({
                  productId: getValues(`data.${index}.product`)?.id,
                  bomId: getValues(`data.${index}.bom`)?.id,
                  processId: getValues(`data.${index}.product`).processId,
                  costPercentage: getValues(`data.${index}.costPercentage`),
                })

                if (res.data && typeof res.data === 'number') {
                  setValue(`data.${index}.price`, res.data)
                }
              }
            } else {
              setValue(`data.${index}.price`, 0)
              setValue(`data.${index}.costPercentage`, 0)
            }
          }}
          name={`data.${index}.bom`}
        />
      ),
      costPercentage: (
        <CoreInput
          label=''
          placeholder='Nhập tỉ lệ'
          control={control}
          name={`data.${index}.costPercentage`}
          rules={{
            validate: (val: number) => {
              if (val < 0 || val > 100) {
                return 'Giá trị không hợp lệ!'
              }
            },
          }}
          onChangeValue={async (val) => {
            // setValue(`invoiceLines.${index}`, currentLine)
            if (val && val > 0) {
              if (
                getValues(`data.${index}.product`)?.id &&
                getValues(`data.${index}.bom`)?.id &&
                getValues(`data.${index}.product`)?.processId
              ) {
                const res = await calculatePricing({
                  productId: getValues(`data.${index}.product`)?.id,
                  bomId: getValues(`data.${index}.bom`)?.id,
                  processId: getValues(`data.${index}.product`).processId,
                  costPercentage: getValues(`data.${index}.costPercentage`),
                })

                if (res.data && typeof res.data === 'number') {
                  setValue(`data.${index}.price`, res.data)
                }
              }
            } else {
              setValue(`data.${index}.bom`, null)
            }
          }}
        />
      ),
      price: (
        <CoreInput
          control={control}
          label=''
          type='number'
          isViewProp={true}
          placeholder='Nhập đơn giá'
          required
          rules={{
            required: t('common:validation.required'),
            validate: (val: number) => {
              if (val && val < 0) {
                return 'Giá trị không hợp lệ'
              }
            },
          }}
          name={`data.${index}.price`}
        />
      ),
      action:
        index > 0 ? (
          <div className='cursor-pointer'>
            <Image alt='' src={iconRemove} onClick={() => remove(index)} />
          </div>
        ) : null,
    }
  })

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    actionSaveMMCInput,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data) {
          if (router.pathname.includes('/[id]')) {
            router.push({
              pathname: `${MENU_URL.COST.BOM_COST_MANAGE.BOM_COST_GENERAL}/[id]`,
              query: {
                id: res?.data?.data[0].id,
                actionType: 'VIEW',
              },
            })
          } else {
            router.push({
              pathname: `${MENU_URL.COST.BOM_COST_MANAGE.BOM_COST_GENERAL}`,
            })
          }
          refetch()
        }
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (input) => {
    mutate({
      method: isUpdate ? 'put' : 'post',
      data: isArray(input.data) ? input.data : [input.data],
    })
  })

  return [
    {
      id,
      fields,
      isUpdate,
      name: '',
      columns,
      tableData,
      isLoading,
      isLoadingSubmit,
      methodForm,
      isView,
      currency,
    },
    { t, onSubmit, onCancel, setValue, append, remove, getValues, refetch },
  ] as const
}

export default useSaveBCM
