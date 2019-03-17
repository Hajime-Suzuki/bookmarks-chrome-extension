import { handleLambda, LambdaHandler } from '../middleware/handle-lambda'
import { IBookmark } from '../models/Bookmark'
import { BookmarkRepository } from '../repositories/bookmarks'

const deleteBookmarks: LambdaHandler<any, { _id: IBookmark['_id'] }> = async ({
  pathParameters
}) => {
  pathParameters
  await BookmarkRepository.remove(pathParameters!._id)
  return null
}

export const handler = handleLambda(deleteBookmarks)
