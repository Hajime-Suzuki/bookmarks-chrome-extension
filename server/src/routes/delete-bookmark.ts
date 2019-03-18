import { handleLambda, LambdaHandler } from '../middleware/handle-lambda'
import { IBookmark } from '../models/Bookmark'
import { BookmarkRepository } from '../repositories/bookmarks'

const deleteBookmarks: LambdaHandler<any, { id: IBookmark['_id'] }> = async ({
  pathParameters
}) => {
  console.log({ id: pathParameters.id })
  await BookmarkRepository.remove(pathParameters!.id)
  return null
}

export const handler = handleLambda(deleteBookmarks)
