import { RedirectError, RedirectProps } from '../error'
import { GsspMiddleware } from '../type'

export const checkLogin =
  (
    redirectPropsToDashboard: RedirectProps = {
      permanent: false,
      destination: '/dashboard',
    }
  ): GsspMiddleware =>
  async (...args) => {
    const token = args[0].req.cookies.ACCESS_TOKEN

    if (token) {
      throw new RedirectError(redirectPropsToDashboard)
    }

    return [...args]
  }
