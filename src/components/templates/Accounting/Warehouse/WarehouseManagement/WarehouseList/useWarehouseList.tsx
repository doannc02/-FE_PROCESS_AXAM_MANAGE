import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonBase, Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useQueryGetWarehouseList } from '@/service/warehouse/getList'
import { RequestBody } from '@/service/warehouse/getList/type'
import { TRANSLATE } from '@/routes'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useWarehouseList = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const { showDialog, hideDialog } = useDialog()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    getValues,
    reset,
  } = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.name'),
          fieldName: 'name',
        },

        {
          header: t('table.state'),
          fieldName: 'state',
        },
      ] as ColumnProps[],
    [t]
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    const { search, sourceProductType } = input
    if (_.isNil(search) || search === '') delete input.search
    if (_.isNil(sourceProductType)) delete input.sourceProductType
    setQueryPage(input)
  }

  const onReset = () => {
    reset(defaultValues)
    setQueryPage(defaultValues)
  }

  const onSubmit = handleSubmit(async (input) => {
    // console.log(input, 'submit')
    const { search, sourceProductType } = input
    if (_.isNil(search) || search === '') delete input.search
    if (_.isNil(sourceProductType) || sourceProductType === '')
      delete input.sourceProductType

    setQueryPage(input)
  })

  const { isLoading, data, refetch } = useQueryGetWarehouseList(queryPage)

  const tableData = (data?.data.content ?? []).map((item, index) => {
    return {
      id: item.id,
      code: item?.code,
      name: item?.name,
      state:
        item.state === 'APPROVED' ? (
          <span className='text-[#00CC6A]'>Đang hoạt động</span>
        ) : (
          <span className='text-[#747475]'>Lưu trữ</span>
        ),
    }
  })

  return [
    {
      isLoading,
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      columns,
      tableData,
      page: data?.data.page ?? 0,
      size: data?.data.size ?? 20,
      totalPages: data?.data.totalPages,
    },
    { onSubmit, onReset, onChangePageSize },
  ] as const
}
