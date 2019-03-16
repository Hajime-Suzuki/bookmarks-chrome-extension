import { Schema, model, Model, Document, models } from 'mongoose'
import { IsString, IsDate, IsArray, IsOptional } from 'class-validator'

// export interface IBookmark extends Document {
//   title: string
//   url: string
//   img?: string
//   categories?: string[]
//   createdAt: Date
//   updatedAt?: Date
// }

export class IBookmark {
  @IsString()
  title: string

  @IsString()
  url: string

  @IsOptional()
  @IsString()
  img?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[]

  @IsDate()
  createdAt: Date

  @IsOptional()
  @IsDate()
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

export const Bookmark: Model<IBookmark & Document> =
  models.Bookmarks || model<IBookmark & Document>('Bookmarks', BookmarkSchema)
