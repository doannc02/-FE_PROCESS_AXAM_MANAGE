import { getRole } from '@/config/token'
import { errorMsg, successMsg } from '@/helper/message'
import { changeStateExam } from '@/service/exam'
import { state } from '@/service/examSet/type'
import { Proposals } from '@/service/proposals/type'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'

const useDetailExamSet = () => {
  const role = getRole()
  const [isLoadingUpdateStateExam, setLoadingUpdateStateExam] =
    useState<boolean>()
  const methodForm = useFormContext<Proposals>()
  const { setValue, getValues } = methodForm
  //  const { mutate } = useMutation(, {})
  const submitChangeStateExam = async (
    indexExamSet: number,
    indexExam: number,
    idExam: number,
    state: state
  ) => {
    successMsg('Vào')
    if (role !== 'Admin') return
    try {
      setLoadingUpdateStateExam(true)
      const res = await changeStateExam({
        id: idExam,
        state: state,
        comment:
          getValues(`exam_sets.${indexExamSet}.exams.${indexExam}.comment`) ??
          '',
      })
      if (res.data) {
        successMsg('Update trạng thái thành công!!')
        setValue(
          `exam_sets.${indexExamSet}.exams.${indexExam}.status`,
          res?.data?.data.state
        )
        setLoadingUpdateStateExam(false)
      }
    } catch (ex: any) {
      setLoadingUpdateStateExam(false)
      errorMsg('Update trạng thái đề thất bại!', ex?.message)
    }
  }
  return [
    { methodForm, isLoadingUpdateStateExam },
    { submitChangeStateExam },
  ] as const
}
export default useDetailExamSet
