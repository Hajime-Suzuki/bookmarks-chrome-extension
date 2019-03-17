import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  IsNotEmpty
} from 'class-validator'
import { validateInput } from '../helpers/validator'
import { handleLambda } from '../middleware/handle-lambda'
import { BookmarkRepository } from '../repositories/bookmarks'
import { IBookmark } from '../models/Bookmark'

export class EditBookmarkInput {
  @IsNotEmpty()
  @IsString()
  _id: IBookmark['_id']

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

const updateBookmark = async ({ body }: { body: EditBookmarkInput }) => {
  await validateInput(body, EditBookmarkInput)
  const bookmarks = await BookmarkRepository.update(body._id, body)
  return { bookmarks }
}

export const handler = handleLambda(updateBookmark)
