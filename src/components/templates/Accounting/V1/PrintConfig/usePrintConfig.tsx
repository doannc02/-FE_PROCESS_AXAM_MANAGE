import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetSignatureConfig } from '@/service/common/signatureConfig/get'
import { postSignatureConfig } from '@/service/common/signatureConfig/save'
import { RequestBody } from '@/service/common/signatureConfig/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const usePrintConfig = () => {
  const { t } = useTranslation('account/account-print')
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<{
    data: RequestBody['SAVE']
  }>({
    defaultValues: {
      data: [
        {
          id: null,
          signatures: [],
        },
      ],
    },
  })

  const { control, formState, handleSubmit, reset, setError } = methodForm

  const { data } = useQueryGetSignatureConfig()

  useEffect(() => {
    if (data) {
      reset({
        data:
          data.data.length > 0
            ? data.data
            : [
                {
                  id: null,
                  signatures: [],
                },
              ],
      })
    }
  }, [data, reset])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
    keyName: 'key',
  })

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    postSignatureConfig,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data.data)
  })

  return [
    {
      fields,
      control,
      formState,
      isUpdate,
      isLoadingSubmit,
      methodForm,
    },
    { append, remove, onSubmit, onCancel },
  ] as const
}

export default usePrintConfig
