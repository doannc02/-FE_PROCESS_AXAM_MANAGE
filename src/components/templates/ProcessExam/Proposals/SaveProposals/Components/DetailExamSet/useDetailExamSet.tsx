import { getRole } from '@/config/token'
import { errorMsg, successMsg } from '@/helper/message'
import { actionExams, changeStateExam, getDetailExam } from '@/service/exam'
import { Exam, state } from '@/service/examSet/type'
import { Proposals } from '@/service/proposals/type'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'

const useDetailExamSet = ({ indexExamSet }: { indexExamSet: number }) => {
  const role = getRole()
  const [isLoadingUpdateStateExam, setLoadingUpdateStateExam] =
    useState<boolean>()
  const methodForm = useFormContext<Proposals>()
  const { setValue, getValues } = methodForm
  //  const { mutate } = useMutation(, {})

  const submitChangeStateExam = async (input: Exam, index: number) => {
    if (role !== 'Admin') return
    try {
      setLoadingUpdateStateExam(true)
      const res = await actionExams({
        method: 'put',
        data: input,
      })
      if (res.data?.id) {
        const detail = await getDetailExam({
          examId: res?.data?.id,
        })
        if (detail.data) {
          setValue(
            `exam_sets.${indexExamSet}.exams.${index}`,
            detail.data as any
          )
        }
        successMsg(`Phê duyệt đề ${input.name} thành công!!`)
        setLoadingUpdateStateExam(false)
      }
    } catch (ex: any) {
      setLoadingUpdateStateExam(false)
      errorMsg(`Phê duyệt đề ${input.name} thất bại!!`, ex?.message)
    }
  }
  return [
    { methodForm, role, isLoadingUpdateStateExam },
    { submitChangeStateExam },
  ] as const
}
export default useDetailExamSet
