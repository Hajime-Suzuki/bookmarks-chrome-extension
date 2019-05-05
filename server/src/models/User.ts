import { Document, model, Model, models, Schema } from 'mongoose'
import { TableNames } from '../constants'
import { IGroup } from './Group'

export interface IUser {
  userId: string // coming from Cognito
  createdAt: Date
  groups: IGroup[]
}

const UserSchema = new Schema<IUser>({
  userId: { type: String },
  groups: [{ type: Schema.Types.ObjectId, ref: TableNames.groups }],
  createdAt: { type: Date, default: () => Date.now() }
})

// For serverless approach, watchout populate function.
// ref: https://stackoverflow.com/questions/33072212/mongoose-error-schema-hasnt-been-registered-for-model-when-populate

export const User: Model<IUser & Document> =
  models[TableNames.users] ||
  model<IUser & Document>(TableNames.users, UserSchema)
