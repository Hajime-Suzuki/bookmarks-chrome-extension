import { format } from 'date-fns'
import * as createError from 'http-errors'
import { Group, IGroup } from '../models/Group'
import { CreateGroupInput } from '../routes/groups/create-group'
import { IBookmark } from '../models/Bookmark'

import { TableName } from '../constants'

const findWithBookmarks = async () => {
  return Group.find({}).populate(TableName.bookmarks)
}

const findById = async (id: IGroup['_id']) => {
  return Group.findById(id)
}

interface FindOrCreateArgs {
  id?: IGroup['_id']
  data?: Pick<CreateGroupInput, 'title'>
}
const findByIdOrCreate = async ({ id, data }: FindOrCreateArgs) => {
  if (!id) {
    const newGroup = await GroupRepository.create({
      title:
        data && data.title
          ? data.title
          : format(new Date(), 'yyyy MMM dd HH mm ss')
    })
    return newGroup
  } else {
    const existingGroup = await GroupRepository.findById(id)
    if (!existingGroup) throw createError(404, 'group not found')
    return existingGroup
  }
}

const create = async (input: CreateGroupInput) => {
  return Group.create(input)
}

interface UpdateInput extends Partial<IGroup> {
  $push?: {
    bookmarks: {
      $each: Array<IBookmark['_id']>
      $position?: number
    }
  }
  $set?: {
    bookmarks: Array<IBookmark['_id']>
  }
  $pull?: {
    bookmarks: IBookmark['_id']
  }
}
const update = async (_id: IGroup['_id'], input: UpdateInput) => {
  const updated = await Group.findByIdAndUpdate(
    _id,
    { ...input, updatedAt: new Date() },
    { new: true }
  )

  if (!updated) throw createError(404, `group ${_id} not found`)

  return updated
}

const remove = async (_id: IGroup['_id']) => {
  const group = await Group.findById(_id)

  if (!group) throw createError(404, `group ${_id} not found`)

  await group.remove()
  return null
}

export const GroupRepository = {
  findWithBookmarks,
  findById,
  findByIdOrCreate,
  create,
  update,
  remove
}
