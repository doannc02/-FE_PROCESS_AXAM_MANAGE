import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useQueryGetHisUpdateList } from '@/service/accounting/updateHistory/getList'
import { RequestParams } from '@/service/accounting/updateHistory/getList/type'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ViewDetail } from './components'
import { TRANSLATE } from '@/routes'

const defaultValues: RequestParams['GET'] = {
  changeId: null,
  historyType: '',
  page: 0,
  size: 20,
}

type Props = {
  changeId: number
  code: string
  historyType:
    | 'ENTRY'
    | 'OUT_INVOICE'
    | 'OUT_REFUND'
    | 'IN_REFUND'
    | 'PAYMENT'
    | any
}

export const useDialogHisEditBound = ({
  changeId,
  historyType,
  code,
}: Props) => {
  const router = useRouter()

  const id = Number(router?.query?.id)
  const { hideDialog } = useDialog()
  const { t } = useTranslation(TRANSLATE.BANK_CASH_ACCOUNT)
  const [queryPage, setQueryPage] = useState<RequestParams['GET']>({
    changeId: changeId,
    historyType: historyType,
    page: 0,
    size: 20,
  })
  const methodForm = useFormCustom<RequestParams['GET']>({ defaultValues })

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const columns = useMemo(
    () =>
      [
        {
          header: 'Thời gian chỉnh sửa',
          fieldName: 'createdAt',
        },
        {
          header: 'Người chỉnh sửa',
          fieldName: 'createdBy',
        },
        {
          header: 'Thông tin chỉnh sửa',
          fieldName: 'viewAction',
        },
      ] as ColumnProps[],
    []
  )
  const { data, isLoading } = useQueryGetHisUpdateList(queryPage, {
    enabled: !!changeId,
  })

  const dataTable = (data?.data?.content ?? []).map((item, index) => {
    const noNumber = (queryPage?.page ?? 0) * (queryPage?.size ?? 0) + index + 1

    return {
      ...item,
      createdAt: moment(item?.createdAt).format('HH:mm DD/MM/YYYY'),
      createdBy: item.createdBy,
      viewAction: (
        <ViewDetail
          onClick={() => {
            router.push({
              pathname: `${router.pathname}/[id_history]`,
              query: {
                id,
                id_history: item?.id,
                name: `Lần ${noNumber}`,
                code: code,
                historyType: historyType,
              },
            })
            hideDialog()
          }}
        />
      ),
    }
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  return [
    {
      historyType,
      columns,
      dataTable,
      isLoading,
      page: data?.data?.page ?? 0,
      size: data?.data?.size ?? 20,
      totalPages: data?.data?.totalPages,
    },
    { t, onSubmit, onChangePageSize },
  ] as const
}
