import { HttpResponse } from '@/lib/api'
import { HandlerMiddleware, HandlerMiddlewareArgs } from '../type'

export function handle<T>(
  next: (...args: HandlerMiddlewareArgs<T>) => Promise<HttpResponse<T>>
): HandlerMiddleware {
  return async (...args: HandlerMiddlewareArgs) => {
    const { data, err, status } = await next(...args)
    if (data) args[1].status(status).json(data)
    if (err) {
      args[1].status(status).json(err)
    }
    return args
  }
}
