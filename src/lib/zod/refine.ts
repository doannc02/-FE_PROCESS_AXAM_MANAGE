import { z, ZodType } from 'zod'

type Arg<T> = T extends (...args: [infer A, infer B, ...unknown[]]) => any
  ? [A, B]
  : never
type T = Arg<ZodType['refine']>

const defineValidate = (message = 'message default'): T => [
  (s: string) => !s.match(/d/g),
  message,
]

export const zzs = (fn: (zs: z.ZodString) => z.ZodType<string>) => {
  return fn(z.string()).refine(...defineValidate())
}
