import { getCmsToken, removeCmsToken, setCmsToken } from '@/config/token'
import { errorMsg } from '@/helper/message'
import { useAppDispatch } from '@/redux/hook'
import { postLogin } from '@/service/auth/login'
import { postLogout } from '@/service/auth/logout'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useLogin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const pathParams = router.query?.redirect
  const {
    publicRuntimeConfig: { SUBDOMAIN },
  } = getConfig()

  const loginAccount = async (dataLogin: any) => {
    try {
      setLoading(true)
      const requestBody = {
        username: dataLogin?.username,
        password: dataLogin?.password,
        companyId: dataLogin?.companyId,
        grant_type: 'password',
      }
      const data = await postLogin(requestBody)
      console.log(data, 'dataLogin')

      setCmsToken(data)
      if (pathParams) {
        router.push(`https://${pathParams}${SUBDOMAIN}`)
        setCmsToken(data)
      } else {
        setLoading(false)
        router.push('/dashboard')
      }
      setLoading(false)
    } catch (err) {
      errorMsg(err)
      localStorage.clear()
      sessionStorage.clear()
      setLoading(false)
    }
  }

  const logoutAccount = async () => {
    const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')
    try {
      if (tokenAccess && tokenAccess?.jti) await postLogout(tokenAccess.jti)
    } catch (error) {
      errorMsg('Có lỗi xảy ra !!!')
    } finally {
      localStorage.clear()
      sessionStorage.clear()
      await removeCmsToken()
      window.location.replace('/login')
    }
  }

  return { loginAccount, logoutAccount, loading }
}
