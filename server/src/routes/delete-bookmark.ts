import { IsNotEmpty, IsString } from 'class-validator'
import { validateInput } from '../helpers/validator'
import { handleLambda } from '../middleware/handle-lambda'
import { IBookmark } from '../models/Bookmark'
import { BookmarkRepository } from '../repositories/bookmarks'

class DeleteBookmarkInput {
  @IsNotEmpty()
  @IsString()
  _id: IBookmark['_id']
}
const deleteBookmarks = async (event: { body: DeleteBookmarkInput }) => {
  // await validateInput(body, DeleteBookmarkInput)
  console.log(event)
  // await BookmarkRepository.remove(body._id)
  return null
}

export const handler = handleLambda(deleteBookmarks)
