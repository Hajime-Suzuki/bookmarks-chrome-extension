import { handleLambda } from '../middleware/handle-lambda'
import { BookmarkRepository } from '../repositories/bookmarks'

const getBookmarks = async () => {
  const bookmarks = await BookmarkRepository.find()
  return { bookmarks }
}

export const handler = handleLambda(getBookmarks)
