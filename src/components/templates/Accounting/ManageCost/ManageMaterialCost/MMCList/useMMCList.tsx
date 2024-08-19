import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { useQueryGetMMCInputLst } from '@/service/accounting/manageCost/manageMaterialCost/getList'
import { RequestBody } from '@/service/accounting/manageCost/manageMaterialCost/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  page: 0,
  size: MAX_VALUE,
  salaryMethodType: 'PRODUCT',
  name: '',
}

const useMMCList = () => {
  const { t } = useTranslation(TRANSLATE.THCP)
  const currency = useAppSelector((state) => state.companyConfigData.currency)

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { watch } = methodForm
  const router = useRouter()

  const columns = useMemo(
    () =>
      [
        {
          header: 'Tên NVL',
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
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }

    setQueryPage(input)
  }
  const onReset = () => {
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetMMCInputLst(queryPage)

  //   const getTitleFieldFn = (value: string) => {
  //     return subjectType.find((ele) => ele.value === value)?.label
  //   }

  const tableData = (data?.data?.content ?? []).map((item, index) => {
    return {
      ...item,
      product: item?.product?.name,
      uomName: item?.uom?.name,
      price: <CurrencyFormatCustom amount={item?.price ? item?.price : 0} />,
    }
  })

  return [
    {
      tableData: tableData,
      router,
      queryPage,
      methodForm,
      columns,
      isLoadingTable,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { t, onSubmit, onReset, refetch, onChangePageSize },
  ] as const
}

export default useMMCList
