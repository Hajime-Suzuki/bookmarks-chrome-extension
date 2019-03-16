import { validate } from 'class-validator'
import * as createError from 'http-errors'

export const validateInput = async <TData>(
  data: TData,
  ValidatorClass: new () => TData
) => {
  const body = new ValidatorClass()
  Object.keys(data).forEach(key => (body[key] = data[key]))
  const validationResult = await validate(body)

  const errors = ([] as string[]).concat(
    ...validationResult.map(error => Object.values(error.constraints))
  )

  if (errors.length) {
    throw createError(400, errors.join(', '))
  }
}
