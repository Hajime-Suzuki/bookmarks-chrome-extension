import { Document, model, Model, models, Schema } from 'mongoose'

/**
 * @description While a group must be unique, multiple category can be added to a bookmark.
 */

export interface IGroup {
  _id: string // ObjectId
  name: string
  items?: string[]
  createdAt: Date
  updatedAt?: Date
}

const GroupSchema = new Schema<IGroup>({
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Bookmark' }],
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: Date
})

export const Group: Model<IGroup & Document> =
  models.Group || model<IGroup & Document>('Group', GroupSchema)
