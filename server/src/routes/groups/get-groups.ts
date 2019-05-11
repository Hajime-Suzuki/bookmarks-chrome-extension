import * as createError from 'http-errors'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { UserRepository } from '../../repositories/users'
import { AuthCheckerOption } from '../../constants'

const getGroups: LambdaHandler<{}> = async event => {
  const groups = await UserRepository.findGroups(event.userId!)
  return {
    groups
  }
}

export const handler = handleLambda(getGroups, AuthCheckerOption)
