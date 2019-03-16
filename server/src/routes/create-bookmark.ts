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
import { IBookmark } from '../models/Bookmark'

export class CreateBookmarkInput {
  @IsNotEmpty()
  @IsString()
  title: IBookmark['title']

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: IBookmark['url']

  @IsOptional()
  @IsString()
  img?: IBookmark['img']

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: IBookmark['categories']
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
