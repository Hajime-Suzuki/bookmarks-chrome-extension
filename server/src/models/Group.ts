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
  user: string
}

const GroupSchema = new Schema<IGroup>({
  title: { type: String, required: true },
  user: { type: String, required: true },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: TableName.bookmarks }],
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: Date
})

// For serverless apploach, watchout populate function.
// ref: https://stackoverflow.com/questions/33072212/mongoose-error-schema-hasnt-been-registered-for-model-when-populate

export const Group: Model<IGroup & Document> =
  models[TableName.groups] ||
  model<IGroup & Document>(TableName.groups, GroupSchema)
