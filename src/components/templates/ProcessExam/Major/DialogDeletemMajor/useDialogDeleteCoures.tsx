import { errorMsg, successMsg } from '@/helper/message'
import { MENU_URL } from '@/routes'
import { actionMajor } from '@/service/major'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

const useDialogDeleteCourse = ({ id }: { id: number }) => {
  const router = useRouter()
  const { mutate, isLoading } = useMutation(actionMajor, {
    onSuccess: (res) => {
      successMsg('Thành công')
      router.push({
        pathname: `${MENU_URL.MAJOR}`,
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
export default useDialogDeleteCourse
