import { useDialog } from '@/components/hooks/dialog/useDialog'
import { getRole } from '@/config/token'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { actionExamSet } from '@/service/examSet'
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
  const defaultValues = {
    status: 'in_progress' as any,
    isCreateExamSet: false,
  }
  const { t } = useTranslation('')

  const methodForm = useFormCustom<Proposals>({
    defaultValues,
  })

  const { control, watch, setValue, reset, setError, handleSubmit } = methodForm
  const router = useRouter()
  const isAddNew = router.asPath.includes('/addNew')
  const isTracking = router.asPath.includes('/trackingApprove')
  const { actionType, id } = router.query
  const isUpdate = !!id && !isAddNew
  const isView = actionType === 'VIEW'

  const { showDialog } = useDialog()
  // get data detail step proposal
  const { data, isLoading, refetch } = useQueryGetDetailProposals(
    {
      id: Number(id),
    },
    { enabled: !!id }
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exam_sets',
    keyName: 'key',
  })

  // mutate proposal
  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionProposals, {
    onSuccess: (res: any) => {
      successMsg(t('common:message.success'))

      if (res?.data?.id) {
        let path = isTracking ? MENU_URL.TRACKING : MENU_URL.PROPOSAL
        router.push({
          pathname: `${path}/[id]`,
          query: {
            id: res?.data?.id,
            actionType: 'VIEW',
          },
        })
        refetch()
      }
    },
    onError: (error: any) => {
      errorMsg(error, setError)
      refetch()
    },
  })

  useEffect(() => {
    if (isUpdate && data?.data) {
      reset({
        ...data?.data?.data,
        end_date: convertToDate(data?.data?.data?.end_date, 'YYYY-MM-DD'),
        start_date: convertToDate(data?.data?.data?.start_date, 'YYYY-MM-DD'),
        isCreateExamSet: data?.data?.data?.exam_sets?.length > 0 ? true : false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data, isUpdate, reset])

  const onSubmitDraft = handleSubmit(async (input) => {
    let valid = true
    input.exam_sets.map((i) => {
      if (!i.name) {
        errorMsg(
          'Vui lòng nhập thông tin cho bộ đề hoặc lưu nháp nhưng không tạo kèm theo bộ đề!!!'
        )
        valid = false
      }
    })
    const { isCreateExamSet, ...rest } = input

    if (valid) {
      mutate({
        method: isUpdate ? 'put' : 'post',
        data: {
          ...rest,
          exam_sets: !watch('isCreateExamSet') ? [] : input.exam_sets,
          status: isAddNew
            ? 'in_progress'
            : role === 'Admin'
            ? input.status
            : 'in_progress',
        },
      })
    }
  })

  const onSubmitPendingApprove = handleSubmit(async (input) => {
    let valid = true
    let countExams
    const { isCreateExamSet, ...rest } = input
    input.exam_sets.map((i) => {
      if (i.status === 'in_progress') {
        errorMsg(
          'Không thể chuyển trạng thái do kế hoạch này vẫn còn Bộ đề đang thực hiện!!'
        )
        valid = false
      }
      countExams = +i.exams.length
      i.exams.map((ele) => {
        if (ele.status === 'in_progress' || ele.status === 'rejected') {
          errorMsg(
            'Không thể chuyển trạng thái do kế hoạch này vẫn còn đề đang thực hiện!!'
          )
          valid = false
        }
      })
    })
    if (countExams === 0) {
      errorMsg(
        'Không thể chuyển trạng thái sang chờ duyệt do kế hoạch này không có đề chi tiết trong bộ đề!!'
      )
      valid = false
    }
    if (input.exam_sets.length === 0) {
      errorMsg(
        'Không thể chuyển trạng thái do kế hoạch này không có bộ đề nào!!'
      )
      valid = false
    }

    if (valid) {
      mutate({
        method: isUpdate ? 'put' : 'post',
        data: {
          ...rest,
          exam_sets: input.exam_sets,
          status: 'pending_approval',
        },
      })
    }
  })

  const onSubmitReject = handleSubmit(async (input) => {
    let valid = true
    let countExams
    const { isCreateExamSet, ...rest } = input
    input.exam_sets.map((i) => {
      if (i.status === 'in_progress') {
        errorMsg(
          'Không thể chuyển trạng thái từ chối do kế hoạch này vẫn còn Bộ đề đang thực hiện!!'
        )
        valid = false
      }
      countExams = +i.exams.length
      i.exams.map((ele) => {
        if (ele.status === 'in_progress') {
          errorMsg(
            'Không thể chuyển trạng thái từ chối do kế hoạch này vẫn còn đề đang thực hiện!!'
          )
          valid = false
        }
      })
    })
    if (countExams) {
      errorMsg(
        'Không thể phê duyệt do kế hoạch này không có đề chi tiết nào trong bộ đề!!'
      )
      valid = false
    }
    if (input.exam_sets.length === 0) {
      errorMsg('Không thể phê duyệt do kế hoạch này không có bộ đề nào!!')
      valid = false
    }
    if (valid) {
      mutate({
        method: isUpdate ? 'put' : 'post',
        data: {
          ...rest,
          exam_sets: input.exam_sets,
          status: 'rejected',
        },
      })
    }
  })

  const onSubmitApprove = handleSubmit(async (input) => {
    let valid = true
    let countExams
    const { isCreateExamSet, ...rest } = input
    input.exam_sets.map((i) => {
      if (i.status === 'in_progress') {
        errorMsg(
          'Không thể chuyển trạng thái từ chối do kế hoạch này vẫn còn Bộ đề đang thực hiện!!'
        )
        valid = false
      }
      countExams = +i.exams.length
      i.exams.map((ele) => {
        if (ele.status === 'in_progress' || ele.status === 'rejected') {
          errorMsg(
            'Không thể chuyển trạng thái từ chối do kế hoạch này vẫn còn đề đang thực hiện!!'
          )
          valid = false
        }
      })
    })
    if (countExams === 0) {
      errorMsg(
        'Không thể phê duyệt do kế hoạch này không có đề chi tiết trong bộ đề!!'
      )
      valid = false
    }
    if (input.exam_sets.length === 0) {
      errorMsg('Không thể phê duyệt do kế hoạch này không có bộ đề nào!!')
      valid = false
    }

    mutate({
      method: isUpdate ? 'put' : 'post',
      data: {
        ...rest,
        exam_sets: input.exam_sets,
        status: 'approved',
      },
    })
  })

  const onUpdateState = async (state: state) => {
    try {
      const params = {
        status: state,
        proposalId: watch('id'),
      } as RequestProposals['UPDATE_STATE']
      const res = await changeStateProposal(params)
      if (res?.data?.id) {
        console.log(res?.data, 'resdata')
        successMsg('Phê duyệt thành công!!!')
        router.push({
          pathname: `${MENU_URL.PROPOSAL}/[id]`,
          query: {
            id: res?.data?.id,
            actionType: 'VIEW',
          },
        })
        refetch()
      }
    } catch {
      errorMsg('Phê duyệt bộ đề thất bại!')
    }
  }

  const onChangeStateExam = async (
    status: 'rejected' | 'approved',
    index: number
  ) => {
    try {
      const res = await actionExamSet({
        method: 'put',
        data: { ...watch(`exam_sets.${index}`), status: status },
      })
      if (res.data) {
        setValue(`exam_sets.${index}`, res.data)
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
      router,
      isLoadingSubmit,
      isView,
      isUpdate,
      actionType,
      isAddNew,
      role,
      fields,
      id,
      isTracking,
    },
    {
      onSubmitPendingApprove,
      onSubmitDraft,
      setValue,
      onChangeStateExam,
      onUpdateState,
      t,
      append,
      remove,
      onSubmitApprove,
      onSubmitReject,
      showDialog,
    },
  ] as const
}
