import { GREEN } from '@/helper/colors'
import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg } from '@/helper/message'
import { useQueryGetAccountConfigImportHistory } from '@/service/accounting/accountConfig/importFile/getAccountConfigImportHistory'
import { RequestBody } from '@/service/accounting/accountConfig/importFile/getAccountConfigImportHistory/type'
import { Request } from '@/service/accounting/accountType/importFile/getAccountTypeImportHistory/type'
import { Typography } from '@mui/material'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { useQueryGetHisAccountConfigList } from '@/service/accounting/accountConfig/getHistory'
import { ViewDetail } from '@/components/templates/Accounting/Dialog/DialogHistoryEditBound/components'
import { useRouter } from 'next/router'
import { useDialog } from '@/components/hooks/dialog/useDialog'

const defaultValues = {
  page: 0,
  size: 20,
}

export const useDialogHisFisYear = () => {
  const [queryPage, setQueryPage] = useState<Request['GET']>({
    ...defaultValues,
  })
  const { hideDialog } = useDialog()
  const router = useRouter()
  const { data: listHistoryAccFis, isLoading } =
    useQueryGetHisAccountConfigList(queryPage)

  const columns = useMemo(
    () =>
      [
        {
          header: 'Bắt đầu',
          fieldName: 'startFiscalYear',
        },
        {
          header: 'Kết thúc',
          fieldName: 'endFiscalYear',
        },
        {
          header: 'Trạng thái',
          fieldName: 'isCurrentFiscalYear',
        },
        {
          header: 'Xem chi tiết',
          fieldName: 'viewAction',
        },
      ] as ColumnProps[],
    []
  )

  const dataTable = (listHistoryAccFis?.data?.content ?? []).map(
    (item: any, index) => {
      const noNumber =
        (queryPage?.page ?? 0) * (queryPage?.size ?? 0) + index + 1

      return {
        ...item,
        endFiscalYear: moment(item.endFiscalYear).format('DD/MM/YYYY'),
        startFiscalYear: moment(item.startFiscalYear).format('DD/MM/YYYY'),
        isCurrentFiscalYear:
          item?.isCurrentFiscalYear === true ? 'Active' : 'InActive',
        viewAction:
          item?.isCurrentFiscalYear === true ? null : (
            <ViewDetail
              onClick={() => {
                router.push({
                  pathname: `${router.pathname}/[id_history]`,
                  query: {
                    id_history: item?.id,
                    name: `Lần ${noNumber}`,
                  },
                })
                hideDialog()
              }}
            />
          ),
      }
    }
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page: page, size })
  }

  return [
    {
      dataTable: dataTable ?? [],
      columns,
      page: listHistoryAccFis?.data?.page ?? 0,
      size: listHistoryAccFis?.data?.size ?? 20,
      totalPages: listHistoryAccFis?.data?.totalPages ?? 1,
      isLoading,
    },
    { onChangePageSize },
  ] as const
}
