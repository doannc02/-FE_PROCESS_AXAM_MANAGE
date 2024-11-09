import { errorMsg, successMsg } from '@/helper/message'
import { MENU_URL } from '@/routes'
import { actionAcademic } from '@/service/academicYear'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

const useDialogAcademic = ({ id }: { id: number }) => {
  const router = useRouter()
  const { mutate, isLoading } = useMutation(actionAcademic, {
    onSuccess: (res) => {
      successMsg('Thành công')
      router.push({
        pathname: `${MENU_URL.ACADEMIC}`,
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
export default useDialogAcademic
