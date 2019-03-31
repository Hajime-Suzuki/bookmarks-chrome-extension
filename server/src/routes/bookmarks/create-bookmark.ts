import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsMongoId
} from 'class-validator'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark } from '../../models/Bookmark'
import { BookmarkRepository } from '../../repositories/bookmarks'
import { GroupRepository } from '../../repositories/group'

/**
 * @description: Since group controls creation of bookmark, this endpoint might not be used anymore
 */

export class CreateBookmarkInput
  implements Pick<IBookmark, 'title' | 'url' | 'img' | 'tags' | 'group'> {
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

  @IsMongoId() // to validate, use _id.toString()
  group: IBookmark['group']
}

// const createBookmark: LambdaHandler<CreateBookmarkInput> = async ({ body }) => {
//   await validateInput(body, CreateBookmarkInput)

//   const group = await GroupRepository.findByIdOrCreate(body.group)

//   // save bookmark with group
//   const newBookmark = await BookmarkRepository.create({
//     ...body,
//     group: group._id
//   })

//   // then update group with the new id.
//   const updatedGroup = await GroupRepository.update(group._id, {
//     $push: { bookmarks: newBookmark._id }
//   })

//   return { bookmark: newBookmark }
// }

// export const handler = handleLambda(createBookmark)
