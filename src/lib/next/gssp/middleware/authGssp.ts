import { RedirectError, RedirectProps } from '../error'
import { GsspMiddleware } from '../type'

export const authGssp =
  (
    redirectPropsToLogin: RedirectProps = {
      permanent: false,
      destination: '/login',
    }
  ): GsspMiddleware =>
  async (...args) => {
    const token = args[0].req.cookies.ACCESS_TOKEN

    if (!token) throw new RedirectError(redirectPropsToLogin)

    return [...args, token]
  }
