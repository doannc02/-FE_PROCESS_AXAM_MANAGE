import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { useQueryGetGeneralPriceList } from '@/service/accounting/manageCost/bomPrice'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  page: 0,
  size: MAX_VALUE,
}

const useBCMPriceList = () => {
  const { t } = useTranslation(TRANSLATE.THCP)
  const currency = useAppSelector((state) => state.companyConfigData.currency)

  const methodForm = useFormCustom<any>({
    defaultValues,
  })

  const { watch } = methodForm
  const router = useRouter()

  const columns = useMemo(
    () =>
      [
        {
          header: 'SKU',
          fieldName: 'proSKU',
        },
        {
          header: 'Tên TP',
          fieldName: 'proName',
        },
        {
          header: 'Mã định mức',
          fieldName: 'bomCode',
        },
        {
          header: `NVL trực tiếp (${currency})`,
          fieldName: 'amountMaterial',
        },
        {
          header: `Nhân công trực tiếp (${currency})`,
          fieldName: 'amountLabor',
        },
        {
          header: `Chi phí chung (${currency})`,
          fieldName: 'amountCommon',
        },
        {
          header: `Tổng đơn giá theo định mức (${currency})`,
          fieldName: 'amountTotal',
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
  } = useQueryGetGeneralPriceList(queryPage)

  //   const getTitleFieldFn = (value: string) => {
  //     return subjectType.find((ele) => ele.value === value)?.label
  //   }

  const tableData = (data?.data?.content ?? []).map((item, index) => {
    return {
      ...item,
      proSKU: item?.product?.sku,
      proName: item?.product?.name,
      bomCode: item?.bom?.code,
      amountMaterial: (
        <CurrencyFormatCustom
          amount={item?.amountMaterial ? item?.amountMaterial : 0}
        />
      ),
      amountLabor: (
        <CurrencyFormatCustom
          amount={item?.amountLabor ? item?.amountLabor : 0}
        />
      ),
      amountCommon: (
        <CurrencyFormatCustom
          amount={item?.amountCommon ? item?.amountCommon : 0}
        />
      ),
      amountTotal: (
        <CurrencyFormatCustom
          amount={item?.amountTotal ? item?.amountTotal : 0}
        />
      ),
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

export default useBCMPriceList
