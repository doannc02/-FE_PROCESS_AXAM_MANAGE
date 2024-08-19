import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetBankList } from '@/service/common/bank/getList'
import { useQueryGetBranchOfBank } from '@/service/common/bank/getListBranchOfBank'
import {
  putSTKBankForPartner,
  putSTKBankForUserLogin,
} from '@/service/common/bank/putSTK'
import { useMutation } from 'react-query'
import { Props } from '.'
import { useRouter } from 'next/router'

const defaultValues = {
  accountNumber: '',
  accountHolder: '',
}

export const useDialogAddSTKBank = ({
  isPartner,
  idPartner,
  type,
  refetch,
  onCloseDialog,
  name,
  setValue,
}: Props) => {
  const methodForm = useFormCustom<{
    bankId: number
    bankBranchId: number | null
    accountNumber: string
    accountHolder: string
  }>({
    defaultValues,
  })

  const { handleSubmit, watch, setError, getValues } = methodForm

  const { data: listBank, isLoading: isLoadingBank } = useQueryGetBankList({
    page: 0,
    size: MAX_VALUE,
    activated: true,
  })

  const { data: branchSelect, isLoading: isLoadingBranch } =
    useQueryGetBranchOfBank(
      {
        bankId: watch('bankId'),
        page: 0,
        size: MAX_VALUE,
        activated: true,
      },
      {
        enabled: !!watch('bankId'),
      }
    )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    putSTKBankForUserLogin,
    {
      onSuccess: (data) => {
        successMsg('Success')
        refetch()
        if (data?.data?.data?.id)
          setValue(name, {
            ...getValues(),
            id: data.data.data.id,
            bank: listBank?.data?.content.find((i) => i.id === watch('bankId'))
              ?.name,
          })

        onCloseDialog()
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const { mutate: mutatePartner, isLoading: isLoadingSubmitPartner } =
    useMutation(putSTKBankForPartner, {
      onSuccess: (data) => {
        successMsg('Success')
        refetch()
        if (data?.data?.data?.id)
          setValue(name, {
            ...getValues(),
            id: idPartner,
            bank: listBank?.data?.content.find((i) => i.id === watch('bankId'))
              ?.name,
          })

        onCloseDialog()
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    })

  const onSubmit = handleSubmit(async (input) => {
    if (type === 'PARTNER') {
      mutatePartner({
        isPartner: isPartner,
        id: Number(idPartner),
        data: input,
      })
    } else {
      mutate({
        data: input,
      })
    }
  })

  return [
    {
      isLoadingSubmit:
        type === 'PARTNER' ? isLoadingSubmitPartner : isLoadingSubmit,
      methodForm,
      isLoadingBank,
      listBankSelect: listBank ? listBank.data.content : [],
      isLoadingBranch,
      branchSelect: branchSelect ? branchSelect.data.content : [],
    },
    { onSubmit, handleSubmit },
  ] as const
}
