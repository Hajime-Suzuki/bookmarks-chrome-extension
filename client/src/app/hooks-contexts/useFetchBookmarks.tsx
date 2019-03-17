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
  categories: IBookmark['categories']
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
    const categories = input.categories ? input.categories.join(',') : ''

    const { data } = await axios.post<CreateBookmarkResponse>(
      API_BOOKMARK_URL,
      {
        ...input,
        categories
      }
    )

    setBookmarks([data.bookmark, ...bookmarks])
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  return {
    bookmarks,
    createBookmark
  }
}

type Context = ReturnType<typeof useBookmarks>
export const BookmarksContext = createContext({} as Context)

export const BookmarksProvider: FC = props => {
  const bookmarks = useBookmarks()
  return (
    <BookmarksContext.Provider value={bookmarks}>
      {props.children}
    </BookmarksContext.Provider>
  )
}
