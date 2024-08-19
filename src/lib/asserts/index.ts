import { z, ZodObject } from 'zod'
import { InvalidPathParamError, UnauthorizedError } from '../errors'

export class AssertsError extends Error {}

function assertPathParam(
  queryStringLike: string | string[] | undefined
): asserts queryStringLike is string {
  if (typeof queryStringLike !== 'string') throw new InvalidPathParamError()
}

function assertNumericPathParam(
  queryStringLike: string | string[] | undefined
): asserts queryStringLike is string {
  if (
    typeof queryStringLike !== 'string' ||
    !/^([1-9]\d*|0)$/.test(queryStringLike)
  )
    throw new InvalidPathParamError()
}

export function str(queryStringLike: string | string[] | undefined) {
  assertPathParam(queryStringLike)
  return queryStringLike
}

export function num(queryStringLike: string | string[] | undefined) {
  assertNumericPathParam(queryStringLike)
  return queryStringLike
}

export function assertBoolean(value: unknown): asserts value is boolean {
  if (typeof value !== 'boolean') throw new AssertsError()
}

export function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new AssertsError()
}

export function assertBySchema<T extends ZodObject<any>>(
  target: unknown,
  schema: T
): asserts target is z.infer<typeof schema> {
  schema.parse(target)
}

const Token = z.object({
  Authorization: z.string(),
})
export function assertToken(
  value: unknown
): asserts value is z.infer<typeof Token> {
  try {
    Token.parse(value)
  } catch {
    throw new UnauthorizedError()
  }
}

export function addToken(value: unknown) {
  assertToken(value)
  return value
}
