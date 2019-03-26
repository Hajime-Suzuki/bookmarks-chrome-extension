import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IBookmark } from '../../models/Bookmark'
import { BookmarkRepository } from '../../repositories/bookmarks'
import { GroupRepository } from '../../repositories/group'

const deleteBookmarks: LambdaHandler<any, { id: IBookmark['_id'] }> = async ({
  pathParameters
}) => {
  console.log({ id: pathParameters.id })

  // delete bookmark first
  const deletedBookmark = await BookmarkRepository.remove(pathParameters!.id)

  // then remove the bookmark from the group.
  await GroupRepository.update(deletedBookmark.group, {
    $pull: { bookmarks: deletedBookmark._id }
  })
  return null
}

export const handler = handleLambda(deleteBookmarks)
