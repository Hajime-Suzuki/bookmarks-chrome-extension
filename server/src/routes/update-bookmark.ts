import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  IsNotEmpty
} from 'class-validator'
import { validateInput } from '../helpers/validator'
import { handleLambda, LambdaHandler } from '../middleware/handle-lambda'
import { BookmarkRepository } from '../repositories/bookmarks'
import { IBookmark } from '../models/Bookmark'

export class EditBookmarkInput {
  @IsOptional()
  @IsString()
  title?: IBookmark['title']

  @IsOptional()
  @IsUrl()
  @IsString()
  url?: IBookmark['url']

  @IsOptional()
  @IsString()
  img?: IBookmark['img']

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: IBookmark['tags']

  @IsOptional()
  @IsString()
  group: IBookmark['group']
}

const updateBookmark: LambdaHandler<
  EditBookmarkInput,
  { id: IBookmark['_id'] }
> = async ({ body, pathParameters }) => {
  await validateInput(body, EditBookmarkInput)
  const bookmarks = await BookmarkRepository.update(pathParameters!.id, body)
  return { bookmarks }
}

export const handler = handleLambda(updateBookmark)
