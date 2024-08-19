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
import { getUomProductList } from '@/service/product/productController/getUomGroup'
import UomAutocomplete from '../../../_component/UomAutocomplete'
import { getUomBaseOfProduct } from '@/service/product/productController/getUomBase'
import { MMC_Input } from '@/service/accounting/manageCost/manageMaterialCost/get/type'
import { actionSaveMMCInput } from '@/service/accounting/manageCost/manageMaterialCost/action'
import { useQueryGetDetailMMCInput } from '@/service/accounting/manageCost/manageMaterialCost/get'
const defaultValues = {
  data: [
    {
      product: null,
    },
  ],
}

const useSaveMMC = () => {
  const { t } = useTranslation(TRANSLATE.THCP)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const currency = useAppSelector((state) => state.companyConfigData.currency)
  const methodForm = useFormCustom<{
    data: MMC_Input[] | MMC_Input | any
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
          header: 'Tên nguyên vật liệu',
          fieldName: 'product',
        },
        {
          header: 'Đơn vị tính',
          fieldName: 'uomName',
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
        uomName: getValues(`data.${index}.uom.name`),
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
          params={{ isGood: true }}
          label=''
          key={ele.key}
          placeholder='Chọn NVL'
          fetchDataFn={getProductList2}
          control={control}
          name={`data.${index}.product`}
          required
          rules={{
            required: t('common:validation.required'),
          }}
          onChangeValue={async (val) => {
            // setValue(`invoiceLines.${index}`, currentLine)
            if (val) {
              const res = await getUomBaseOfProduct({ productId: val?.id })
              if (res && res.data) setValue(`data.${index}.uom`, res.data)
            } else {
              setValue(`data.${index}.uom`, null)
            }
          }}
        />
      ),
      uomName: (
        <UomAutocomplete
          key={ele.key}
          // isViewProp={}
          //disabled={true}
          readOnly={true}
          control={control}
          name={`data.${index}.uom`}
          label=''
          placeholder='Chọn đơn vị tính'
          fetchDataFn={getUomProductList}
          required
          rules={{
            required: t('common:validation.required'),
          }}
          params={{
            id: Number(watch(`data.${index}.product`)?.id),
          }}
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
              pathname: `${MENU_URL.COST.BOM_COST_MANAGE.MANAGE_MATERIAL_COST_INPUT}/[id]`,
              query: {
                id: res?.data?.data[0].id,
                actionType: 'VIEW',
              },
            })
          } else {
            router.push({
              pathname: `${MENU_URL.COST.BOM_COST_MANAGE.MANAGE_MATERIAL_COST_INPUT}`,
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
    { t, onSubmit, onCancel, setValue, append, remove },
  ] as const
}

export default useSaveMMC
