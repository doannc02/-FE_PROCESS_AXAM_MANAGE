import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import {
  actionAcademic,
  useQueryGetDetailAcademic,
} from '@/service/academicYear'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const useSaveAcademicYear = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id, actionType } = router.query

  const { showDialog } = useDialog()

  const defaultValues = {
    id: null,
  } as any
  const methodForm = useFormCustom<any>({ defaultValues })

  const { handleSubmit, reset } = methodForm

  const isUpdate = !!id
  const isView = !!id && actionType === 'VIEW'

  const { data, isLoading, refetch } = useQueryGetDetailAcademic(
    {
      id: Number(id),
    },
    {
      enabled: !!id,
    }
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionAcademic, {
    onSuccess: (res: any) => {
      if (res?.data && res?.data?.id) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.ACADEMIC}`,
        })
        refetch()
        return
      }
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  useEffect(() => {
    if (!!id && data?.data) {
      reset(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data])

  const onSubmit = handleSubmit(async (input) => {
    mutate({
      method: isUpdate ? 'put' : 'post',
      data: input,
    })
  })

  return [
    {
      isLoading,
      isLoadingSubmit,
      methodForm,
      isUpdate,
      isView,
      id,
      router,
      name: methodForm.watch('name'),
    },
    { onSubmit, t, showDialog },
  ] as const
}

export default useSaveAcademicYear
