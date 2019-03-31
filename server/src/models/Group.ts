import { Document, model, Model, models, Schema } from 'mongoose'
import { TableName } from '../constants'

/**
 * @description While a group must be unique, multiple category can be added to a bookmark.
 */

export interface IGroup {
  _id: string // ObjectId
  title: string
  bookmarks?: string[]
  createdAt: Date
  updatedAt?: Date
}

const GroupSchema = new Schema<IGroup>({
  title: { type: String, required: true },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: TableName.bookmarks }],
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: Date
})

export const Group: Model<IGroup & Document> =
  models[TableName.groups] ||
  model<IGroup & Document>(TableName.groups, GroupSchema)
