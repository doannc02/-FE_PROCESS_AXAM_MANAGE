import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { RequestBody } from '@/service/generalAccounting/openOrLockUpBook/save/type'
import { useQueryGetAccountingBookDetail } from '@/service/generalAccounting/openOrLockUpBook/getDetail'
import { AccountingBook } from '@/service/generalAccounting/openOrLockUpBook/getDetail/type'
import {
  postAccountingBookKey,
  putAccountingBookKey,
} from '@/service/generalAccounting/openOrLockUpBook/save'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useAppSelector } from '@/redux/hook'

const useOpenOrLockUp = () => {
  const { t } = useTranslation('')

  const { id: idLedger } = useAppSelector((state) => state.ledgerRefData)

  const router = useRouter()

  const id = Number(router.query?.id)

  const { actionType, statusType } = router.query

  const {
    data,
    isLoading: isLoadingQuery,
    refetch,
  } = useQueryGetAccountingBookDetail(
    {
      accountLedgerId: Number(idLedger),
    },
    { enabled: !!idLedger }
  )

  const checkStatusType = useMemo(() => {
    return router.pathname.includes('/lockUpBook') ? 'BLOCK' : 'OPEN'
  }, [router.pathname])

  const methodForm = useFormCustom<RequestBody['SAVE']>({})
  const { handleSubmit, setError, reset } = methodForm

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    checkStatusType !== 'BLOCK' ? putAccountingBookKey : postAccountingBookKey,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res) {
          const pathname =
            checkStatusType === 'OPEN'
              ? `${MENU_URL.GENERAL_ACC.OPEN_BOOK}/[id]`
              : `${MENU_URL.GENERAL_ACC.LOCKUP_BOOK}/[id]`

          router.push({
            pathname: pathname,
            query: {
              id: idLedger,
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
    if (input) {
      await mutate(input)
    }
  })

  useEffect(() => {
    if (idLedger && data?.data?.id) {
      reset({
        params: {
          accountLedgerId: Number(idLedger),
        },
        body: { ...data?.data },
      })
    } else {
      reset({
        params: {
          accountLedgerId: Number(idLedger),
        },
        body: { actualClosingDate: '', newClosingDate: '' },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data, id, idLedger, reset])

  return [
    {
      isLoadingSubmit,
      id,
      methodForm,
      actionType,
      checkStatusType,
      isView: actionType !== 'VIEW',
    },
    { onSubmit, onCancel, refetch },
  ] as const
}

export default useOpenOrLockUp
