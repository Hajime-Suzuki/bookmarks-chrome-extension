import { connectDB } from '../db/connection'
import { IBookmark } from '../models/Bookmark'
import { Omit } from '../helpers/types'
import { authChecker } from './auth-checker'
import * as createError from 'http-errors'

interface Event<
  TBody = Partial<IBookmark>,
  TPathParams = null,
  TQueryParams = null
> {
  body: TBody
  pathParameters: TPathParams
  queryStringParameters: TQueryParams
  userId?: string
  headers: {
    authorization: string
  }
}
type Context = any
type Callback = (err?: any, data?: any) => void

export type LambdaHandler<
  TBody = any,
  TPathParams = null,
  TQueryParams = null
> = (
  event: Event<TBody, TPathParams, TQueryParams>,
  context: Context,
  callback: Callback
) => any

const convertStringToArray = (items: string) => {
  if (typeof items !== 'string') {
    throw new Error('category must be string')
  }

  if (items === '') return []

  return items
    .split(',')
    .map(c => c.trim())
    .filter(Boolean)
}

type ParsedBody = Partial<Omit<IBookmark, 'tags'> & { tags: string }>
interface ConvertedEvent {
  [key: string]: any
  body: Partial<IBookmark>
  userId: string
  pathParameters: Event['pathParameters']
}

const transformEvent = (event: any): ConvertedEvent => {
  const { body: stringBody } = event

  if (!stringBody) return event

  const parsedBody: ParsedBody = JSON.parse(stringBody)

  let parsedTags: string[] | undefined
  if (parsedBody.tags !== undefined) {
    parsedTags = convertStringToArray(parsedBody.tags)
  }

  return {
    ...event,
    body: {
      ...parsedBody,
      tags: parsedTags
    }
  }
}

export const handleLambda = <
  TBody = Partial<IBookmark>,
  TPathParams = null,
  TQueryParams = null
>(
  fn: LambdaHandler<TBody, TPathParams, TQueryParams>,
  options?: {
    auth: boolean
  }
) => async (
  event: Event<TBody, TPathParams, TQueryParams>,
  context: Context,
  callback: Callback
) => {
  await connectDB()

  console.log(`event body has been received: ${event.body}`)

  const transformedEvent = await transformEvent(event)

  const userId = event.headers.authorization
    ? await authChecker(event.headers.authorization)
    : null

  try {
    if (options && options.auth && !userId) {
      throw createError(401, 'you need to login')
    }

    const res = await fn(
      { ...transformedEvent, userId } as any,
      context,
      callback
    )

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(res)
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: e.status || 500,
      body: JSON.stringify({
        message: e.message
      })
    }
  }
}
