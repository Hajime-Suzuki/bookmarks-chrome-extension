import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import * as createError from 'http-errors'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark } from '../../models/Bookmark'
import { GroupRepository } from '../../repositories/group'

/**
 * @description
 * - 1. when changing order of bookmarks, replace it with a whole array... (can be improved)
 * - 2. when adding a bookmark, add it with specific position with $position.
 * - 2. when removing bookmark from a group, just use that bookmark's id
 * - 3. any other cases, just use any valid input.
 */

class Types {
  @IsOptional()
  type?: UpdateTypes
}

export class EditGroupInput extends Types {
  @IsNotEmpty()
  @IsString()
  title: IBookmark['title']
}

class RemoveBookmarkInput extends Types {
  @IsNotEmpty()
  @IsString()
  bookmark: IBookmark['_id']
}

class AddBookmarksInput extends Types {
  @IsNotEmpty()
  @IsString()
  bookmark: IBookmark['_id']

  @IsOptional()
  @IsNumber()
  position?: number
}

class ReorderBookmarksInput extends Types {
  @IsNotEmpty()
  @IsString()
  bookmark: IBookmark['_id']

  @IsNotEmpty()
  @IsNumber()
  position: number
}

type UpdateTypes =
  | 'reorder:bookmark'
  | 'add:bookmark'
  | 'remove:bookmark'
  | undefined

interface Params {
  id: IBookmark['_id']
}

const updateBookmark: LambdaHandler<
  Types & Record<string, any>,
  Params
> = async ({ body: { type, ..._body }, pathParameters: { id } }) => {
  switch (type) {
    case 'remove:bookmark': {
      await validateInput(_body, RemoveBookmarkInput)
      const body: RemoveBookmarkInput = _body as any
      return await GroupRepository.update(id, {
        $pull: { bookmarks: body.bookmark }
      })
    }
    case 'add:bookmark': {
      await validateInput(_body, AddBookmarksInput)
      const body: AddBookmarksInput = _body as any
      return await GroupRepository.update(id, {
        $push: {
          bookmarks: {
            $each: [body.bookmark],
            ...(body.position !== undefined && { $position: body.position })
          }
        }
      })
    }
    case 'reorder:bookmark': {
      await validateInput(_body, AddBookmarksInput)
      const body: ReorderBookmarksInput = _body as any

      const addParams = {
        $push: {
          bookmarks: {
            $each: [body.bookmark],
            ...(body.position !== undefined && { $position: body.position })
          }
        }
      }
      const removeParams = {
        $pull: { bookmarks: body.bookmark }
      }

      await GroupRepository.update(id, removeParams)
      return await GroupRepository.update(id, addParams)
    }
    case undefined: {
      await validateInput(_body, EditGroupInput)
      const { title }: EditGroupInput = _body as any
      return await GroupRepository.update(id, { title })
    }
    default: {
      throw createError(400, 'invalid type')
    }
  }
}

export const handler = handleLambda(updateBookmark)
