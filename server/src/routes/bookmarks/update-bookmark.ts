import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark } from '../../models/Bookmark'
import { BookmarkRepository } from '../../repositories/bookmarks'

/**
 * @description: Updating scenario.
 * - 1. change name.
 *   nothing special
 * - 2. change tags.
 *   nothing special for now.
 * - 3. change group. (requires both bookmark and group services)
 *      1. remove group from bookmark.
 *      2. remove the bookmark from the old group.
 *      3. add the bookmark to the new group.
 *         (2 and 3 are done by a different API call)
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
