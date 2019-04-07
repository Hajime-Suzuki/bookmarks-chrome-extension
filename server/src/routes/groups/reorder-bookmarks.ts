import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark } from '../../models/Bookmark'
import { IGroup } from '../../models/Group'
import { BookmarkRepository } from '../../repositories/bookmarks'
import { GroupRepository } from '../../repositories/group'

/**
 * @description
 * bookmarks in a group is array of ids.
 * - 1. when changing order of bookmarks within group, remove the id and push it to certain position.
 * - 2. when changing group too, first change bookmarks array in belonging group, then update reference in bookmarks
 */

class ReorderBookmarksInput {
  @IsNotEmpty()
  @IsString()
  bookmarkId: IBookmark['_id']

  @IsNotEmpty()
  @IsNumber()
  position: number

  @IsNotEmpty()
  @IsString()
  from: IGroup['_id']

  @IsNotEmpty()
  @IsString()
  to: IGroup['_id']
}

const genAddParams = (bookmark: IBookmark['_id'], position?: number) => ({
  $push: {
    bookmarks: {
      $each: [bookmark],
      ...(position !== undefined && { $position: position })
    }
  }
})

const genRemoveParams = (bookmark: IBookmark['_id']) => ({
  $pull: { bookmarks: bookmark }
})

const reorderBookmarks: LambdaHandler<ReorderBookmarksInput> = async ({
  body
}) => {
  await validateInput(body, ReorderBookmarksInput)

  const reorderWithInGroup = body.from === body.to

  // update parent group
  await GroupRepository.update(body.from, genRemoveParams(body.bookmarkId))
  await GroupRepository.update(
    body.to,
    genAddParams(body.bookmarkId, body.position)
  )

  // if group is changed, remove and push bookmarks too.
  if (!reorderWithInGroup) {
    await BookmarkRepository.update(body.bookmarkId, { group: body.to })
  }

  return {
    success: true
  }
}

export const handler = handleLambda(reorderBookmarks)
