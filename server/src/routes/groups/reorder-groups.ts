import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IGroup } from '../../models/Group'
import { UserRepository } from '../../repositories/users'

export class ReorderGroupsInput {
  @IsString()
  @IsNotEmpty()
  originId: IGroup['_id']

  @IsInt()
  targetIndex: number
}

const reorderGroups: LambdaHandler<ReorderGroupsInput> = async ({
  userId,
  body
}) => {
  await validateInput(body, ReorderGroupsInput)
  return UserRepository.reorderGroups({ userId: userId!, ...body })
}
export const handler = handleLambda(reorderGroups, { auth: true })
