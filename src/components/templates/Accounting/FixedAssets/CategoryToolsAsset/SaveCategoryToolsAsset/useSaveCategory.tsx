import useCheckPath from '@/components/hooks/path/useCheckPath'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetDetailToolsAssetCategory } from '@/service/accounting/toolsAssetCategory/getDetail'
import {
  postToolsAssetCategory,
  putToolsAssetCategory,
} from '@/service/accounting/toolsAssetCategory/save'
import { RequestBody } from '@/service/accounting/toolsAssetCategory/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const useSaveCategory = () => {
  const { t } = useTranslation('accounting/decrease-tools')
  const { typeToolAsset } = useCheckPath()
  const router = useRouter()
  const { id, actionType } = router.query
  const isUpdate = !!id

  const accountLedger = useAppSelector((state) => state.ledgerRefData)

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      type: typeToolAsset === 'TOOL' ? 'TOOLS' : 'ASSET',
      accountLedger: {
        code: accountLedger.code,
        name: accountLedger.name,
        id: accountLedger.id,
      },
      isActive: true,
    },
  })

  const { handleSubmit, reset, setError } = methodForm

  const {
    data: dataDescTool,
    isLoading,
    refetch,
  } = useQueryGetDetailToolsAssetCategory({ id: Number(id) }, { enabled: !!id })

  useEffect(() => {
    if (id) {
      reset({
        ...dataDescTool?.data,
        accountLedgerId: Number(accountLedger.id),
        accountLedger: {
          code: accountLedger.code,
          name: accountLedger.name,
          id: accountLedger.id,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDescTool?.data, id, reset])

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putToolsAssetCategory : postToolsAssetCategory,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL[typeToolAsset].CATEGORY}/[id]`,
            query: {
              id: res?.data?.data?.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        }
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onCancel = () => {
    router.push({
      pathname: MENU_URL[typeToolAsset].CATEGORY,
    })
  }

  const onSubmit = handleSubmit(async (input) => {
    try {
      if (input) {
        await mutate(input)
      }
    } catch (ex: any) {
      errorMsg(ex.message)
    }
  })

  return [
    {
      accountLedgerId: accountLedger.id,
      id,
      isUpdate: !!id,
      isView: actionType === 'VIEW',
      methodForm,
      isLoadingSubmit,
      isLoading,
      actionType,
      typeToolAsset,
    },
    { t, onCancel, onSubmit, refetch },
  ] as const
}

export default useSaveCategory
