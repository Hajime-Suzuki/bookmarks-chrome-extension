import { LambdaHandler, handleLambda } from '../../middleware/handle-lambda'
import { GroupRepository } from '../../repositories/group'
import { IGroup } from '../../models/Group'

const deleteGroup: LambdaHandler<{}, { id: IGroup['_id'] }> = async ({
  pathParameters
}) => {
  await GroupRepository.remove(pathParameters.id)
  return {
    success: true
  }
}

export const handler = handleLambda(deleteGroup)
