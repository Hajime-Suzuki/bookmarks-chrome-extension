import { Omit } from '@material-ui/core'
import axios from 'axios'
import React, { createContext, FC } from 'react'
import { API_BOOKMARK_URL } from '@bookmarks/extension/src/constants'
import { CreateBookmarkInput } from '@bookmarks/extension/src/app/api/bookmarks'
import { IBookmark, IGroup } from '@bookmarks/extension/src/app/types'

interface CreateBookmarkResponse {
  bookmark: IBookmark
}

export type UpdateBookmarkInput = Omit<Partial<IBookmark>, 'tags'> & {
  tags?: string
}

export const useBookmarks = () => {
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

  return {
    createBookmark
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
