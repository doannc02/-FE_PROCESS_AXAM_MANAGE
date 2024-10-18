import { getRole } from '@/config/token'
import { errorMsg, successMsg } from '@/helper/message'
import { MENU_URL } from '@/routes'
import { actionExams } from '@/service/exam'
import { actionExamSet } from '@/service/examSet'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'

const useDialogDeleteExamSet = ({ id }: { id: number }) => {
  const role = getRole()
  const router = useRouter()
  const { mutate, isLoading } = useMutation(actionExamSet, {
    onSuccess: (res) => {
      successMsg('Thành công')
      router.push({
        pathname: `${MENU_URL.EXAM_SET}`,
      })
    },
    onError: (error) => {
      errorMsg(error)
    },
  })

  const onSubmit = () => {
    mutate({ method: 'delete', params: { examSetId: id, examSetOnly: false } })
  }
  return [{ role, isLoading }, { onSubmit }] as const
}
export default useDialogDeleteExamSet
