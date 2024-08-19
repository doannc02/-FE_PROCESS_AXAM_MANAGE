import useCheckPath from '@/components/hooks/path/useCheckPath'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetToolsAssetList } from '@/service/accounting/toolsAssetCategory/getList'
import { RequestParams } from '@/service/accounting/toolsAssetCategory/getList/type'
import _ from 'lodash'
import { useMemo, useState } from 'react'

const useCategoryList = () => {
  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const { typeToolAsset } = useCheckPath()

  const defaultValues = {
    search: '',
    page: 0,
    size: MAX_VALUE,
    accountLedgerId: accountLedgerId,
  }

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size, accountLedgerId: accountLedgerId }
    setQueryPage(input)
  }

  const methodForm = useFormCustom<RequestParams['GET']>({
    defaultValues,
  })

  const {
    data: dataTools,
    refetch: refetchTools,
    isLoading: isLoadingTool,
  } = useQueryGetToolsAssetList({
    ...queryPage,
    accountLedgerId: accountLedgerId,
    categoryType: typeToolAsset === 'TOOL' ? 'TOOLS' : 'ASSET',
  })

  const { setValue, watch } = methodForm

  const onReset = () => {
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    const parentId = input.parent?.id
    const { parent, ...rest } = input
    const result = { ...rest, parentId: parentId }
    const formatData = {
      ...result,
      accountLedgerId: accountLedgerId,
    }
    setQueryPage(formatData)
  })

  const toolColumns = useMemo(
    () =>
      [
        {
          header: 'Mã danh mục',
          fieldName: 'code',
        },
        {
          header: 'Tên danh mục',
          fieldName: 'name',
        },
        {
          header: 'Danh mục cha',
          fieldName: 'parentId',
        },
        {
          header: 'Mô tả',
          fieldName: 'description',
        },
        {
          header: 'Trạng thái',
          fieldName: 'isActive',
        },
      ] as ColumnProps[],
    []
  )
  const dataTableTools = (dataTools?.data?.content ?? []).map((i) => {
    return {
      ...i,
      code: i?.code,
      parentId: i?.parent?.name,
      description: i?.description,
      isActive: i?.isActive ? 'Active' : 'InActive',
    }
  })
  return [
    {
      accountLedgerId,
      typeToolAsset,
      methodForm,
      columns: toolColumns,
      tableData: dataTableTools,
      totalPages: dataTools?.data?.totalPages,
      size: dataTools?.data?.size,
      page: dataTools?.data?.page,
      isLoading: isLoadingTool,
    },
    { setValue, watch, onChangePageSize, onSubmit, onReset },
  ] as const
}

export default useCategoryList
