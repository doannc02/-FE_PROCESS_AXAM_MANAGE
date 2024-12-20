import { logoutAccount } from '@/config/axios'
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
      if (res.data.data) {
        dispatch(setCurrentLogin(res.data.data))
      }
    } catch {
      errorMsg('Cấu hình thông tin user storage thất bại!!!')
      logoutAccount()
    }
  }

  useEffect(() => {
    handleSetInfoUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [{ methodForm }, { onSubmit: () => {} }] as const
}
