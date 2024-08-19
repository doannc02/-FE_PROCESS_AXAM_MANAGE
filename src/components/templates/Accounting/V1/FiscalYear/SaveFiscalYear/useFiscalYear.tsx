import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetFiscalYear } from '@/service/accounting/fiscalYear/getDetail'
import {
  postFiscalYear,
  putFiscalYear,
} from '@/service/accounting/fiscalYear/save'
import { RequestBody } from '@/service/accounting/fiscalYear/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  activated: true,
}

const useFiscalYear = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { control, formState, handleSubmit, reset, setError } = methodForm

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putFiscalYear : postFiscalYear,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        router.back()
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  const { data, isLoading } = useQueryGetFiscalYear({ id }, { enabled: !!id })

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
  }, [id, data, reset])

  return [
    { control, formState, isUpdate, isLoading, isLoadingSubmit },
    { onSubmit, onCancel },
  ] as const
}

export default useFiscalYear
