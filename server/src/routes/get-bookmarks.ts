import { connectDB } from '../db/connection'
import { Bookmark } from '../models/Bookmark'
import { BookmarkRepository } from '../repositories/bookmarks'

export const handler = async (event: any, context: any) => {
  try {
    await connectDB()
    const bookmarks = await BookmarkRepository.find()
    return {
      body: JSON.stringify(bookmarks)
    }
  } catch (e) {
    console.log(e)
    return {
      body: JSON.stringify(e)
    }
  }
}
