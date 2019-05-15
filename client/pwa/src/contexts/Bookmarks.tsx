import { Omit } from '@material-ui/core'
import React, { createContext, FC } from 'react'
import { IGroup, IBookmark } from '@bookmarks/shared/src/types'
import {
  CreateBookmarkInput,
  bookmarksAPI
} from '@bookmarks/shared/src/api/bookmarks'

export type UpdateBookmarkInput = Omit<Partial<IBookmark>, 'tags'> & {
  tags?: string
}

export const useBookmarks = () => {
  const createBookmark = async (
    groupId: IGroup['_id'],
    input: CreateBookmarkInput
  ) => {
    const bookmark = await bookmarksAPI.create(groupId, input)
    return bookmark
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
