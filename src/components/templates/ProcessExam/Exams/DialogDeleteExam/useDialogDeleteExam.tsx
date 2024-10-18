import { getRole } from '@/config/token'
import { errorMsg, successMsg } from '@/helper/message'
import { MENU_URL } from '@/routes'
import { actionExams } from '@/service/exam'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'

const useDialogDeleteExam = ({ id }: { id: number }) => {
  const role = getRole()
  const [isLoadingUpdateStateExam, setLoadingUpdateStateExam] =
    useState<boolean>()
  const router = useRouter()
  const { mutate, isLoading } = useMutation(actionExams, {
    onSuccess: (res) => {
      successMsg('Thành công')
      router.push({
        pathname: `${MENU_URL.DETAIL_EXAM}`,
      })
    },
    onError: (error) => {
      errorMsg(error)
    },
  })

  const onSubmit = () => {
    mutate({ method: 'delete', params: { id: id } })
  }
  return [{ role, isLoadingUpdateStateExam }, { onSubmit }] as const
}
export default useDialogDeleteExam
