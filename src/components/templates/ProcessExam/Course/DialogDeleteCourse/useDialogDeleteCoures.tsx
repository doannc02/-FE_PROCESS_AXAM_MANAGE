import { getRole } from '@/config/token'
import { errorMsg, successMsg } from '@/helper/message'
import { MENU_URL } from '@/routes'
import { actionCourse } from '@/service/course'
import { actionExams } from '@/service/exam'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'

const useDialogDeleteCourse = ({ id }: { id: number }) => {
  const router = useRouter()
  const { mutate, isLoading } = useMutation(actionCourse, {
    onSuccess: (res) => {
      successMsg('Thành công')
      router.push({
        pathname: `${MENU_URL.COURSE}`,
      })
    },
    onError: (error) => {
      errorMsg(error)
    },
  })

  const onSubmit = () => {
    mutate({ method: 'delete', params: { id: id } })
  }
  return [{ isLoading }, { onSubmit }] as const
}
export default useDialogDeleteCourse
