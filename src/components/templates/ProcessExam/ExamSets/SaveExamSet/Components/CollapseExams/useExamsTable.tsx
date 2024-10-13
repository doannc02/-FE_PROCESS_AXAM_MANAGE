import DisplayStatus from '@/components/molecules/DisplayStatus'
import { ColumnProps } from '@/components/organism/CoreTable'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { Exam, ExamSet } from '@/service/examSet/type'
import { CheckBox } from '@mui/icons-material'
import { Checkbox } from '@mui/material'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const useExamsTable = () => {
  const methodForm = useFormContext<ExamSet>()
  const { control, getValues } = methodForm
  const { append, fields, remove } = useFieldArray({
    name: 'exams',
    control: control,
    keyName: 'key',
  })

  const columns = useMemo(
    () =>
      [
        {
          header: 'Mã đề',
          fieldName: 'code',
        },
        {
          header: 'Tên đề',
          fieldName: 'name',
        },
        {
          header: 'Năm học',
          fieldName: 'academic_year_name',
        },
        // {
        //   header: 'Mô tả',
        //   fieldName: 'description',
        // },
        // {
        //   header: 'Comment',
        //   fieldName: 'comment',
        // },
        {
          header: 'Trạng thái',
          fieldName: 'status',
        },
        {
          header: 'Ngày upload',
          fieldName: 'upload_date',
        },
        {
          header: '',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const tableData = ((fields as Exam[]) ?? []).map((item, index) => {
    return {
      ...item,
      id: item?.id,
      code: item?.code,
      name: item?.code,
      attached_file: <Checkbox checked={!!item?.attached_file} />,
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
      academic_year_name: item?.academic_year?.name,
    }
  })
  return [{ tableData, columns, methodForm }, {}] as const
}
