import * as createError from 'http-errors'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IGroup } from '../../models/Group'
import { GroupRepository } from '../../repositories/group'
import { UserRepository } from '../../repositories/users'

const deleteGroup: LambdaHandler<{}, { id: IGroup['_id'] }> = async ({
  pathParameters,
  userId
}) => {
  if (!userId) throw createError(401, 'login to proceed')
  const { id: groupId } = pathParameters
  await GroupRepository.remove(groupId)
  await UserRepository.update({
    userId,
    params: { $pull: { groups: groupId } }
  })
  return {
    success: true
  }
}

export const handler = handleLambda(deleteGroup)
