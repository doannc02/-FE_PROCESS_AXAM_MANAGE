import { GREEN } from '@/helper/colors'
import { ColumnProps } from '@/components/organism/CoreTable'
import { convertToDate } from '@/utils/date/convertToDate'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { handle } from '@/lib/next/api/middleware/handle'
import { useQueryGetPageHisCusDeclareBalList } from '@/service/accounting/accountMoveLineCusImport/getPageHisCusDeclareBalList'
import { RequestParams } from '@/service/accounting/accountMoveLineCusImport/getPageHisCusDeclareBalList/type'
import { useQueryGetAccountBalanceList } from '@/service/accounting/accountMoveLineVenderImport/getVendorBalanceList'
import { Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/redux/hook'

const defaultValues: RequestParams['GET'] = {
  page: 0,
  size: 20,
}

type Props = {
  isCustomer: boolean
}

export const useDialogViewHisImport = ({ isCustomer }: Props) => {
  const { t } = useTranslation('accounting/cop-balance')
  const [queryPage, setQueryPage] = useState<RequestParams['GET']>({
    page: 0,
    size: 20,
  })
  const methodForm = useFormCustom<RequestParams['GET']>({ defaultValues })
  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)
  const columns = useMemo(
    () =>
      [
        {
          header: t('table_hisImport.createdAt'),
          fieldName: 'createdAt',
        },
        {
          header: t('table_hisImport.createdBy'),
          fieldName: 'createdBy',
        },
        {
          header: t('table_hisImport.fileUploadName'),
          fieldName: 'fileUploadName',
        },
        {
          header: t('table_hisImport.fileResultName'),
          fieldName: 'fileResultName',
        },
      ] as ColumnProps[],
    [t]
  )
  const { data: dataCustomer, isLoading } = useQueryGetPageHisCusDeclareBalList(
    { ...queryPage, accountLedgerId },
    {
      enabled: !!isCustomer,
    }
  )
  const { data: dataVendor } = useQueryGetAccountBalanceList(
    { ...queryPage, accountLedgerId },
    {
      enabled: !isCustomer,
    }
  )
  const dt = isCustomer ? dataCustomer : dataVendor

  const renderNameFile = (name: string, url: string) => {
    const handleDownloadFileByURL = (url: string) => {
      try {
        url = url + '?content-disposition=ATTACHMENT'
        const downloadLink = document.createElement('a')
        document.body.appendChild(downloadLink)
        downloadLink.href = url
        downloadLink.target = '_self'
        downloadLink.download = `${name}.xlsx`
        downloadLink.click()
      } catch (error) {
        errorMsg(error)
      }
    }
    return (
      <Typography
        style={{ color: GREEN, marginLeft: '4px' }}
        onClick={() => handleDownloadFileByURL(url)}
      >
        {name}
      </Typography>
    )
  }
  const dataTable = (dt?.data?.content ?? []).map((item) => {
    return {
      ...item,
      createdAt: convertToDate(item.createdAt),
      createdBy: item.createdBy,
      fileUploadName: renderNameFile(item.fileUploadName, item.fileUpload),
      fileResultName: renderNameFile(item.fileResultName, item.fileResult),
    }
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  return [
    {
      columns,
      dataTable,
      isLoading,
      page: dt?.data?.page ?? 0,
      size: dt?.data?.size ?? 20,
      totalPages: dt?.data?.totalPages,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
