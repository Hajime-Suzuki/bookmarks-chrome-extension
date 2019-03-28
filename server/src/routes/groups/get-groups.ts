import { LambdaHandler, handleLambda } from '../../middleware/handle-lambda'
import { GroupRepository } from '../../repositories/group'
import { IGroup } from '../../models/Group'

const getGroups: LambdaHandler<{}> = async () => {
  const groups = await GroupRepository.findWithBookmarks()
  return {
    groups
  }
}

export const handler = handleLambda(getGroups)
