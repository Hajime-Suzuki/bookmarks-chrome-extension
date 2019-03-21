import { Bookmark, IBookmark } from '../models/Bookmark'
import { CreateBookmarkInput } from '../routes/bookmarks/create-bookmark'
import { EditBookmarkInput } from '../routes/bookmarks/update-bookmark'
import * as createError from 'http-errors'

const find = async () => {
  return Bookmark.find({}, null, { sort: { createdAt: -1, updatedAt: -1 } })
}

const create = async (input: CreateBookmarkInput) => {
  return Bookmark.create(input)
}

const update = async (_id: IBookmark['_id'], input: EditBookmarkInput) => {
  const updated = await Bookmark.findByIdAndUpdate(
    _id,
    { ...input, updatedAt: new Date() },
    { new: true }
  )

  if (!updated) throw createError(404, `bookmark ${_id} not found`)

  return updated
}

const remove = async (_id: IBookmark['_id']) => {
  const bookmark = await Bookmark.findById(_id)

  if (!bookmark) throw createError(404, `bookmark ${_id} not found`)

  await bookmark.remove()
  return null
}

export const BookmarkRepository = {
  find,
  create,
  update,
  remove
}
