import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { useQueryGetListCourse } from '@/service/course'
import {
  actionDepartment,
  useQueryDetailDepartment,
} from '@/service/department'
import { useQueryGetMajorList } from '@/service/major'
import { Major } from '@/service/major/type'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const useSaveDepartment = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id, actionType } = router.query

  const { showDialog } = useDialog()

  const defaultValues = {
    id: null,
  } as any
  const methodForm = useFormCustom<any>({ defaultValues })

  const { control, handleSubmit, setError, reset } = methodForm

  const isUpdate = !!id
  const isView = !!id && actionType === 'VIEW'

  const { data, isLoading, refetch } = useQueryDetailDepartment(
    {
      id: Number(id),
    },
    {
      enabled: !!id,
    }
  )

  const { data: dataMajors, isLoading: isLoadingMajors } = useQueryGetMajorList(
    {
      departmentId: Number(id),
    },
    {
      enabled: !!id,
    }
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionDepartment, {
    onSuccess: (res: any) => {
      if (res?.data && res?.data?.id) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.DEPARTMENT}/[id]`,
          query: {
            id: res?.data?.id,
            actionType: 'VIEW',
          },
        })
        refetch()
        return
      }
    },
    onError: (error: any) => {
      errorMsg(error, setError)
    },
  })

  useEffect(() => {
    if (!!id && data?.data) {
      reset(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data])

  const onSubmit = handleSubmit(async (input) => {
    mutate({
      method: isUpdate ? 'put' : 'post',
      data: input,
    })
  })

  const columns = useMemo(
    () =>
      [
        {
          header: 'Tên chuyên ngành',
          fieldName: 'name',
        },
        {
          header: 'Trực thuộc khoa',
          fieldName: 'departmentName',
        },
      ] as ColumnProps[],
    []
  )

  const tableData = (dataMajors?.data?.content ?? []).map((item) => {
    return {
      ...item,
      departmentName: item?.department?.name,
    }
  })

  return [
    {
      isLoading,
      isLoadingSubmit,
      methodForm,
      isUpdate,
      isView,
      id,
      router,
      columns,
      tableData,
      isLoadingTable: isLoadingMajors,
      name: methodForm.watch('name'),
    },
    { onSubmit, t, showDialog },
  ] as const
}

export default useSaveDepartment
