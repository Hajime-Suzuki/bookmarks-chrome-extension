import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { GroupRepository } from '../../repositories/group'

const getGroups: LambdaHandler<{}> = async event => {
  const groups = await GroupRepository.findWithBookmarks()
  return {
    groups
  }
}

export const handler = handleLambda(getGroups)
