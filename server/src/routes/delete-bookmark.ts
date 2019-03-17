import { handleLambda, LambdaHandler } from '../middleware/handle-lambda'
import { IBookmark } from '../models/Bookmark'
import { BookmarkRepository } from '../repositories/bookmarks'

const deleteBookmarks: LambdaHandler<any, { id: IBookmark['_id'] }> = async ({
  pathParameters
}) => {
  pathParameters
  await BookmarkRepository.remove(pathParameters!.id)
  return null
}

export const handler = handleLambda(deleteBookmarks)
