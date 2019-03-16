import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsArray
} from 'class-validator'
import { validateInput } from '../helpers/validator'
import { handleLambda, LambdaHandler } from '../middleware/handle-lambda'
import { BookmarkRepository } from '../repositories/bookmarks'

export class CreateBookmarkInput {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: string

  @IsOptional()
  @IsString()
  img?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[]
}

const createBookmark: LambdaHandler = async ({
  body
}: {
  body: CreateBookmarkInput
}) => {
  await validateInput(body, CreateBookmarkInput)
  const newBookmark = await BookmarkRepository.create(body)
  return { bookmark: newBookmark }
}

export const handler = handleLambda(createBookmark)
