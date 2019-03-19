import { Document, model, Model, models, Schema } from 'mongoose'

/**
 * @description While a group must be unique, multiple category can be added to a bookmark.
 */

export interface IBookmark {
  _id: string // ObjectId
  title: string
  url: string
  img?: string
  group?: string
  tags?: string[]
  createdAt: Date
  updatedAt?: Date
}

const BookmarkSchema = new Schema<IBookmark>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  img: String,
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  tags: {
    type: [String]
  },
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: Date
})

export const Bookmark: Model<IBookmark & Document> =
  models.Bookmarks || model<IBookmark & Document>('Bookmark', BookmarkSchema)
