import { IsNotEmpty, IsString } from 'class-validator'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark } from '../../models/Bookmark'
import { BookmarkRepository } from '../../repositories/bookmarks'

export class CreateGroupInput {
  @IsNotEmpty()
  @IsString()
  title: IBookmark['title']
}

const createGroup: LambdaHandler<any> = async ({ body }) => {
  await validateInput(body, CreateGroupInput)
  const newGroup = await BookmarkRepository.create(body)
  return { group: newGroup }
}

export const handler = handleLambda(createGroup)
