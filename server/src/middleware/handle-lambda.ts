import { connectDB } from '../db/connection'
import { IBookmark } from '../models/Bookmark'
import { Omit } from '../helpers/types'

interface Event<TBody = any, TPathParams = null> {
  body: TBody
  pathParameters: TPathParams
}
type Context = any
type Callback = (err?: any, data?: any) => void

export type LambdaHandler<TBody = any, TPathParams = null> = (
  event: Event<TBody, TPathParams>,
  context: Context,
  callback: Callback
) => any

const convertCategoriesStringToArray = (tags: string) => {
  if (typeof tags !== 'string') {
    throw new Error('category must be string')
  }

  if (tags === '') return []

  return tags
    .split(',')
    .map(c => c.trim())
    .filter(Boolean)
}

type ParsedBody = Partial<Omit<IBookmark, 'tags'> & { tags: string }>
interface ConvertedEvent {
  [key: string]: any
  body: Partial<IBookmark>
  pathParameters: Event['pathParameters']
}

const transformEvent = (event: any): ConvertedEvent => {
  const { body: stringBody } = event

  if (!stringBody) return event

  const parsedBody: ParsedBody = JSON.parse(stringBody)

  let parsedTags: string[] | undefined
  if (parsedBody.tags !== undefined) {
    parsedTags = convertCategoriesStringToArray(parsedBody.tags)
  }

  return {
    ...event,
    body: {
      ...parsedBody,
      tags: parsedTags
    }
  }
}

export const handleLambda = <TBody = any, TPathParams = null>(
  fn: LambdaHandler<TBody, TPathParams>
) => async (
  event: Event<TBody, TPathParams>,
  context: Context,
  callback: Callback
) => {
  await connectDB()

  try {
    const res = await fn(transformEvent(event) as any, context, callback)

    return {
      body: JSON.stringify(res)
    }
  } catch (e) {
    console.log(e)

    return {
      statusCode: e.status,
      body: JSON.stringify({
        message: e.message
      })
    }
  }
}
