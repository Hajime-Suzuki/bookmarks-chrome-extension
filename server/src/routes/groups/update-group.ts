import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches
} from 'class-validator'
import * as createError from 'http-errors'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark } from '../../models/Bookmark'
import { GroupRepository } from '../../repositories/group'

/**
 * @description
 * - 1. when changing order of bookmarks, replace it with a whole array... (can be improved)
 * - 2. when removing bookmark from a group, just use that bookmark's id
 * - 3. any other cases, just use any valid input.
 */

class Types {
  @IsOptional()
  @Matches(/(remove:bookmark|update:bookmark)/)
  type?: UpdateTypes
}
export class EditGroupInput extends Types {
  @IsString()
  @IsNotEmpty()
  title: IBookmark['title']
}

class RemoveBookmarkInput extends Types {
  @IsString({ each: true })
  bookmark: IBookmark['_id']
}

class UpdateBookmarksInput extends Types {
  @IsArray()
  @IsString({ each: true })
  bookmarks: Array<IBookmark['_id']>
}

type UpdateTypes = 'update:bookmark' | 'remove:bookmark' | undefined

interface Params {
  id: IBookmark['_id']
}

const updateBookmark: LambdaHandler<
  Types & Record<string, any>,
  Params
> = async ({ body: { type, ..._body }, pathParameters: { id } }) => {
  if (type === 'remove:bookmark') {
    await validateInput(_body, RemoveBookmarkInput)
    const body: RemoveBookmarkInput = _body as any
    return await GroupRepository.update(id, {
      $pull: { bookmarks: body.bookmark }
    })
  } else if (type === 'update:bookmark') {
    await validateInput(_body, UpdateBookmarksInput)
    const body: UpdateBookmarksInput = _body as any
    return await GroupRepository.update(id, {
      $set: { bookmarks: body.bookmarks }
    })
  } else if (type === undefined) {
    await validateInput(_body, EditGroupInput)
    const body: EditGroupInput = _body as any
    return await GroupRepository.update(id, body)
  } else {
    throw createError(400, 'invalid type')
  }
}

export const handler = handleLambda(updateBookmark)
