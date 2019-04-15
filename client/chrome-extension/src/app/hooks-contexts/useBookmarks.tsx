import { Omit } from '@material-ui/core'
import axios from 'axios'
import React, { createContext, FC } from 'react'
import { API_BOOKMARK_URL } from '../../constants'
import { CreateBookmarkInput } from '../api/bookmarks'
import { IBookmark, IGroup } from '../types'

interface CreateBookmarkResponse {
  bookmark: IBookmark
}

export type UpdateBookmarkInput = Omit<Partial<IBookmark>, 'tags'> & {
  tags?: string
}

export const useBookmarks = () => {
  // const [bookmarks, setBookmarks] = useState<IBookmark[]>([])

  const createBookmark = async (
    groupId: IGroup['_id'],
    input: CreateBookmarkInput
  ) => {
    const categories = input.tags ? input.tags.join(',') : ''

    const { data } = await axios.post<CreateBookmarkResponse>(
      API_BOOKMARK_URL,
      {
        ...input,
        group: groupId,
        categories
      }
    )
    return data.bookmark
  }

  // const deleteBookmark = async (_id: IBookmark['_id']) => {
  //   await axios.delete(`${API_BOOKMARK_URL}/${_id}`)
  //   setBookmarks(bookmarks.filter(bm => bm._id !== _id))
  // }

  // const updateBookmark = async (
  //   _id: IBookmark['_id'],
  //   input: UpdateBookmarkInput
  // ) => {
  //   const { data } = await axios.put<{ bookmark: IBookmark }>(
  //     `${API_BOOKMARK_URL}/${_id}`,
  //     input
  //   )

  //   const updatedBookmarkIndex = [
  //     data.bookmark,
  //     ...bookmarks.filter(bm => bm._id !== _id)
  //   ]
  //   setBookmarks(updatedBookmarkIndex)
  // }

  // useEffect(() => {
  //   fetchBookmarks()
  // }, [])

  return {
    createBookmark
    // deleteBookmark,
    // updateBookmark,
  }
}

export type BookmarkContext = ReturnType<typeof useBookmarks>
export const BookmarkContext = createContext({} as BookmarkContext)

export const BookmarksProvider: FC = props => {
  const bookmarks = useBookmarks()
  return (
    <BookmarkContext.Provider value={bookmarks}>
      {props.children}
    </BookmarkContext.Provider>
  )
}
