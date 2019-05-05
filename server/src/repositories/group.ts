import { format } from 'date-fns'
import * as createError from 'http-errors'
import { TableNames } from '../constants'
import { Bookmark, IBookmark } from '../models/Bookmark'
import { Group, IGroup } from '../models/Group'
import { CreateGroupInput } from '../routes/groups/create-group'

const createGroup = async (input: CreateGroupInput) => Group.create(input)

const findWithBookmarks = async () => {
  return Group.find({}).populate({
    path: TableNames.bookmarks,
    model: Bookmark
  })
}

const findById = async (id: IGroup['_id']) => {
  return Group.findById(id)
}

interface FindOrCreateArgs {
  id?: IGroup['_id']
  data?: Pick<CreateGroupInput, 'title' | 'user'>
}
const findByIdOrCreate = async ({ id, data }: FindOrCreateArgs) => {
  // when id specified, find. Otherwise create.
  if (!id && data) {
    const newGroup = await createGroup({
      title: data.title || format(new Date(), 'yyyy MMM dd HH mm ss'),
      user: data.user
    })

    return newGroup
  } else if (id && !data) {
    const existingGroup = await GroupRepository.findById(id)
    if (!existingGroup) throw createError(404, 'group not found')
    return existingGroup
  } else {
    throw createError(
      400,
      'findByIdOrCreate (group): bad id and body combination.'
    )
  }
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
  update,
  remove
}
