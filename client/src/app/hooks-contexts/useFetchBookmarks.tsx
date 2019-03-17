import React, { useState, useEffect, createContext, FC } from 'react'
import axios from 'axios'
import { API_BOOKMARK_URL } from '../../constants'
import { IBookmark } from '../types'

interface FetchBookmarksResponse {
  bookmarks: IBookmark[]
}

interface CreateBookmarkInput {
  title: IBookmark['title']
  url: IBookmark['url']
  img?: IBookmark['img']
  tags: IBookmark['tags']
}

interface CreateBookmarkResponse {
  bookmark: IBookmark
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([])

  const fetchBookmarks = async () => {
    const { data } = await axios.get<FetchBookmarksResponse>(API_BOOKMARK_URL)
    setBookmarks(data.bookmarks)
  }

  const createBookmark = async (input: CreateBookmarkInput) => {
    const categories = input.tags ? input.tags.join(',') : ''

    const { data } = await axios.post<CreateBookmarkResponse>(
      API_BOOKMARK_URL,
      {
        ...input,
        categories
      }
    )
    setBookmarks([data.bookmark, ...bookmarks])
  }

  const deleteBookmark = async (_id: IBookmark['_id']) => {
    await axios.delete(`${API_BOOKMARK_URL}/${_id}`)
    setBookmarks(bookmarks.filter(bm => bm._id !== _id))
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  return {
    bookmarks,
    createBookmark,
    deleteBookmark
  }
}

type Context = ReturnType<typeof useBookmarks>
export const BookmarkContext = createContext({} as Context)

export const BookmarksProvider: FC = props => {
  const bookmarks = useBookmarks()
  return (
    <BookmarkContext.Provider value={bookmarks}>
      {props.children}
    </BookmarkContext.Provider>
  )
}
