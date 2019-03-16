type Event = any
type Context = any
type Callback = (err?: any, data?: any) => void

export type LambdaHandler = (
  event: Event,
  context: Context,
  callback: Callback
) => any

export const handleJSON = (fn: LambdaHandler) => async (
  event: Event,
  context: Context,
  callback: Callback
) => {
  try {
    event.body = JSON.parse(event.body)
    const res = await fn(event, context, callback)
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
