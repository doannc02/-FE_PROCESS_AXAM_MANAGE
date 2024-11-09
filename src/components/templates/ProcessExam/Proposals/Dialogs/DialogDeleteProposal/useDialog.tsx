import { errorMsg, successMsg } from '@/helper/message'
import { MENU_URL } from '@/routes'
import { actionAcademic } from '@/service/academicYear'
import { actionDepartment } from '@/service/department'
import { actionProposals } from '@/service/proposals'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

const useDialogDepartment = ({ id }: { id: number }) => {
  const router = useRouter()
  const { mutate, isLoading } = useMutation(actionProposals, {
    onSuccess: (res) => {
      successMsg('Thành công')
      router.push({
        pathname: `${MENU_URL.PROPOSAL}`,
      })
    },
    onError: (error) => {
      errorMsg(error)
    },
  })

  const onSubmit = () => {
    mutate({ method: 'delete', params: { id: id } })
  }
  return [{ isLoading }, { onSubmit }] as const
}
export default useDialogDepartment
