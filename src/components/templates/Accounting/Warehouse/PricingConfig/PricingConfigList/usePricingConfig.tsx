import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useQueryGetWarehouseList } from '@/service/warehouse/getList'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/warehouse/pricingConfig/getList/type'
import { useQueryPricingConfigList } from '@/service/warehouse/pricingConfig/getList'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useWarehouseList = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const { showDialog, hideDialog } = useDialog()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    getValues,
    reset,
  } = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const columns = useMemo(
    () =>
      [
        {
          header: 'Năm tài chính',
          fieldName: 'year',
        },
        {
          header: 'Số lượng kho áp dụng',
          fieldName: 'quanity',
        },
      ] as ColumnProps[],
    []
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    const { search, sourceProductType } = input
    if (_.isNil(search) || search === '') delete input.search
    if (_.isNil(sourceProductType)) delete input.sourceProductType
    setQueryPage(input)
  }

  const onReset = () => {
    reset(defaultValues)
    setQueryPage(defaultValues)
  }

  const onSubmit = handleSubmit(async (input) => {
    // console.log(input, 'submit')
    const { search, sourceProductType } = input
    if (_.isNil(search) || search === '') delete input.search
    if (_.isNil(sourceProductType) || sourceProductType === '')
      delete input.sourceProductType

    setQueryPage(input)
  })

  const { isLoading, data, refetch } = useQueryPricingConfigList(queryPage)

  const tableData = (data?.data.content ?? []).map((item, index) => {
    return {
      id: item.fiscalYear.id,
      year: item?.fiscalYear.endFiscalYear,
      quanity: item?.numberMethod,
    }
  })

  return [
    {
      isLoading,
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      columns,
      tableData,
      page: data?.data.page ?? 0,
      size: data?.data.size ?? 20,
      totalPages: data?.data.totalPages,
    },
    { onSubmit, onReset, onChangePageSize },
  ] as const
}
