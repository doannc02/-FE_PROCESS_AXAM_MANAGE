import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { subjectType } from '@/enum'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL, TRANSLATE } from '@/routes'
import { actionUC } from '@/service/accounting/unfishedCost/actionUnfinished'
import { RootUC } from '@/service/accounting/unfishedCost/actionUnfinished/type'
import { useQueryGetUC } from '@/service/accounting/unfishedCost/get'
import { getSaleContractList } from '@/service/contract/sale/contract/get'
import {
  getProcessProduct,
  getStageOfProcessProduct,
} from '@/service/manufactory/productProcess/getList'
import { getProductListFullType } from '@/service/product/productController/getListProForToolsAsset'
import { getSales } from '@/service/salesOrder/salesOrder/getAllSaleProducts'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const useSaveUnfinishedCost = () => {
  const { t } = useTranslation(TRANSLATE.THCP)
  const router = useRouter()
  const { actionType, typeAddNew } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'
  const currency = useAppSelector((state) => state.companyConfigData.currency)
  const defaultValues = {
    subjectType: typeAddNew as any,

    data: [
      ...(typeAddNew === 'STEP_STOOL_PRODUCTION'
        ? [
            {
              subjectType: typeAddNew as any,
              stages: [
                {
                  stage: null,
                },
              ],
              process: null,
            } as unknown as any,
          ]
        : [
            {
              subjectType: typeAddNew as any,
              process: null,
            } as unknown as any,
          ]),
    ],
  }
  const methodForm = useFormCustom<{
    subjectType: string
    process?: any
    data: RootUC[]
  }>({
    defaultValues,
  })

  const { handleSubmit, setValue, reset, setError, control, watch } = methodForm

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'data',
    keyName: 'key',
  })

  const {
    fields: fieldStage,
    remove: rmStage,
    append: apStage,
  } = useFieldArray({
    control,
    name: `data.${0}.stages`,
    keyName: 'keyA',
  })

  const { data, isLoading, refetch } = useQueryGetUC(
    { subjectType: typeAddNew as string },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data) {
      console.log(data, 'detail', watch('data'))

      reset({
        subjectType: data.data[0]?.subjectType,
        data: data.data,
      })
    }
  }, [id, data, reset])

  const onCancel = () => {
    router.back()
  }

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

  const tableData = (fields ?? []).map((ele, index) => {
    return {
      ...ele,
      saleName: ele?.sale?.name ? (
        ele?.sale?.name
      ) : (
        <CoreAutoCompleteAPI
          label=''
          placeholder='Chọn đơn hàng'
          params={{ isActive: true }}
          fetchDataFn={getSales}
          labelPath='code'
          control={control}
          name={`data.${index}.sale`}
          onChangeValue={(val) => {
            if (val) {
              setValue(`data.${index}.sale.orderDate`, val.orderDate)
            }
          }}
        />
      ),
      saleDate: !watch(`data.${index}.sale.orderDate`) ? null : (
        <CoreDatePicker
          title=''
          isViewProp={true}
          control={control}
          name={`data.${index}.sale.orderDate`}
        />
      ),
      process: (
        <CoreAutoCompleteAPI
          label=''
          placeholder='Chọn quy trình'
          params={{ isActive: true }}
          fetchDataFn={getProcessProduct}
          control={control}
          name={`data.${index}.process`}
        />
      ),
      product: (
        <CoreAutoCompleteAPI
          label=''
          placeholder='Chọn sản phẩm'
          params={{}}
          fetchDataFn={getProductListFullType}
          control={control}
          name={`data.${index}.product`}
        />
      ),
      amountMaterial: ele?.amountMaterial ? (
        <CurrencyFormatCustom amount={ele?.amountMaterial ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${index}.amountMaterial`}
          type='number'
        />
      ),
      amountLabor: ele?.amountLabor ? (
        <CurrencyFormatCustom amount={ele?.amountLabor ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${index}.amountLabor`}
          type='number'
        />
      ),
      amountCommon: ele?.amountCommon ? (
        <CurrencyFormatCustom amount={ele?.amountCommon ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${index}.amountCommon`}
          type='number'
        />
      ),
      amountTotal: ele?.amountTotal ? (
        <CurrencyFormatCustom amount={ele?.amountTotal ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${index}.amountTotal`}
          type='number'
        />
      ),
      amountNotAccepted: ele?.amountNotAccepted ? (
        <CurrencyFormatCustom amount={ele?.amountNotAccepted ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${index}.amountNotAccepted`}
          type='number'
        />
      ),
      amountAccepted: ele?.amountAccepted ? (
        <CurrencyFormatCustom amount={ele?.amountAccepted ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${index}.amountAccepted`}
          type='number'
        />
      ),
      contractCode: ele?.contract?.code ? (
        ele?.contract?.code
      ) : (
        <CoreAutoCompleteAPI
          params={{}}
          fetchDataFn={getSaleContractList}
          label=''
          placeholder='Chọn hợp đồng'
          labelPath='code'
          control={control}
          name={`data.${index}.contract`}
          onChangeValue={(val) => {
            setValue(`data.${index}.contract.name`, val.name)
            setValue(`data.${index}.contract.signDate`, val.signDate)
          }}
        />
      ),

      contractDate: ele?.contract?.signDate ? (
        ele?.contract?.signDate
      ) : (
        <CoreDatePicker
          control={control}
          name={`data.${index}.contract.signDate`}
          title=''
          isViewProp={true}
        />
      ),
      contractName: (
        <CoreInput
          name={`data.${index}.contract.name`}
          control={control}
          isViewProp={true}
        />
      ),
      action:
        index === 0 && fields.length === 1 ? null : isView ? null : (
          <Action
            actionList={['delete']}
            onDeleteAction={() => {
              remove(index)
            }}
          />
        ),
    }
  })

  const tableDtStages = (fieldStage ?? []).map((i, index) => {
    return {
      action:
        index === 0 && fieldStage.length === 1 ? null : isView ? null : (
          <Action
            actionList={['delete']}
            onDeleteAction={() => {
              rmStage(index)
            }}
          />
        ),
      stage: (
        <CoreAutoCompleteAPI
          label=''
          placeholder='Chọn công đoạn'
          params={{ id: watch('process')?.id }}
          fetchDataFn={getStageOfProcessProduct}
          control={control}
          name={`data.${0}.stages.${index}.stage`}
        />
      ),
      amountMaterial: i?.amountMaterial ? (
        <CurrencyFormatCustom amount={i?.amountMaterial ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${0}.stages.${index}.amountMaterial`}
          type='number'
        />
      ),
      amountLabor: i?.amountLabor ? (
        <CurrencyFormatCustom amount={i?.amountLabor ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${0}.stages.${index}.amountLabor`}
          type='number'
        />
      ),
      amountCommon: i?.amountCommon ? (
        <CurrencyFormatCustom amount={i?.amountCommon ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${0}.stages.${index}.amountCommon`}
          type='number'
        />
      ),
      amountTotal: i?.amountTotal ? (
        <CurrencyFormatCustom amount={i?.amountTotal ?? 0} />
      ) : (
        <CoreInput
          label=''
          placeholder='Nhập'
          control={control}
          name={`data.${0}.stages.${index}.amountTotal`}
          type='number'
        />
      ),
    }
  })

  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionUC, {
    onSuccess: (res) => {
      successMsg(t('common:message.success'))
      if (res?.data?.data?.ids[0]) {
        router.push({
          pathname: `${MENU_URL.COST.UNFINISHED_COST}/[id]`,
          query: {
            id: res?.data?.data?.ids[0],
            actionType: 'VIEW',
            typeAddNew: typeAddNew,
          },
        })
        console.log('ll', res?.data?.data?.ids[0])
        refetch()
      }
    },
    onError: (error) => {
      errorMsg(error, setError)
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      method: isUpdate ? 'put' : 'post',
      data: data.data,
    })
  })

  return [
    {
      id,
      isUpdate,
      name: subjectType.find((ele) => ele.value === data?.data[0]?.subjectType)
        ?.label,
      columns,
      tableData:
        watch('subjectType') === 'STEP_STOOL_PRODUCTION' ||
        typeAddNew === 'STEP_STOOL_PRODUCTION'
          ? tableDtStages
          : tableData,
      isLoading,
      isLoadingSubmit,
      methodForm,
      isView,
    },
    {
      t,
      onSubmit,
      onCancel,
      setValue,
      append:
        watch('subjectType') === 'STEP_STOOL_PRODUCTION' ||
        typeAddNew === 'STEP_STOOL_PRODUCTION'
          ? apStage
          : append,
    },
  ] as const
}

export default useSaveUnfinishedCost
