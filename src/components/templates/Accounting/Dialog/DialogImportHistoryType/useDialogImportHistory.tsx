import { GREEN } from '@/helper/colors'
import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg } from '@/helper/message'
import { useQueryGetAccountConfigImportHistory } from '@/service/accounting/accountConfig/importFile/getAccountConfigImportHistory'
import { RequestBody } from '@/service/accounting/accountConfig/importFile/getAccountConfigImportHistory/type'
import { useQueryGetAccountTypeImportHistory } from '@/service/accounting/accountType/importFile/getAccountTypeImportHistory'
import { Request } from '@/service/accounting/accountType/importFile/getAccountTypeImportHistory/type'
import { Typography } from '@mui/material'
import moment from 'moment'
import { useMemo, useState } from 'react'

const defaultValues = {
  page: 0,
  size: 20,
}

export const useDialogImportHistoryType = () => {
  const [queryPage, setQueryPage] = useState<Request['GET']>({
    ...defaultValues,
  })
  const { data: listHistoryImport, isLoading } =
    useQueryGetAccountTypeImportHistory(queryPage)

  const columns = useMemo(
    () =>
      [
        {
          header: 'Ngày tạo',
          fieldName: 'createdAt',
        },
        {
          header: 'Người tạo',
          fieldName: 'createdBy',
        },
        {
          header: 'File import',
          fieldName: 'fileUploadName',
        },
        {
          header: 'Kết quả',
          fieldName: 'fileResultName',
        },
      ] as ColumnProps[],
    []
  )

  const handleDownloadFileByURL = (url: string) => {
    try {
      url = url + '?content-disposition=ATTACHMENT'
      const downloadLink = document.createElement('a')
      document.body.appendChild(downloadLink)
      downloadLink.href = url
      downloadLink.target = '_self'
      downloadLink.download = 'Result.xlsx'
      downloadLink.click()
    } catch (error) {
      errorMsg(error)
    }
  }

  const dataTable = (listHistoryImport?.data?.content ?? []).map(
    (item: any) => ({
      ...item,
      fileUploadName: (
        <Typography
          style={{ color: GREEN, marginLeft: '4px' }}
          onClick={() => handleDownloadFileByURL(item.fileUpload)}
        >
          {item.fileUploadName}
        </Typography>
      ),
      fileResultName: (
        <Typography
          style={{ color: GREEN, marginLeft: '4px' }}
          onClick={() => handleDownloadFileByURL(item.fileResult)}
        >
          {item.fileResultName}
        </Typography>
      ),
      createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
    })
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page: page, size })
  }

  return [
    {
      dataTable: dataTable ?? [],
      columns,
      page: listHistoryImport?.data?.page ?? 0,
      size: listHistoryImport?.data?.size ?? 20,
      totalPages: listHistoryImport?.data?.totalPages ?? 1,
      isLoading,
    },
    { onChangePageSize },
  ] as const
}
