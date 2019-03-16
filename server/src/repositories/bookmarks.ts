import { Bookmark } from '../models/Bookmark'

const find = async () => {
  return Bookmark.find({})
}

export const BookmarkRepository = {
  find
}
