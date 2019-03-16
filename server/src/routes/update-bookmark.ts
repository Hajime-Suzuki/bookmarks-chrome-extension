import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'
import { validateInput } from '../helpers/validator'
import { handleLambda } from '../middleware/handle-lambda'
import { BookmarkRepository } from '../repositories/bookmarks'

export class EditBookmarkInput {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsUrl()
  @IsString()
  url?: string

  @IsOptional()
  @IsString()
  img?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[]
}

const updateBookmark = async ({ body }: { body: EditBookmarkInput }) => {
  await validateInput(body, EditBookmarkInput)
  const bookmarks = await BookmarkRepository.update(
    '5c8c3f7ffcac0e34ff644890',
    body
  )
  return { bookmarks }
}

export const handler = handleLambda(updateBookmark)
