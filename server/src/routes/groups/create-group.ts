import { IsOptional, IsString, IsNotEmpty } from 'class-validator'
import * as createError from 'http-errors'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IGroup } from '../../models/Group'
import { BookmarkRepository } from '../../repositories/bookmarks'
import { GroupRepository } from '../../repositories/group'
import { CreateBookmarkInput } from '../bookmarks/create-bookmark'
import { UserRepository } from '../../repositories/users'

export class CreateGroupInput {
  @IsOptional()
  @IsString()
  title?: IGroup['title']

  @IsOptional()
  bookmark?: CreateBookmarkInput

  @IsNotEmpty()
  @IsString()
  user: string
}

/**
 * @description: user can create either just a group or a group with bookmarks.
 *
 */

const createGroup: LambdaHandler<CreateGroupInput> = async ({ body }) => {
  console.log('=== create-group ===')
  await validateInput(body, CreateGroupInput)
  if (!body.title && !body.bookmark) {
    createError(400, 'either title or bookmark is required')
  }

  // create group
  const newGroup = await GroupRepository.findByIdOrCreate({ data: body })

  // create bookmark
  // TODO: remove this statement. Maybe allow user to only create group without a bookmark.
  if (body.bookmark) {
    const input = {
      ...body.bookmark,
      group: newGroup._id.toString()
    }
    await validateInput(input, CreateBookmarkInput)

    const newBookmark = await BookmarkRepository.create(input)
    const updatedGroup = await GroupRepository.update(newGroup._id, {
      bookmarks: [newBookmark._id]
    })

    // update user
    const user = await UserRepository.findByIdOrCreate({ id: body.user })
    user.groups.unshift(newGroup._id)
    await user.save()

    const mergedGroup = { ...updatedGroup.toObject(), bookmarks: [newBookmark] }
    return { group: mergedGroup }
  } else {
    return { group: newGroup }
  }
}

export const handler = handleLambda(createGroup)
