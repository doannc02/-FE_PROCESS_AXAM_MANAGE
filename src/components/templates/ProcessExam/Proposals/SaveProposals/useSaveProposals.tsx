import { useDialog } from '@/components/hooks/dialog/useDialog'
import { getRole } from '@/config/token'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { actionExamSet, getDetailExamSet } from '@/service/examSet'
import { state } from '@/service/examSet/type'
import {
  actionProposals,
  changeStateProposal,
  useQueryGetDetailProposals,
} from '@/service/proposals'
import { Proposals, RequestProposals } from '@/service/proposals/type'
import { convertToDate } from '@/utils/date/convertToDate'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export const useSaveProposals = () => {
  const role = getRole()
  const { t } = useTranslation('')
  const { showDialog } = useDialog()
  const router = useRouter()

  const isAddNew = router.asPath.includes('/addNew')
  const isTracking = router.asPath.includes('/trackingApprove')
  const { actionType, id } = router.query
  const isUpdate = !!id && !isAddNew
  const isView = actionType === 'VIEW'

  const defaultValues = {
    status: 'in_progress' as
      | 'in_progress'
      | 'approved'
      | 'pending_approval'
      | 'rejected',
    isCreateExamSet: false,
  }

  const methodForm = useFormCustom<Proposals>({ defaultValues })
  const { control, watch, setValue, reset, setError, handleSubmit } = methodForm

  const { data, isLoading, refetch } = useQueryGetDetailProposals(
    { id: Number(id) },
    { enabled: !!id }
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exam_sets',
    keyName: 'key',
  })

  const handleSuccess = (res: any, status: string) => {
    successMsg(t('common:message.success'))
    if (res?.data?.id) {
      const path = isTracking ? MENU_URL.TRACKING : MENU_URL.PROPOSAL
      router.push({
        pathname: `${path}/[id]`,
        query: { id: res.data.id, actionType: 'VIEW' },
      })
      refetch()
    }
  }

  const handleValidationErrors = (messages: string[]) => {
    messages.forEach((msg) => errorMsg(msg))
  }

  const validateExamSets = (examSets: any[]): boolean => {
    const validationMessages: string[] = []
    let isValid = true

    examSets.forEach((examSet) => {
      if (!examSet.name) {
        validationMessages.push(
          'Please fill out the exam set details or save without creating an exam set.'
        )
        isValid = false
      }

      const incompleteExams = examSet.exams.filter(
        (exam: any) =>
          exam.status === 'in_progress' || exam.status === 'rejected'
      )
      if (incompleteExams.length > 0) {
        validationMessages.push('Some exams are still in progress or rejected.')
        isValid = false
      }
    })

    if (!isValid) handleValidationErrors(validationMessages)
    return isValid
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionProposals, {
    onSuccess: (res) => {
      handleSuccess(res, 'in_progress')
      refetch()
    },
    onError: (error) => {
      errorMsg(error, setError)
      refetch()
    },
  })

  useEffect(() => {
    if (isUpdate && data?.data) {
      reset({
        ...data.data,
        end_date: convertToDate(data.data.end_date, 'YYYY-MM-DD'),
        start_date: convertToDate(data.data.start_date, 'YYYY-MM-DD'),
        isCreateExamSet: !!data.data.exam_sets.length,
      })
    }
  }, [data?.data, isUpdate, reset])

  const submitProposal = (
    status: 'in_progress' | 'approved' | 'pending_approval' | 'rejected'
  ) =>
    handleSubmit((input) => {
      if (validateExamSets(input.exam_sets)) {
        mutate({
          method: isUpdate ? 'put' : 'post',
          data: {
            ...input,
            exam_sets: watch('isCreateExamSet') ? input.exam_sets : [],
            status: status !== 'pending_approval' ? status : 'pending_approval',
          },
        })
      }
    })

  const onChangeStateExam = async (
    status: 'rejected' | 'approved',
    index: number
  ) => {
    try {
      const res = await actionExamSet({
        method: 'put',
        data: { ...watch(`exam_sets.${index}`), status },
      })
      if (res.data?.id) {
        const response = await getDetailExamSet({ req: res.data.id })
        if (response.data) setValue(`exam_sets.${index}`, response.data)
      }
    } catch (err) {
      errorMsg(err)
      refetch()
    }
  }

  return [
    {
      methodForm,
      isLoading,
      isLoadingSubmit,
      isView,
      isUpdate,
      router,
      actionType,
      isAddNew,
      role,
      fields,
      id,
      isTracking,
    },
    {
      onSubmitDraft: submitProposal('in_progress'),
      onSubmitPendingApprove: submitProposal('pending_approval'),
      onSubmitApprove: submitProposal('approved'),
      onSubmitReject: submitProposal('rejected'),
      setValue,
      append,
      remove,
      showDialog,
      onChangeStateExam,
      t,
    },
  ] as const
}
