import { IsOptional, IsString } from 'class-validator'
import * as createError from 'http-errors'
import { validateInput } from '../../helpers/validator'
import { handleLambda, LambdaHandler } from '../../middleware/handle-lambda'
import { IGroup } from '../../models/Group'
import { BookmarkRepository } from '../../repositories/bookmarks'
import { GroupRepository } from '../../repositories/group'
import { CreateBookmarkInput } from '../bookmarks/create-bookmark'

export class CreateGroupInput {
  @IsOptional()
  @IsString()
  title?: IGroup['title']

  @IsOptional()
  bookmark?: CreateBookmarkInput
}

const createGroup: LambdaHandler<CreateGroupInput> = async ({ body }) => {
  await validateInput(body, CreateGroupInput)
  if (!body.title && !body.bookmark) {
    createError(400, 'either title or bookmark is required')
  }
  const newGroup = await GroupRepository.findByIdOrCreate({ data: body })

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

    const mergedGroup = { ...updatedGroup.toObject(), bookmarks: [newBookmark] }
    return { group: mergedGroup }
  } else {
    return { group: newGroup }
  }
}

export const handler = handleLambda(createGroup)
