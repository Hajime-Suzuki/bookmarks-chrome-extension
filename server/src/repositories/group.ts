import * as createError from 'http-errors'
import { Group, IGroup } from '../models/Group'
import { CreateGroupInput } from '../routes/groups/create-groups'

const find = async () => {
  return Group.find({}, null, { sort: { updatedAt: -1, createdAt: -1 } })
}

const create = async (input: CreateGroupInput) => {
  return Group.create(input)
}

const update = async (_id: IGroup['_id'], input) => {
  const updated = await Group.findByIdAndUpdate(
    _id,
    { ...input, updatedAt: new Date() },
    { new: true }
  )

  if (!updated) throw createError(404, `group ${_id} not found`)

  return updated
}

const remove = async (_id: IGroup['_id']) => {
  const bookmark = await Group.findById(_id)

  if (!bookmark) throw createError(404, `group ${_id} not found`)

  await bookmark.remove()
  return null
}

export const GroupRepository = {
  find,
  create,
  update,
  remove
}
