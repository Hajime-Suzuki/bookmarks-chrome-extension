import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { GroupRepository } from '../../repositories/group'

const getGroups: LambdaHandler<{}, { id: string }> = async event => {
  return 'reorder'
}

export const handler = handleLambda(getGroups)
