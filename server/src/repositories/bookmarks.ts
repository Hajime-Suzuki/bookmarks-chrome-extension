import { Bookmark, IBookmark } from '../models/Bookmark'
import { CreateBookmarkInput } from '../routes/create-bookmark'
import { EditBookmarkInput } from '../routes/update-bookmark'

const find = async () => {
  return Bookmark.find({})
}

const create = async (input: CreateBookmarkInput) => {
  return Bookmark.create(input)
}

const update = async (_id: IBookmark['_id'], input: EditBookmarkInput) => {
  return Bookmark.findByIdAndUpdate(_id, input, { new: true })
}

export const BookmarkRepository = {
  find,
  create,
  update
}
