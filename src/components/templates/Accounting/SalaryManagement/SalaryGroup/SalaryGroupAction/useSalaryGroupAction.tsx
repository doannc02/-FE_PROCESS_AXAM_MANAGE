import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { createSalaryGroup, updateSalaryGroup } from '@/service/accounting/mangementSalaryTable/SalaryGroup/action'
import { useGetDetailSalaryGroup } from '@/service/accounting/mangementSalaryTable/SalaryGroup/get'
import { GroupSalaryDetail } from '@/service/accounting/mangementSalaryTable/SalaryGroup/get/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'

const defaultValues = {
  code: "",
  name: "",
  description: '',
}

const useSalaryGroupAction = () => {
  const router = useRouter()

  const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)

  const id = Number(router.query.id)

  const queryClient = useQueryClient()

  const methods = useFormCustom<GroupSalaryDetail>({ defaultValues })

  const { handleSubmit, reset, setError } = methods

  const { mutate, isLoading: loadingSubmit } = useMutation(
    !!id ? updateSalaryGroup : createSalaryGroup,
    {
      onSuccess: (data) => {
        successMsg(t('common:message.success'))
        queryClient.invalidateQueries({
          queryKey: ["api/v1/group-salary-column", data.data.id]
        })
        router.push({
          pathname: `${MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP}/[id]`,
          query: { id: data.data.id, actionType: 'VIEW' },
        })
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const { data: getDetailSalaryColumn, isLoading: isLoadingGetDetailSalaryColumn } = useGetDetailSalaryGroup({ id: id }, { enabled: !!id })

  const onSubmit = handleSubmit((input) => {
    mutate({ ...input })
  })

  const onCancel = () => {
    router.push({
      pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP,
    })
  }

  useEffect(() => {
    if (getDetailSalaryColumn) {
      reset(getDetailSalaryColumn.data)
    }
  }, [getDetailSalaryColumn])

  return [
    {
      t,
      methods,
      router,
      getDetailSalaryColumn,
      isLoadingGetDetailSalaryColumn,
      loadingSubmit
    },
    { t, onSubmit, onCancel },
  ] as const
}

export default useSalaryGroupAction
