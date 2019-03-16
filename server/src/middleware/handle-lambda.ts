import { connectDB } from '../db/connection'
import { IBookmark } from '../models/Bookmark'

interface Event {
  body: any
}
type Context = any
type Callback = (err?: any, data?: any) => void

export type LambdaHandler = (
  event: Event,
  context: Context,
  callback: Callback
) => any

const convertCategoriesStringToArray = (categories: string) => {
  if (typeof categories !== 'string') {
    throw new Error('category must be string')
  }

  if (categories === '') return []

  return categories
    .split(',')
    .map(c => c.trim())
    .filter(Boolean)
}

const transformEvent = (event: Event) => {
  const { body: stringBody } = event

  if (!stringBody) return event

  const body = JSON.parse(stringBody)

  event.body = body

  if (body.categories !== undefined) {
    event.body.categories = convertCategoriesStringToArray(body.categories)
  }
  return event
}

export const handleLambda = (fn: LambdaHandler) => async (
  event: Event,
  context: Context,
  callback: Callback
) => {
  await connectDB()
  console.log(JSON.parse(event.body))
  try {
    const res = await fn(transformEvent(event), context, callback)
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
