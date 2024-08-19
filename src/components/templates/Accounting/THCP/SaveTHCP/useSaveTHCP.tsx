import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { ColumnProps } from '@/components/organism/CoreTable'
import { subjectType } from '@/enum'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { actionSubjectCostConfig } from '@/service/accounting/subjectCostConfig/action'
import { SaveSubjectCost } from '@/service/accounting/subjectCostConfig/action/type'
import { useQueryGetSubjectCostConfigDetail } from '@/service/accounting/subjectCostConfig/get'
import { Root2 } from '@/service/accounting/subjectCostConfig/get/type'
import { getSaleContractList } from '@/service/contract/sale/contract/get'
import { getProcessProduct } from '@/service/manufactory/productProcess/getList'
import { getProductList } from '@/service/product/productController/getList'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'
const defaultValues = {
  subjectType: null,
  process: null,
  data: [
    {
      process: null,
      subject: null,
    } as unknown as Root2,
  ],
}

const useSaveAccountTag = () => {
  const { t } = useTranslation(TRANSLATE.THCP)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const methodForm = useFormCustom<SaveSubjectCost>({
    defaultValues,
  })

  const { handleSubmit, reset, setError, control, watch } = methodForm

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'data',
    keyName: 'key',
  })

  const { data, isLoading, refetch } = useQueryGetSubjectCostConfigDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset({
        subjectType: data.data[0]?.subjectType,
        process: data.data[0].process,
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
                header: 'Quy trình con',
                fieldName: 'childProcess',
              },
            ]
          : []),

        ...([
          'STEP_STOOL_PRODUCTION',
          'COEFFICIENTS_RATIOS_PRODUCTION',
        ].includes(watch('subjectType') ?? '')
          ? [{ header: 'Mã đối tượng THCP', fieldName: 'subject' }]
          : [
              {
                header: 'Mã đối tượng THCP',
                fieldName: 'process',
              },
            ]),
        {
          header: 'Tên đối tượng THCP',
          fieldName: 'name',
        },
        {
          header: 'Danh mục áp dụng',
          fieldName: 'accountCredit',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch('subjectType')]
  )

  const tableData = fields.map((ele, index) => {
    return {
      ...ele,
      subject: (
        <CoreAutoCompleteAPI
          control={control}
          name={`data.${index}.subject`}
          placeholder='Chọn quy trình/sản phẩm'
          fetchDataFn={
            watch('subjectType') === 'SIMPLE_PRODUCTION'
              ? getProductList
              : watch('subjectType') === 'SALE_ORDER'
              ? getProcessProduct //TODO getAll sale
              : watch('subjectType') === 'CONTRACT'
              ? getSaleContractList
              : getProcessProduct
          }
          label={''}
          params={{
            isActive: true,
            state: 'PUBLIC',
            rerender: watch('subjectType'),
          }}
          labelPath='code'
        ></CoreAutoCompleteAPI>
      ),
      process: (
        <CoreAutoCompleteAPI
          control={control}
          name={`data.${index}.subject`}
          placeholder='Chọn quy trình/sản phẩm'
          fetchDataFn={
            watch('subjectType') === 'SIMPLE_PRODUCTION'
              ? getProductList
              : watch('subjectType') === 'SALE_ORDER'
              ? getProcessProduct //TODO getAll sale
              : watch('subjectType') === 'CONTRACT'
              ? getSaleContractList
              : getProcessProduct
          }
          label={''}
          params={{
            isActive: true,
            state: 'PUBLIC',
            rerender: watch('subjectType'),
          }}
          labelPath={
            watch('subjectType') === 'SIMPLE_PRODUCTION'
              ? 'name'
              : watch('subjectType') === 'SALE_ORDER'
              ? 'code' //TODO getAll sale
              : watch('subjectType') === 'CONTRACT'
              ? 'code'
              : 'code'
          }
        ></CoreAutoCompleteAPI>
      ),
      name: watch(`data.${index}.subject`)?.name,
    }
  })

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    actionSubjectCostConfig,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TAG}/[id]`,
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

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      method: isUpdate ? 'put' : 'post',
      data,
    })
  })

  return [
    {
      id,
      isUpdate,
      name: subjectType.find((ele) => ele.value === data?.data[0]?.subjectType)
        ?.label,
      columns,
      tableData,
      isLoading,
      isLoadingSubmit,
      methodForm,
      isView,
    },
    { t, onSubmit, onCancel },
  ] as const
}

export default useSaveAccountTag
