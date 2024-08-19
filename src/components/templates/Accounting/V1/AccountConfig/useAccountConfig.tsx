import { useLoading } from '@/components/hooks/loading/useLoading'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAccountConfig } from '@/service/accounting/accountConfig/get'
import { useQueryGetHisAccountConfig } from '@/service/accounting/accountConfig/getHistory'
import { postAccountConfig } from '@/service/accounting/accountConfig/save'
import { RequestBody } from '@/service/accounting/accountConfig/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const useAccountConfig = () => {
  const { t } = useTranslation('accounting/account-config')
  const router = useRouter()

  const { executeWithLoading } = useLoading()

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      deleteBranchIds: [],
      vatTaxes: [],
      customerDebtAccountTypes: [],
      vendorDebtAccountTypes: [],
      internalReceiveAccountTypes: [],
      internalPayableDebtAccountTypes: [],
      staffReceiveAccountTypes: [],
      staffPayableAccountTypes: [],
      recordAllocatedCostAccountTypes: [],
      recordGeneralExpensesAccountTypes: [],
      isSimpleProduction: false,
      isCoefficientsRatiosProduction: false,
      isStepStoolProduction: false,
      isSaleOrder: false,
      isContract: false,
      salaryCostAccountTypes: [],
      materialCostAccountTypes: [],
    },
  })

  const id_history = router?.query?.id_history
  const numberOfHis = router?.query?.name
  console.log(router.query.id_history, id_history, 'query')

  const { control, formState, handleSubmit, reset, setError, setValue, watch } =
    methodForm

  const { data, isLoading } = useQueryGetAccountConfig({
    enabled: !id_history,
  })

  const {
    data: dataHisFiscal,
    isLoading: isLoadingHisFiscal,
    error: errorHis,
  } = useQueryGetHisAccountConfig(
    {
      fiscalYearId: Number(id_history),
    },
    {
      enabled: !!id_history,
    }
  )

  const onCancel = () => {
    router.back()
  }

  const {
    mutate,
    isLoading: isLoadingSubmit,
    isError,
    error,
  } = useMutation(postAccountConfig, {
    onSuccess: (res) => {
      successMsg(t('common:message.success'))
      // refetch()
    },
    onError: (error) => {
      errorMsg(error, setError)
    },
  })

  const onSubmit = executeWithLoading(
    handleSubmit(async (data) => {
      const formatData = { ...data, deleteBranchIds: [] }
      mutate(formatData)
    })
  )

  useEffect(() => {
    if (data?.data) {
      reset({
        ...data.data,
        vatTaxes: data.data?.vatTaxes ?? [],
        customerDebtAccountTypes: data?.data?.customerDebtAccountTypes ?? [],
        vendorDebtAccountTypes: data?.data?.vendorDebtAccountTypes ?? [],
        internalReceiveAccountTypes:
          data?.data?.internalReceiveAccountTypes ?? [],
        internalPayableDebtAccountTypes:
          data?.data?.internalPayableDebtAccountTypes ?? [],
        staffReceiveAccountTypes: data?.data?.staffReceiveAccountTypes ?? [],
        staffPayableAccountTypes: data?.data?.staffPayableAccountTypes ?? [],
        recordAllocatedCostAccountTypes:
          data?.data?.recordAllocatedCostAccountTypes ?? [],
        recordGeneralExpensesAccountTypes:
          data?.data?.recordGeneralExpensesAccountTypes ?? [],
        salaryCostAccountTypes: data?.data?.salaryCostAccountTypes ?? [],
        materialCostAccountTypes: data?.data?.materialCostAccountTypes ?? [],
      })
    }
  }, [data, reset])

  useEffect(() => {
    if (dataHisFiscal?.data && id_history) {
      reset({
        ...dataHisFiscal?.data,
        salaryCostAccountTypes:
          dataHisFiscal?.data?.salaryCostAccountTypes ?? [],
        materialCostAccountTypes:
          dataHisFiscal?.data?.materialCostAccountTypes ?? [],
        vatTaxes: dataHisFiscal?.data?.vatTaxes ?? [],
        customerDebtAccountTypes:
          dataHisFiscal?.data?.customerDebtAccountTypes ?? [],
        vendorDebtAccountTypes:
          dataHisFiscal?.data?.vendorDebtAccountTypes ?? [],
        internalReceiveAccountTypes:
          dataHisFiscal?.data?.internalReceiveAccountTypes ?? [],
        internalPayableDebtAccountTypes:
          dataHisFiscal?.data?.internalPayableDebtAccountTypes ?? [],
        staffReceiveAccountTypes:
          dataHisFiscal?.data?.staffReceiveAccountTypes ?? [],
        staffPayableAccountTypes:
          dataHisFiscal?.data?.staffPayableAccountTypes ?? [],
        recordAllocatedCostAccountTypes:
          dataHisFiscal?.data?.recordAllocatedCostAccountTypes ?? [],
        recordGeneralExpensesAccountTypes:
          dataHisFiscal?.data?.recordGeneralExpensesAccountTypes ?? [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataHisFiscal])

  return [
    {
      isLoadingHisFiscal,
      numberOfHis,
      id_history,
      control,
      formState,
      isLoading,
      isLoadingSubmit,
      methodForm,
      branchAcc: watch('branchAccounting'),
    },
    { onSubmit, setValue, onCancel, watch },
  ] as const
}

export default useAccountConfig
