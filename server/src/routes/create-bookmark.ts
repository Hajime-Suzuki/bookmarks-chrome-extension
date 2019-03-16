import { handleJSON, LambdaHandler } from '../middleware/handle-json'
import { Bookmark, IBookmark } from '../models/Bookmark'
import { validateInput } from '../helpers/validator'

const createBookmark: LambdaHandler = async event => {
  await validateInput(event.body, IBookmark)
  return 'test'
}

export const handler = handleJSON(createBookmark)
