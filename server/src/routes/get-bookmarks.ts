import { connectDB } from '../db/connection'
import { handleJSON } from '../middleware/handle-json'
import { BookmarkRepository } from '../repositories/bookmarks'

const getBookmarks = async () => {
  await connectDB()
  const bookmarks = await BookmarkRepository.find()
  return bookmarks
}

export const handler = handleJSON(getBookmarks)
