import { getRole } from '@/config/token'
import { errorMsg, successMsg } from '@/helper/message'
import { actionExams, getDetailExam } from '@/service/exam'
import { Exam } from '@/service/examSet/type'
import { Proposals } from '@/service/proposals/type'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQueryClient } from 'react-query'

const useDetailExamSet = ({ indexExamSet }: { indexExamSet: number }) => {
  const role = getRole()
  const router = useRouter()
  const { actionType, id } = router.query
  const [isLoadingUpdateStateExam, setLoadingUpdateStateExam] =
    useState<boolean>()
  const methodForm = useFormContext<Proposals>()
  const { setValue, setError, clearErrors, getValues } = methodForm
  const queryClient = useQueryClient()
  const isView = !!id && actionType === 'VIEW'
  const submitChangeStateExam = async (input: Exam, index: number) => {
    try {
      if (role !== 'Admin') return
      let valid = true
      if (!getValues(`exam_sets.${indexExamSet}.exams.${index}.comment`)) {
        setError(`exam_sets.${indexExamSet}.exams.${index}.comment`, {
          message: `Hãy nhập nhận xét cho đề ${input.name}`,
        })
        valid = false
      }
      if (valid) {
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
            console.log(detail.data, 'log')
            setValue(
              `exam_sets.${indexExamSet}.exams.${index}`,
              detail.data as any
            )
          }

          successMsg(`Phê duyệt đề ${input.name} thành công!!`)
          setLoadingUpdateStateExam(false)
          if (
            index ===
            Number(
              (methodForm.watch(`exam_sets.${indexExamSet}.exams`) ?? [])
                .length - 1
            )
          ) {
            queryClient.invalidateQueries({
              queryKey: ['api/v1/proposals/detail'],
            })
          }
          console.log(
            methodForm.watch(`exam_sets.${indexExamSet}.exams.${index}`),
            'log watch'
          )
        }
      }
    } catch (ex: any) {
      setLoadingUpdateStateExam(false)
      errorMsg(`Phê duyệt đề ${input.name} thất bại!!`, ex?.message)
    }
  }
  return [
    { methodForm, isView, role, router, isLoadingUpdateStateExam },
    { submitChangeStateExam, clearErrors },
  ] as const
}
export default useDetailExamSet
