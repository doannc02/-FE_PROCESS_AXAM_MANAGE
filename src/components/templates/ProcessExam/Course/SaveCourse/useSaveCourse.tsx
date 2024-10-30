import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { actionCourse, useQueryGetDetailCourse } from '@/service/course'
import { Course } from '@/service/course/type'
import { getMajorList } from '@/service/major'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const useSaveCourse = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id, actionType } = router.query

  const { showDialog } = useDialog()

  const defaultValues = {
    courses: [
      {
        id: null,
      },
    ],
  } as any
  const methodForm = useFormCustom<{
    courses: Course[]
  }>({ defaultValues })

  const { control, handleSubmit, setError, reset } = methodForm

  const isUpdate = !!id
  const isView = !!id && actionType === 'VIEW'
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses',
    keyName: 'key',
  })

  const { data, isLoading, refetch } = useQueryGetDetailCourse(
    {
      id: Number(id),
    },
    {
      enabled: !!id,
    }
  )

  const columns = useMemo(
    () =>
      [
        {
          header: 'Tên học phần',
          fieldName: 'name',
        },
        {
          header: 'Mã học phần',
          fieldName: 'code',
        },
        {
          header: 'Số tín chỉ',
          fieldName: 'credit',
          styleCell: {
            style: {
              minWidth: '80px',
            },
          },
        },
        {
          header: 'Chuyên ngành',
          fieldName: 'majorName',
        },

        {
          header: '',
          fieldName: 'action',
          styleCell: {
            style: {
              minWidth: '50px',
            },
          },
        },
      ] as ColumnProps[],
    []
  )

  const tableData = (fields ?? []).map((item, index) => {
    if (isView) {
      return {
        ...item,
        majorName: item?.major?.name,
      }
    }
    return {
      ...item,
      code: (
        <CoreInput
          control={control}
          name={`courses.${index}.code`}
          placeholder='Nhập mã học phần'
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      name: (
        <CoreInput
          control={control}
          name={`courses.${index}.name`}
          required
          rules={{
            required: t('common:validation.required'),
          }}
          placeholder='Nhập tên học phần'
        />
      ),
      majorName: (
        <CoreAutoCompleteAPI
          params={{
            page: 1,
            size: 20,
          }}
          fetchDataFn={getMajorList}
          control={control}
          label='Chuyên ngành'
          placeholder='Chọn chuyên ngành'
          name={`courses.${index}.major`}
        />
      ),
      credit: (
        <CoreInput
          control={control}
          type='number'
          name={`courses.${index}.credit`}
          required
          rules={{
            required: t('common:validation.required'),
          }}
          placeholder='Nhập số lượng tín chỉ'
        />
      ),
      action: !isView && index > 0 && (
        <TopAction
          isShowText={false}
          actionList={['delete']}
          onDeleteAction={() => {
            remove(index)
          }}
        />
      ),
    }
  })

  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionCourse, {
    onSuccess: (res: any) => {
      if (res?.data?.errs) {
        errorMsg(res?.data?.message ?? 'Đã tồn tại')
        ;(res?.data?.errs ?? []).map((item: any) => {
          setError(item.field, item.message)
        })
        return
      }
      if (res?.data && res?.data?.id) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.COURSE}/[id]`,
          query: {
            id: res?.data?.id,
            actionType: 'VIEW',
          },
        })
        refetch()
        return
      }
      if (Array.isArray(res?.data) && res?.data?.length > 0) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.COURSE}`,
        })
        refetch()
      }
    },
    onError: (error: any) => {
      errorMsg(error, setError)
    },
  })

  useEffect(() => {
    if (!!id && data?.data) {
      const format = {
        ...data?.data,
      } as any
      reset({ courses: [format] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data])

  const onSubmit = handleSubmit(async (input) => {
    mutate({
      method: isUpdate ? 'put' : 'post',
      data: isUpdate ? input.courses[0] : (input.courses as Course[]),
    })
  })

  return [
    {
      isLoading,
      isLoadingSubmit,
      methodForm,
      columns,
      tableData,
      isUpdate,
      isView,
      id,
      router,
    },
    { append, onSubmit, t, showDialog },
  ] as const
}

export default useSaveCourse
