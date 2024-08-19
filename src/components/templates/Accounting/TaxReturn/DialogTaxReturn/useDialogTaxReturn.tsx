import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryGetTaxReturnAddendumList } from '@/service/accounting/taxReturn/taxAddendum'
import { actionTaxReturn } from '@/service/accounting/taxReturn/taxReturn/action'
import { ReqSaveTaxReturn } from '@/service/accounting/taxReturn/taxReturn/action/type'
import { TaxReturn } from '@/service/accounting/taxReturn/taxReturn/getList/type'
import { CommonObject } from '@/service/type'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export const useDialogTaxReturn = (
  taxReturn: TaxReturn,
  taxReturnConfig: CommonObject,
  fiscalYearId: number
) => {
  const { t } = useTranslation(TRANSLATE.TAX_RETURN)
  const { hideDialog } = useDialog()

  const router = useRouter()

  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const methods = useFormCustom<ReqSaveTaxReturn>({
    defaultValues: {
      fiscalYearId,
      taxReturnConfigId: taxReturnConfig?.id,
      accountLedgerId: Number(accountLedgerId),
      declareStart: taxReturn.declareStart,
      declareEnd: taxReturn.declareEnd,
      addendumList: [],
      isUnArise: false,
    },
  })

  const { handleSubmit, setError } = methods

  const { isLoading, data } = useQueryGetTaxReturnAddendumList({})

  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionTaxReturn, {
    onSuccess: (res) => {
      if (res?.data?.data?.id) {
        hideDialog()
        router.push({
          pathname: `${MENU_URL.TAX_RETURN}/[id]`,
          query: {
            id: res?.data?.data?.id,
          },
        })
      }
    },
    onError: (error) => {
      errorMsg(error, setError)
    },
  })

  const columns = useMemo(
    () =>
      [
        {
          header: 'STT',
          fieldName: 'index',
        },
        {
          header: 'Chỉ tiêu',
          fieldName: 'name',
        },
        {
          header: 'Giá trị hàng hóa, dịch vụ (chưa có thuế giá trị gia tăng)',
          fieldName: 'description',
        },
        {
          header: 'Thuế giá trị gia tăng',
          fieldName: 'description',
        },
      ] as ColumnProps[],
    []
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      method: 'post',
      params: {},
      data,
    })
  })

  return [
    {
      isLoading,
      isLoadingSubmit,
      addendumData: data?.data ?? [],
      methods,
      columns,
    },
    { t, hideDialog, onSubmit },
  ] as const
}
