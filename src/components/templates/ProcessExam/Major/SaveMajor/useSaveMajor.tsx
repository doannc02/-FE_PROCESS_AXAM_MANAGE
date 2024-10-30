import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { actionMajor, useQueryGetDetailMajor } from '@/service/major'
import { Major } from '@/service/major/type'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const useSaveMajor = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id, actionType } = router.query

  const { showDialog } = useDialog()

  const defaultValues = {
    id: null,
  } as any
  const methodForm = useFormCustom<Major>({ defaultValues })

  const { control, handleSubmit, setError, reset } = methodForm

  const isUpdate = !!id
  const isView = !!id && actionType === 'VIEW'

  const { data, isLoading, refetch } = useQueryGetDetailMajor(
    {
      id: Number(id),
    },
    {
      enabled: !!id,
    }
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionMajor, {
    onSuccess: (res: any) => {
      if (res?.data?.errs) {
        errorMsg(res?.data?.message ?? 'Đã tồn tại')
        ;(res?.data?.errs ?? []).map((item: any) => {
          setError(item.field, item.message)
        })
        return
      }
      if (res?.data && res?.data?.id) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.COURSE}/[id]`,
          query: {
            id: res?.data?.id,
            actionType: 'VIEW',
          },
        })
        refetch()
        return
      }
      if (Array.isArray(res?.data) && res?.data?.length > 0) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.COURSE}`,
        })
        refetch()
      }
    },
    onError: (error: any) => {
      errorMsg(error, setError)
    },
  })

  useEffect(() => {
    if (!!id && data?.data) {
      reset(data?.data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.data])

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
    },
    { onSubmit, t, showDialog },
  ] as const
}

export default useSaveMajor
