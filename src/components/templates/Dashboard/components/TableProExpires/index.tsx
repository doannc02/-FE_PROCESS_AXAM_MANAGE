import DisplayStatus from '@/components/molecules/DisplayStatus'
import { ColumnProps, CoreTable } from '@/components/organism/CoreTable'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Proposals } from '@/service/proposals/type'
import { convertToDate } from '@/utils/date/convertToDate'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const TableProExpires = (object: { data: Proposals[] }) => {
  const columns = useMemo(
    () =>
      [
        {
          header: 'GV thực hiện',
          fieldName: 'userName',
        },
        {
          header: 'Mã kế hoạch',
          fieldName: 'code',
          styleCell: {
            style: {
              minWidth: '90px',
            },
          },
        },

        {
          header: 'Học kỳ',
          fieldName: 'semester',
          styleCell: {
            style: {
              minWidth: '60px',
            },
          },
        },
        {
          header: 'Ngày bắt đầu',
          fieldName: 'start_date',
          styleCell: {
            style: {
              minWidth: '60px',
            },
          },
        },
        {
          header: 'Ngày kết thúc',
          fieldName: 'end_date',
          styleCell: {
            style: {
              minWidth: '60px',
            },
          },
        },
        {
          header: 'Tổng bộ đề',
          fieldName: 'total_exam_set',
          styleCell: {
            style: {
              minWidth: '60px',
            },
          },
        },
        {
          header: 'Trạng thái',
          fieldName: 'status',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const tableData = (object?.data ?? []).map((item) => {
    return {
      ...item,
      id: item?.id,
      total_exam_set: item?.total_exam_set,
      userName: item?.user?.name ?? '-',
      end_date: convertToDate(item?.end_date),
      start_date: convertToDate(item?.start_date),
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

  const router = useRouter()

  return (
    <CoreTable
      columns={columns}
      data={tableData}
      paginationHidden
      isLoading={false}
      isShowColumnStt
      onRowClick={(id: number) => {
        router.push({
          pathname: `${MENU_URL.PROPOSAL}/[id]`,
          query: {
            id,
            actionType: 'VIEW',
          },
        })
      }}
    />
  )
}
