import { User, IUser } from '../models/User'
import { IGroup } from '../models/Group'

type Id = IUser['userId']

interface CreateUserArgs {
  id: Id
}

const findByIdOrCreate = async ({ id }: CreateUserArgs) => {
  const existingUser = await User.findOne({ userId: id })
  if (!existingUser) {
    const newUser = await User.create({ userId: id })
    return newUser
  }
  return existingUser
}

interface Args {
  userId: Id
  params: {
    $pull: {
      groups: IGroup['_id']
    }
  }
}

const update = async ({ userId, params }: Args) =>
  User.findOneAndUpdate({ userId }, params)

export const UserRepository = { findByIdOrCreate, update }
