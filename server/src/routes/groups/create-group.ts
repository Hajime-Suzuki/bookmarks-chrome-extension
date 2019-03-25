import { IsNotEmpty, IsString } from 'class-validator'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IGroup } from '../../models/Group'
import { GroupRepository } from '../../repositories/group'

export class CreateGroupInput {
  @IsNotEmpty()
  @IsString()
  title: IGroup['title']
}

const createGroup: LambdaHandler<any> = async ({ body }) => {
  await validateInput(body, CreateGroupInput)
  const newGroup = await GroupRepository.create(body)
  return { group: newGroup }
}

export const handler = handleLambda(createGroup)
