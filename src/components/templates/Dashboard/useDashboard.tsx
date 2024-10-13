import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppDispatch } from '@/redux/hook'
import { setCurrentLogin } from '@/redux/reducer/userConfigReducer'
import { getDetailUser } from '@/service/auth/getUser'
import { useEffect } from 'react'

export const useDashboard = () => {
  const dispatch = useAppDispatch()
  const methodForm = useFormCustom()
  const handleSetInfoUser = async () => {
    try {
      const res = await getDetailUser()
      console.log(res.data.data.name)
      if (res.data.data) {
        dispatch(setCurrentLogin(res.data.data))
      }
    } catch {
      errorMsg('Cấu hình thông tin user storage thất bại!!!')
    }
  }


  useEffect(() => {
    handleSetInfoUser()
  }, [])
  return [{ methodForm }, { onSubmit: () => {} }] as const
}
