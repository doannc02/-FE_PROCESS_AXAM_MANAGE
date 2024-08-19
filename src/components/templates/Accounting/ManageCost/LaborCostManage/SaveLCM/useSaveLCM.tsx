import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { salaryMethodType, subjectType, timeType } from '@/enum'
import { errorMsg, successMsg } from '@/helper/message'
import iconRemove from '@/assets/svg/action/delete.svg'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { actionSaveLCM } from '@/service/accounting/manageCost/laborCostManage/action'
import { useQueryGetDetailLaborCostManage } from '@/service/accounting/manageCost/laborCostManage/get'
import { GeneralPrice } from '@/service/accounting/manageCost/laborCostManage/get/type'
import { getProductList2 } from '@/service/product/productController/getListProForToolsAsset'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hook'
import { isArray } from 'lodash'
const defaultValues = {
  salaryMethodType: 'PRODUCT',
  data: [
    {
      product: null,
      salaryMethodType: 'PRODUCT',
    },
  ],
}

const useSaveLCM = () => {
  const { t } = useTranslation(TRANSLATE.THCP)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const currency = useAppSelector((state) => state.companyConfigData.currency)
  const methodForm = useFormCustom<{
    salaryMethodType: 'PRODUCT' | 'BASIC' | string
    data: GeneralPrice[] | GeneralPrice | any
  }>({
    defaultValues,
  })

  const { handleSubmit, setValue, reset, setError, control, watch, getValues } =
    methodForm

  const { data, isLoading, refetch } = useQueryGetDetailLaborCostManage(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    console.log(data, ';;;')
    if (id && data) {
      reset({
        salaryMethodType: data?.data?.salaryMethodType,
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
        ...(watch('salaryMethodType') === 'PRODUCT'
          ? [
              {
                header: 'Thành phẩm',
                fieldName: 'product',
              },
            ]
          : [
              {
                header: 'Đơn vị tính',
                fieldName: 'timeType',
              },
            ]),

        {
          header: 'Đơn giá' + ` (${currency})`,
          fieldName: 'price',
        },
        ...(router.pathname.includes('/addNew')
          ? [{ header: '', fieldName: 'action' }]
          : []),
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch('salaryMethodType')]
  )

  const tableData = useMemo(() => {
    return (fields ?? []).map((ele, index) => {
      if (actionType === 'VIEW') {
        return {
          product: getValues(`data.${index}.product.name`),
          timeType:
            getValues(`data.${index}.timeType`) === 'HOUR' ? 'Giờ' : 'Ngày',
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
            key={ele.key}
            params={{ isGood: true }}
            label=''
            placeholder='Chọn thành phẩm'
            fetchDataFn={getProductList2}
            control={control}
            name={`data.${index}.product`}
          />
        ),
        timeType: (
          <CoreAutocomplete
            key={ele.key}
            control={control}
            label=''
            placeholder='Chọn đơn vị tính'
            name={`data.${index}.timeType`}
            options={[
              { value: 'DAY', label: 'Ngày' },
              { value: 'HOUR', label: 'Giờ' },
            ]}
          />
        ),
        price: (
          <CoreInput
            key={ele.key}
            control={control}
            label=''
            type='number'
            required
            rules={{
              required: t('common:validation.required'),
              validate: (val: number) => {
                if (val && val < 0) {
                  return 'Giá trị không hợp lệ'
                }
              },
            }}
            placeholder='Nhập đơn giá'
            name={`data.${index}.price`}
          />
        ),
        action:
          index > 0 ? (
            <div className='cursor-pointer'>
              <Image
                alt=''
                src={iconRemove}
                onClick={() => {
                  alert(index)
                  remove(index)
                }}
              />
            </div>
          ) : null,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('salaryMethodType'), fields])

  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionSaveLCM, {
    onSuccess: (res) => {
      successMsg(t('common:message.success'))
      if (res?.data?.data[0].id) {
        if (!router.pathname.includes('addNew')) {
          router.push({
            pathname: `${MENU_URL.COST.BOM_COST_MANAGE.LABOR_COST_INPUT}/[id]`,
            query: {
              id: res?.data?.data[0].id,
              actionType: 'VIEW',
            },
          })
        } else {
          router.push({
            pathname: `${MENU_URL.COST.BOM_COST_MANAGE.LABOR_COST_INPUT}`,
          })
        }
        refetch()
      }
    },
    onError: (error) => {
      errorMsg(error, setError)
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    mutate({
      method: isUpdate ? 'put' : 'post',
      data: isArray(input.data) ? input.data : [input.data],
    })
    console.log(input, 'llll')
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
    { t, onSubmit, onCancel, setValue, append, remove },
  ] as const
}

export default useSaveLCM
