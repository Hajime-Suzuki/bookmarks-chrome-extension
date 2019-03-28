import { format } from 'date-fns'
import * as createError from 'http-errors'
import { Group, IGroup } from '../models/Group'
import { CreateGroupInput } from '../routes/groups/create-group'
import { IBookmark } from '../models/Bookmark'

const find = async () => {
  return Group.find({}, null, { sort: { updatedAt: -1, createdAt: -1 } })
}

const findById = async (id: IGroup['_id']) => {
  return Group.findById(id)
}

const findByIdOrCreate = async (id?: IGroup['_id']) => {
  if (!id) {
    const newGroup = await GroupRepository.create({
      title: format(new Date(), 'yyyy MMM dd')
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

interface UpdateInput extends Partial<IBookmark> {
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
  const bookmark = await Group.findById(_id)

  if (!bookmark) throw createError(404, `group ${_id} not found`)

  await bookmark.remove()
  return null
}

export const GroupRepository = {
  find,
  findById,
  findByIdOrCreate,
  create,
  update,
  remove
}
