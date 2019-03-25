import { LambdaHandler, handleLambda } from '../../middleware/handle-lambda'
import { GroupRepository } from '../../repositories/group'
import { IGroup } from '../../models/Group'

const deleteGroup: LambdaHandler<{}, { id: IGroup['_id'] }> = async ({
  pathParameters
}) => {
  console.log({ id: pathParameters.id })
  // TODO: remove group from items.
  await GroupRepository.remove(pathParameters.id)
  return null
}

export const handler = handleLambda(deleteGroup)
