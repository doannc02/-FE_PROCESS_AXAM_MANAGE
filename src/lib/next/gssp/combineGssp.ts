import { ErrResponse, HttpResponse } from '@/lib/api'
import { AssertsError } from '@/lib/asserts'
import { errors, HttpError } from '@/lib/errors'
import { GetServerSidePropsResult, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { RedirectError } from './error'
import { GetServerSideProps, GsspMiddleware, GsspMiddlewareArgs } from './type'

export function combineGssp<
  T extends HttpResponse<any>,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(...gsspMiddlewares: [...GsspMiddleware[], GetServerSideProps<T, Q, D>]) {
  return async (...args: GsspMiddlewareArgs) => {
    try {
      return (await gsspMiddlewares.reduce(
        (current, next) =>
          current.then((args) => {
            if (typeof next !== 'function') return args
            return (next as GsspMiddleware)(...args)
          }),
        Promise.resolve(args)
      )) as unknown as GetServerSidePropsResult<T>
    } catch (err) {
      if (err instanceof HttpError) {
        const props: ErrResponse = {
          data: null,
          err: err.serialize(),
          status: err.status,
        }
        return { props }
      }
      if (err instanceof RedirectError) return err.toProps()
      if (err instanceof AssertsError) {
        const error = errors['INTERNAL_SERVER']
        return { props: { data: null, err: error, status: 500 } }
      }
      throw err
    }
  }
}
