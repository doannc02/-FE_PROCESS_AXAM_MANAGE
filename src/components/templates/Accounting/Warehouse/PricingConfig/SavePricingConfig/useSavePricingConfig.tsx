import useCheckPath from '@/components/hooks/path/useCheckPath'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  getDetailPricingConfig,
  useQueryGetDetailPricingConfig,
} from '@/service/warehouse/pricingConfig/getDetail'
import { postPricingConfig } from '@/service/warehouse/pricingConfig/save'
import { RequestBody } from '@/service/warehouse/pricingConfig/save/type'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const defaultValues = {
  fiscalYear: null,
  warehouses: [
    {
      id: null,
      warehouse: null,
      cycleType: '',
      locations: [],
      stockLocations: [
        {
          id: null,
          name: '',
          code: '',
          type: '',
        },
      ],
    },
  ],
}
export default function useSavePricingConfig() {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })
  const { typeWareHouse } = useCheckPath()
  const [isLoadingSubmit, setLoadingSubmit] = useState(false)
  const router = useRouter()
  const id = Number(router.query?.id)
  const { actionType } = router.query
  const { control, handleSubmit, reset } = methodForm
  
  const {
    fields: warehouses,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'warehouses',
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoadingSubmit(true)
      const res = await postPricingConfig({
        requestBody: data,
        typeWareHouse: typeWareHouse,
      })
      successMsg(res.data?.message)
      router.push({
        pathname: `${MENU_URL.WARE_HOUSE.SALE.PRICING_CONFIG}/[id]`,
        query: {
          id: res?.data?.data?.id,
          actionType: 'VIEW',
        },
      })
      setLoadingSubmit(false)
      // handleGetDetailProduct(res?.data?.data?.id)
    } catch (e) {
      errorMsg(e)
    }
  })

  const { isLoading, data } = useQueryGetDetailPricingConfig(
    {
      fiscalYearId: Number(id),
    },
    { enabled: !!id }
  )

  const onCancel = () => {
    router.back()
  }

  useEffect(() => {
    if (id && data?.data && data) {
      reset(data?.data)
    }
  }, [id, data, reset])

  return [
    {
      methodForm,
      warehouses,
      actionType,
      defaultValues,
      isLoadingSubmit
    },
    { append, remove, onSubmit, onCancel },
  ] as const
}
