import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { GroupRepository } from '../../repositories/group'
import { UserRepository } from '../../repositories/users'
import createError from 'http-errors'

const getGroups: LambdaHandler<{}> = async event => {
  // TODO: put authentication to separate middleware.
  if (!event.userId) throw createError(404, 'user not found')
  const groups = await UserRepository.findGroups(event.userId)

  return {
    groups
  }
}

export const handler = handleLambda(getGroups)
