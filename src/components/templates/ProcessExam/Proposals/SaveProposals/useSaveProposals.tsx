import { useDialog } from '@/components/hooks/dialog/useDialog'
import DisplayStatus from '@/components/molecules/DisplayStatus'
import { Tooltip } from '@/components/molecules/Tooltip'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppDispatch } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { state } from '@/service/examSet/type'
import {
  actionProposals,
  changeStateProposal,
  useQueryGetDetailProposals,
} from '@/service/proposals'
import { Proposals, RequestProposals } from '@/service/proposals/type'
import { convertToDate } from '@/utils/date/convertToDate'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
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
  const dispatch = useAppDispatch()
  const methodForm = useFormCustom<Proposals>({
    defaultValues,
  })

  const { control, watch, setValue, reset, setError, handleSubmit } = methodForm
  const router = useRouter()
  const isAddNew = router.asPath.includes('/addNew')
  const { actionType, id } = router.query
  const isUpdate = !!id && !isAddNew
  const isView = actionType === 'VIEW'

  const { hideDialog, showDialog } = useDialog()
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

  const columns = useMemo(
    () =>
      [
        {
          header: 'Bộ đề',
          fieldName: 'name',
        },
        {
          header: 'Ngành',
          fieldName: 'department',
        },
        {
          header: 'Chuyên ngành',
          fieldName: 'major',
        },
        // {
        //   header: 'Số đề đang thực hiện',
        //   fieldName: 'total_exams',
        // },
        {
          header: 'Số đề yêu cầu',
          fieldName: 'exam_quantity',
        },
        {
          header: 'Mô tả',
          fieldName: 'description',
        },
        {
          header: 'Giảng viên thực hiện',
          fieldName: 'userName',
        },
        {
          header: 'Học phần',
          fieldName: 'courseName',
        },
        {
          header: 'Trạng thái',
          fieldName: 'status',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )
  const tableData = (fields ?? []).map((item) => {
    return {
      ...item,
      id: item?.id,
      major: item?.major?.name,
      department: item?.department?.name,
      courseName: item?.course?.code + ' - ' + item?.course?.name,
      userName: item?.user?.name ?? '-',
      description: item?.description && (
        <Stack direction='row' justifyContent='space-between'>
          <Typography>{item?.description.slice(0, 19)}</Typography>
          {item?.description?.length > 20 ? (
            <div className='w-1/3'>
              <Tooltip
                isShowIcon
                showText
                tooltips={[{ title: item?.description ?? '' }]}
              ></Tooltip>
            </div>
          ) : (
            <div className='w-1/3'></div>
          )}
        </Stack>
      ),
      status: (
        <DisplayStatus
          text={
            item?.status === 'pending_approval'
              ? 'Chờ phê duyệt'
              : item?.status === 'in_progress'
              ? 'Đang thực hiện'
              : item?.status === 'approved'
              ? 'Đã phê duyệt'
              : 'Bị từ chối'
          }
          color={
            item?.status === 'pending_approval'
              ? ORANGE
              : item?.status === 'in_progress'
              ? BLACK
              : item?.status === 'approved'
              ? GREEN
              : RED
          }
        />
      ),
    }
  })
  // mutate proposal
  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionProposals, {
    onSuccess: (res: any) => {
      successMsg(t('common:message.success'))

      if (res?.data?.id) {
        router.push({
          pathname: `${MENU_URL.PROPOSAL}/[id]`,
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
    const { isCreateExamSet, ...rest } = input

    mutate({
      method: isUpdate ? 'put' : 'post',
      data: {
        ...rest,
        exam_sets: !watch('isCreateExamSet') ? [] : input.exam_sets,
        status: 'in_progress',
      },
    })
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
      columns,
      tableData,
      fields,
      id,
    },
    {
      onSubmitPendingApprove,
      onSubmitDraft,
      setValue,
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
