import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl
} from 'class-validator'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark } from '../../models/Bookmark'
import { BookmarkRepository } from '../../repositories/bookmarks'
import { GroupRepository } from '../../repositories/group'

/**
 * @description: When create a new bookmark, it must be belong to a group. Either drop a tab into a group, or collect all tabs currently opened and put them in one group.
 */

export class CreateBookmarkInput {
  @IsNotEmpty()
  @IsString()
  title: IBookmark['title']

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: IBookmark['url']

  @IsOptional()
  @IsString()
  img?: IBookmark['img']

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: IBookmark['tags']

  @IsOptional()
  @IsString()
  group: IBookmark['_id']
}

const createBookmark: LambdaHandler<CreateBookmarkInput> = async ({ body }) => {
  await validateInput(body, CreateBookmarkInput)

  const group = await GroupRepository.findByIdOrCreate(body.group)

  // save bookmark with group
  const newBookmark = await BookmarkRepository.create({
    ...body,
    group: group._id
  })

  // then update group with the new id.
  const updatedGroup = await GroupRepository.update(group._id, {
    $push: { items: newBookmark._id }
  })

  return { bookmark: newBookmark }
}

export const handler = handleLambda(createBookmark)
