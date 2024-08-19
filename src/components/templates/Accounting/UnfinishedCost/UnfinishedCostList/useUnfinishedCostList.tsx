import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { subjectType } from '@/enum'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { useQueryGetSubjectCostConfigList } from '@/service/accounting/subjectCostConfig/getList'
import { RequestBody } from '@/service/accounting/subjectCostConfig/getList/type'
import { useQueryGetUC } from '@/service/accounting/unfishedCost/get'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  subjectType: 'SIMPLE_PRODUCTION',
}

const useUnfinishedCostList = () => {
  const { t } = useTranslation(TRANSLATE.THCP)

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const currency = useAppSelector((state) => state.companyConfigData.currency)

  const router = useRouter()

  const { watch } = methodForm
  const columns = useMemo(
    () =>
      [
        ...(watch('subjectType') === 'STEP_STOOL_PRODUCTION'
          ? [
              {
                header: 'Tên công đoạn',
                fieldName: 'stage',
              },
              {
                header: 'NVL trực tiếp' + ` ${currency}`,
                fieldName: 'amountMaterial',
              },
              {
                header: 'Nhân công trực tiếp' + ` ${currency}`,
                fieldName: 'amountLabor',
              },
              {
                header: 'Chi phí chung' + ` ${currency}`,
                fieldName: 'amountCommon',
              },
              {
                header: 'Tổng chi phí' + ` ${currency}`,
                fieldName: 'amountTotal',
              },
            ]
          : []),
        ...(watch('subjectType') === 'COEFFICIENTS_RATIOS_PRODUCTION' ||
        watch('subjectType') === 'SIMPLE_PRODUCTION'
          ? [
              ...(watch('subjectType') === 'COEFFICIENTS_RATIOS_PRODUCTION'
                ? [
                    {
                      header: 'Quy trình',
                      fieldName: 'process',
                    },
                  ]
                : [
                    {
                      header: 'Sản phẩm',
                      fieldName: 'product',
                    },
                  ]),
              {
                header: 'NVL trực tiếp' + ` ${currency}`,
                fieldName: 'amountMaterial',
              },
              {
                header: 'Nhân công trực tiếp' + ` ${currency}`,
                fieldName: 'amountLabor',
              },
              {
                header: 'Chi phí chung' + ` ${currency}`,
                fieldName: 'amountCommon',
              },
              {
                header: 'Tổng chi phí' + ` ${currency}`,
                fieldName: 'amountTotal',
              },
            ]
          : []),
        ...(watch('subjectType') === 'CONTRACT' ||
        watch('subjectType') === 'SALE_ORDER'
          ? [
              ...(watch('subjectType') === 'CONTRACT'
                ? [
                    {
                      header: 'Số hợp đồng',
                      fieldName: 'contractCode',
                    },
                    {
                      header: ' Tên hợp đồng',
                      fieldName: 'contractName',
                    },

                    {
                      header: 'Tiến độ',
                      fieldName: 'contractProgress',
                    },
                  ]
                : [
                    {
                      header: 'Mã đơn hàng',
                      fieldName: 'saleName',
                    },
                    {
                      header: 'Ngày tạo ĐH',
                      fieldName: 'saleDate',
                    },
                  ]),
              {
                header: 'NVL trực tiếp' + ` (${currency})`,
                fieldName: 'amountMaterial',
              },
              {
                header: 'Chi phí chung' + ` (${currency})`,
                fieldName: 'amountCommon',
              },
              {
                header: 'Tổng chi phí' + ` (${currency})`,
                fieldName: 'amountTotal',
              },
              {
                header: 'Số tiền chưa nghiệm thu' + ` (${currency})`,
                fieldName: 'amountNotAccepted',
              },
              {
                header: 'Số tiền đã nghiệm thu' + ` (${currency})`,
                fieldName: 'amountAccepted',
              },
            ]
          : []),
        {
          header: '',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch('subjectType')]
  )

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const onReset = () => {
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const { isLoading: isLoadingTable, data, refetch } = useQueryGetUC(queryPage)

  const tableData = (data?.data ?? []).map((ele, index) => {
    return {
      ...ele,
      saleName: ele?.sale?.name,
      saleDate: ele?.sale?.orderDate,
      process: ele?.process?.name,
      product: ele?.product?.name,
      amountMaterial: (
        <CurrencyFormatCustom amount={ele?.amountMaterial ?? 0} />
      ),
      amountLabor: <CurrencyFormatCustom amount={ele?.amountLabor ?? 0} />,
      amountCommon: <CurrencyFormatCustom amount={ele?.amountCommon ?? 0} />,
      amountTotal: <CurrencyFormatCustom amount={ele?.amountTotal ?? 0} />,
      amountNotAccepted: (
        <CurrencyFormatCustom amount={ele?.amountNotAccepted ?? 0} />
      ),
      amountAccepted: (
        <CurrencyFormatCustom amount={ele?.amountAccepted ?? 0} />
      ),
      contractCode: ele?.contract?.code,

      contractDate: ele?.contract?.signDate,
      contractName: ele?.contract?.name,
    }
  })

  // const tableDtStages = (fieldStage ?? []).map((i, index) => {
  //   return {
  //     stage: (
  //       <CoreAutoCompleteAPI
  //         label=''
  //         placeholder='Chọn công đoạn'
  //         params={{ id: watch('process')?.id }}
  //         fetchDataFn={getStageOfProcessProduct}
  //         control={control}
  //         name={`data.${0}.stages.${index}.stage`}
  //       />
  //     ),
  //     amountMaterial: i?.amountMaterial ? (
  //       <CurrencyFormatCustom amount={i?.amountMaterial ?? 0} />
  //     ) : (
  //       <CoreInput
  //         label=''
  //         placeholder='Nhập'
  //         control={control}
  //         name={`data.${0}.stages.${index}.amountMaterial`}
  //         type='number'
  //       />
  //     ),
  //     amountLabor: i?.amountLabor ? (
  //       <CurrencyFormatCustom amount={i?.amountLabor ?? 0} />
  //     ) : (
  //       <CoreInput
  //         label=''
  //         placeholder='Nhập'
  //         control={control}
  //         name={`data.${0}.stages.${index}.amountLabor`}
  //         type='number'
  //       />
  //     ),
  //     amountCommon: i?.amountCommon ? (
  //       <CurrencyFormatCustom amount={i?.amountCommon ?? 0} />
  //     ) : (
  //       <CoreInput
  //         label=''
  //         placeholder='Nhập'
  //         control={control}
  //         name={`data.${0}.stages.${index}.amountCommon`}
  //         type='number'
  //       />
  //     ),
  //     amountTotal: i?.amountTotal ? (
  //       <CurrencyFormatCustom amount={i?.amountTotal ?? 0} />
  //     ) : (
  //       <CoreInput
  //         label=''
  //         placeholder='Nhập'
  //         control={control}
  //         name={`data.${0}.stages.${index}.amountTotal`}
  //         type='number'
  //       />
  //     ),
  //   }
  // })
  const getTitleFieldFn = (value: string) => {
    return subjectType.find((ele) => ele.value === value)?.label
  }

  return [
    {
      tableData:
        !(watch('subjectType') === 'CONTRACT') &&
        !(watch('subjectType') === 'STEP_STOOL_PRODUCTION')
          ? tableData
          : data?.data,
      router,
      queryPage,
      methodForm,
      columns,
      isLoadingTable,
    },
    { t, onSubmit, onReset, refetch, getTitleFieldFn },
  ] as const
}

export default useUnfinishedCostList
