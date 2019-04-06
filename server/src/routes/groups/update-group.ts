import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import * as createError from 'http-errors'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark, Bookmark } from '../../models/Bookmark'
import { GroupRepository } from '../../repositories/group'
import { BookmarkRepository } from '../../repositories/bookmarks'
import { IGroup } from '../../models/Group'

export class EditGroupInput {
  @IsNotEmpty()
  @IsString()
  title: IGroup['title']
}

interface Params {
  id: IBookmark['_id']
}

const updateBookmark: LambdaHandler<EditGroupInput, Params> = async ({
  body,
  pathParameters: { id }
}) => {
  await validateInput(body, EditGroupInput)
  return await GroupRepository.update(id, body)
}

export const handler = handleLambda(updateBookmark)
