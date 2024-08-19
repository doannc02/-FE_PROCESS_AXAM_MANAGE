import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setLedgerRefConfig } from '@/redux/reducer/ledgerRefReducer'
import { MENU_URL } from '@/routes'
import {
  getAccountLedgerDetail,
  useQueryGetAccountLedgerDetail,
} from '@/service/accounting/accountLedger/getDetail'
import {
  postAccountLedger,
  putAccountLedger,
} from '@/service/accounting/accountLedger/save'
import { RequestBody } from '@/service/accounting/accountLedger/save/type'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  name: '',
}

const useSaveLedger = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'
  const dispatch = useAppDispatch()
  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { control, formState, handleSubmit, reset, setError, watch } =
    methodForm

  const { data, isLoading, refetch } = useQueryGetAccountLedgerDetail(
    { id },
    { enabled: !!id }
  )
  const { id: idLedger } = useAppSelector((state) => state.ledgerRefData)
  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
  }, [id, data, reset])

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAccountLedger : postAccountLedger,
    {
      onSuccess: async (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.CONFIG.ACCOUNTING.LEDGER}/[id]`,
            query: {
              id: res?.data?.data?.id,
              actionType: 'VIEW',
            },
          })
          if (res?.data?.data?.id === Number(idLedger)) {
            const dt = await getAccountLedgerDetail({ id: id })
            if (dt?.data || !!idLedger) {
              dispatch(
                setLedgerRefConfig({
                  id: res.data?.data.id ?? null,
                  name: dt?.data?.name,
                  code: dt?.data?.code,
                })
              )
            }
          } else {
            if (!!idLedger) {
              dispatch(
                setLedgerRefConfig({
                  id: null,
                  name: 'Chọn sổ cái',
                  code: '',
                })
              )
            }
          }

          refetch()
        }
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  return [
    {
      id,
      control,
      formState,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      methodForm,
      isView,
    },
    { onSubmit, onCancel, watch },
  ] as const
}

export default useSaveLedger
function putAccountAccountLedger(variables: void): Promise<unknown> {
  throw new Error('Function not implemented.')
}
