import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark } from '../../models/Bookmark'
import { BookmarkRepository } from '../../repositories/bookmarks'

/**
 * @description: reorder is done by separate endpoint
 */

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
  const bookmark = await BookmarkRepository.update(pathParameters!.id, body)
  return { bookmark }
}

export const handler = handleLambda(updateBookmark)
