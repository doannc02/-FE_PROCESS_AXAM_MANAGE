import iconRemove from '@/assets/svg/action/delete.svg'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountAllocationList } from '@/service/accounting/accountMove/allocation'
import { getIncomeList } from '@/service/accounting/accountMove/getListIncome'
import { useQueryGetIncreaseAssetDetail } from '@/service/accounting/fixedAsset/getDetail/getDetailEscAsset'
import {
  postIncreaseAsset,
  putIncreaseAsset,
} from '@/service/accounting/fixedAsset/save/saveIncrease'
import { RequestBody } from '@/service/accounting/fixedAsset/save/saveIncrease/type'
import { useQueryGetAssetGroupProduct } from '@/service/asset/getGroupProduct'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'
import { isDisColSelStage } from '../SaveEscTool/useSaveEscTool'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { subjectType } from '@/enum'
import { getSubjectCostConfigListByType } from '@/service/accounting/subjectCostConfig/getList'

const useSaveEscAssets = () => {
  const { t } = useTranslation('')
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const {
    actionType,
    typeAddNew: typeAddNewRouter,
    start,
    end,
    idProduct,
  } = router.query

  const { currencyId, currency } = useAppSelector(
    (state) => state.companyConfigData
  )

  const accountLedger = useAppSelector((state) => state.ledgerRefData)

  const { typeIncreaseOrDecrease } = useCheckPath()

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      accountLedger: {
        code: accountLedger.code,
        name: accountLedger.name,
        id: accountLedger.id,
      },
      typeIncrease: typeIncreaseOrDecrease,
      typeAddNew: !isUpdate ? 'HANDMADE' : typeAddNewRouter,
      lines: [],
      isNoDepreciation: false,
    },
  })

  const handleParamsToolsAsset = ({
    value,
    type,
  }: {
    value: string
    type: string
  }) => {
    if (type === 'TOOLS') {
      return {}
    }
  }

  const pathRedirect = 'handMade'

  const { handleSubmit, reset, setValue, watch, setError, getValues, control } =
    methodForm

  const {
    fields,
    append: apLinesTool,
    remove: rmLinesSaveTool,
  } = useFieldArray({
    control,
    name: 'lines',
  })

  // query lấy thông tin chi tiết nếu có idProduct từ popup Select Từ đơn mua
  const { data: dataAccMoveAllocation, isLoading: isLoadingAccMoveAllocation } =
    useQueryGetAccountAllocationList(
      {
        end: String(end),
        start: String(start),
        lineIds: [Number(idProduct)],
        type: 'ASSET',
        accountLedgerId: Number(accountLedger?.id),
      },
      { enabled: !!idProduct && !!(typeAddNewRouter === 'PURCHASE') }
    )

  // query lấy thông tin chi tiết nếu có idProduct từ popup Select Từ đơn mua
  const { data: dataAccAssets, isLoading: isLoadingAccAssets } =
    useQueryGetAssetGroupProduct(
      {
        end: String(end),
        start: String(start),
        productIds: [Number(idProduct)],
        type: 'ASSET',
      },
      { enabled: !!idProduct && !!(typeAddNewRouter === 'ASSET') }
    )

  const {
    data: dataLinesSaveEscAsset,
    isLoading: isLoadingSaveEscTool,
    refetch,
  } = useQueryGetIncreaseAssetDetail({ id }, { enabled: !!id })

  const tableDataSaveEscAsset = (fields ?? []).map((item, index) => {
    // if (id && item?.subjectType === 'STEP_STOOL_PRODUCTION') {
    //   setValue(`lines.${index}.stage`, item.configSubjectCosts)
    // }
    return {
      ratio: (
        <CoreInput
          label=''
          control={control}
          name={`lines.${index}.ratio`}
          placeholder='Nhập tỉ lệ'
        />
      ),
      accountName: (
        <CoreAutoCompleteAPI
          labelPath2='code'
          control={control}
          name={`lines.${index}.account`}
          label=''
          required
          rules={{
            required: t('common:validation.required'),
          }}
          placeholder='Chọn tài khoản'
          fetchDataFn={getAccountList}
        />
      ),
      subjectType: (
        <CoreAutocomplete
          control={control}
          name={`lines.${index}.subjectType`}
          label=''
          required
          rules={{
            required: t('common:validation.required'),
          }}
          placeholder='Chọn loại đối tượng THCP'
          options={subjectType}
          onChangeValue={(val) => {
            if (val) {
              setValue(`lines.${index}.configSubjectCosts`, null)
            }
          }}
        />
      ),
      configSubjectCosts: (
        <CoreAutoCompleteAPI
          label=''
          labelPath='name'
          labelPath2='code'
          placeholder='Chọn đối tượng THCP'
          control={control}
          name={`lines.${index}.configSubjectCosts`}
          params={{
            subjectType: watch(`lines.${index}.subjectType`),
          }}
          fetchDataFn={getSubjectCostConfigListByType}
          onChangeValue={(val) => {
            if (val) {
              setValue(`lines.${index}.stage`, null)
            }
          }}
        />
      ),
      stage: watch(`lines.${index}.subjectType`) ===
        'STEP_STOOL_PRODUCTION' && (
        <CoreAutoCompleteAPI
          control={control}
          name={`lines.${index}.stage`}
          label=''
          labelPath='name'
          labelPath2='code'
          params={{
            subjectType: watch(`lines.${index}.subjectType`),
            processId: watch(`lines.${index}.configSubjectCosts`)?.process?.id,
          }}
          placeholder='Chọn công đoạn'
          fetchDataFn={getSubjectCostConfigListByType}
          onChangeValue={(val) => {
            if (
              val &&
              watch(`lines.${index}.subjectType`) !== 'STEP_STOOL_PRODUCTION'
            ) {
              setValue(`lines.${index}.configSubjectCosts`, val)
            }
          }}
        />
      ),
      remove: (
        <div className='cursor-pointer'>
          <Image
            alt=''
            src={iconRemove}
            onClick={() => rmLinesSaveTool(index)}
          />
        </div>
      ),
    }
  })

  useEffect(() => {
    if (dataAccMoveAllocation?.data || dataAccAssets?.data) {
      const dt =
        dataAccMoveAllocation?.data?.content[0] ??
        dataAccAssets?.data?.content[0]

      const resetData: RequestBody['SAVE'] = {
        product: {
          code: dt?.sku,
          id: dt?.productId,
          name: dt?.name,
          sku: dt?.sku,
        },
        accountLedger: {
          code: accountLedger.code,
          name: accountLedger.name,
          id: accountLedger.id,
        },
        recordedValue: dt?.amountTotal,
        unit: dt?.unit,
        quantity: dt?.quantity ?? 0,
        typeAddNew: typeAddNewRouter,
        typeIncrease: typeIncreaseOrDecrease,
        mapRequest: dataAccMoveAllocation?.data?.content[0]?.mapRequest
          ? dataAccMoveAllocation?.data?.content[0]?.mapRequest
          : {},
        isNoDepreciation: false,
      }
      setValue('isNoDepreciation', false)

      reset({
        ...resetData,
        lines: [],
        isNoDepreciation: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAccMoveAllocation?.data, dataAccAssets?.data, accountLedger, reset])

  useEffect(() => {
    if (id && dataLinesSaveEscAsset?.data) {
      reset({
        ...dataLinesSaveEscAsset?.data,
        lines: (dataLinesSaveEscAsset?.data?.lines ?? []).map((item) => {
          return {
            ...item,
            configSubjectCosts: {
              ...item.configSubjectCosts,
              name:
                item.subjectType === 'STEP_STOOL_PRODUCTION'
                  ? item?.configSubjectCosts?.process?.name
                  : item?.configSubjectCosts?.subject?.name,
              code:
                item.subjectType === 'STEP_STOOL_PRODUCTION'
                  ? item?.configSubjectCosts?.process?.code
                  : item?.configSubjectCosts?.subject?.code,
            },
          }
        }),
        isNoDepreciation: !!dataLinesSaveEscAsset?.data?.isNoDepreciation,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLinesSaveEscAsset?.data, id])

  const columnSaveEscTool = useMemo(
    () =>
      [
        {
          header: 'Tỷ lệ phân bổ (%)',
          fieldName: 'ratio',
          styleCell: {
            style: {
              minWidth: 150,
            },
          },
        },
        {
          header: 'Tài khoản chi phí',
          fieldName: 'accountName',
        },
        {
          header: 'Loại đối tượng THCP',
          fieldName: 'subjectType',
        },
        {
          header: 'Đối tượng THCP',
          fieldName: 'configSubjectCosts',
        },
        ...(!!isDisColSelStage(watch('lines') ?? [])
          ? [
              {
                header: '',
                fieldName: 'stage',
              },
            ]
          : []),
        {
          header: ' ',
          fieldName: 'remove',
          styleCell: {
            styleCell: { style: { width: 10 } },
          },
        },
      ] as ColumnProps[],
    [isDisColSelStage(watch('lines') ?? [])]
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putIncreaseAsset : postIncreaseAsset,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.ASSET.ESC}/${pathRedirect}/[id]`,
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

  const onCancel = () => {
    router.back()
  }

  const onSubmit = handleSubmit(async (input) => {
    const { reason, ...rest } = input
    if (!reason || reason.length < 250) {
      let sumRatio = 0
      for (let item of input?.lines ?? []) {
        sumRatio += Number(item.ratio)
      }
      const formatLines = (input.lines ?? []).map((ele) => {
        const { name, code, ...restConfig } = ele?.configSubjectCosts || {} // Destructure `configSubjectCosts` từ `ele` với fallback rỗng.

        const { configSubjectCosts, ...restEle } = ele || {} // Destructure `stage` và `configSubjectCosts` từ `ele` với fallback rỗng.

        const updatedEle = {
          ...restEle,
          configSubjectCosts: restConfig, // Gán lại `configSubjectCosts` với phần còn lại của `restConfig`.
        }

        return updatedEle
      })

      const inputFormat = { ...input, lines: formatLines }
      console.log(inputFormat, 'lozz')

      if (sumRatio == 100) {
        //mutate(input)
        if (!!input.product.name) {
          if (input.typeAddNew === 'ASSET') {
            mutate({
              ...inputFormat,
              end: String(end),
              start: String(start),
            })
          } else {
            mutate(inputFormat)
          }
        } else {
          setError('product', {
            message: 'Trường này là bắt buộc!',
          })
        }
      } else {
        errorMsg('Tổng tỉ lệ phân bổ không hợp lệ!!!')
      }
    } else {
      return setError('reason', {
        message: 'Không được vượt quá 250 kí tự.' as string,
      })
    }
  })

  return [
    {
      accountLedgerId: accountLedger.id,
      id,
      actionType,
      fields,
      currencyId,
      currency,
      isUpdate: !!id,
      methodForm,
      columnSaveEscTool,
      isLoadingSubmit,
      tableDataSaveEscAsset,
      typeAddNewRouter,
      pathRedirect,
    },
    {
      handleParamsToolsAsset,
      onCancel,
      onSubmit,
      refetch,
      apLinesTool,
      rmLinesSaveTool,
    },
  ] as const
}

export default useSaveEscAssets
