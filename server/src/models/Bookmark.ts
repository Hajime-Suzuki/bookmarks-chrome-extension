import { Document, model, Model, models, Schema } from 'mongoose'

/**
 * @description While a group must be unique, multiple category can be added to a bookmark.
 */

export interface IBookmark extends Document {
  title: string
  url: string
  img?: string
  group?: string
  categories?: string[]
  createdAt: Date
  updatedAt?: Date
}

const BookmarkSchema = new Schema<IBookmark>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  img: String,
  group: { type: String, unique: true },
  categories: {
    type: [String]
  },
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: Date
})

export const Bookmark: Model<IBookmark> =
  models.Bookmarks || model<IBookmark>('Bookmarks', BookmarkSchema)
