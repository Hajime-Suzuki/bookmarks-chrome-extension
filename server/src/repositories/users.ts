import { User, IUser } from '../models/User'
import { IGroup, Group } from '../models/Group'
import createError from 'http-errors'
import { TableNames } from '../constants'
import { Bookmark } from '../models/Bookmark'

type Id = IUser['userId']

interface CreateUserArgs {
  id: Id
}

const findGroups = async (userId: Id) => {
  const user = await User.findOne({ userId }).populate({
    path: TableNames.groups,
    model: Group,
    populate: { path: TableNames.bookmarks, model: Bookmark }
  })
  if (!user) throw createError(404, 'user not found')
  return user.groups
}

const findByIdOrCreate = async ({ id }: CreateUserArgs) => {
  const existingUser = await User.findOne({ userId: id })
  if (!existingUser) {
    const newUser = await User.create({ userId: id })
    return newUser
  }
  return existingUser
}

interface UpdateArgs {
  userId: Id
  params: {
    $pull: {
      groups: IGroup['_id']
    }
  }
}

const update = async ({ userId, params }: UpdateArgs) =>
  User.findOneAndUpdate({ userId }, params)

export interface ReorderGroupsArgs {
  originId: IGroup['_id']
  targetIndex: number
  userId: IUser['userId']
}
const reorderGroups = async ({
  originId,
  targetIndex,
  userId
}: ReorderGroupsArgs) => {
  const user = await User.findOne({ userId })
  if (!user) return createError(404, 'user not found')

  const params = { $pull: { groups: originId } }
  const updated = await user.update(params)

  const params2 = {
    $push: { groups: { $each: [originId], $position: targetIndex } }
  }

  const updated2 = await user.update(params2)

  return true
}

export const UserRepository = {
  findByIdOrCreate,
  findGroups,
  reorderGroups,
  update
}
