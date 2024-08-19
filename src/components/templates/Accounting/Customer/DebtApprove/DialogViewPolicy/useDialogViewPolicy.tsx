import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetDebtPolicyDetail } from '@/service/accounting/debtGrantingPolicies/getDetail'
import { putApproveStatusPolicyByManager } from '@/service/accounting/debtGrantingPolicies/putApprove'
import { RequestBody } from '@/service/accounting/debtGrantingPolicies/save/type'
import { useQueryGetPartnerList } from '@/service/common/partner/getListTiny'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import DialogCfApprove from '../DialogCfApprove'
import { useFieldArray } from 'react-hook-form'

export type Props = {
  id: number
  refetch: any
}

const useDialogViewPolicy = ({ id, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog, showDialog } = useDialog()

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      id,
      policyLines: [],
    },
  })

  const { reset, control } = methodForm

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'policyLines',
    keyName: 'key',
  })

  const { currency } = useAppSelector((state) => state.companyConfigData)

  const { isLoading: isLoadingPartners, data: partnerSelect } =
    useQueryGetPartnerList({
      page: 0,
      size: MAX_VALUE,
      isCustomer: true,
    })

  const { data, isLoading } = useQueryGetDebtPolicyDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
  }, [id, data, reset])

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    putApproveStatusPolicyByManager,
    {
      onSuccess: (data) => {
        if (data && data.data.id) {
          showDialog(
            <DialogCfApprove
              id={data.data.id}
              refetch={refetch}
              policies={data.data.policies}
            />
          )
        } else {
          refetch()
        }
      },
      onError: (error) => {
        errorMsg(error)
      },
    }
  )

  const onSubmit = async () => {
    mutate({
      id,
      statusPolicy: 'APPROVE',
    })
    hideDialog()
  }

  const onReject = async () => {
    mutate({
      id,
      statusPolicy: 'REJECT',
    })
    hideDialog()
  }

  return [
    {
      isLoading,
      isLoadingSubmit,
      currency,
      methodForm,
      isLoadingPartners,
      partnerSelect: (partnerSelect ? partnerSelect.data.content : []).map(
        (item) => ({ ...item, name: item.code + ' - ' + item.name })
      ),
      fields,
    },
    { remove, append, onSubmit, onReject },
  ] as const
}

export default useDialogViewPolicy
