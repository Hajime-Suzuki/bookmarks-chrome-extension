import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { ReorderGroupsArgs, UserRepository } from '../../repositories/users'
import { Omit } from '../../helpers/types'
import { User } from '../../models/User'

const tempUserId = '7deb8b12-410e-4c17-be7b-951adc3fb470'

const getGroups: LambdaHandler<Omit<ReorderGroupsArgs, 'userId'>> = async ({
  userId,
  body
}) => {
  // TODO: add validation
  return UserRepository.reorderGroups({ userId: tempUserId, ...body })
}
export const handler = handleLambda(getGroups, { auth: false })
