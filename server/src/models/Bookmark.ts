import { Document, model, Model, models, Schema } from 'mongoose'

export interface IBookmark extends Document {
  title: string
  url: string
  img?: string
  categories?: string[]
  createdAt: Date
  updatedAt?: Date
}

const BookmarkSchema = new Schema<IBookmark>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  img: String,
  categories: {
    type: [String]
  },
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: Date
})

export const Bookmark: Model<IBookmark> =
  models.Bookmarks || model<IBookmark>('Bookmarks', BookmarkSchema)
