import {
  bookmarksAPI,
  CreateBookmarkInput
} from '@bookmarks/extension/src/app/api/bookmarks'
import { IBookmark, IGroup } from '@bookmarks/extension/src/app/types'
import { Omit } from '@material-ui/core'
import React, { createContext, FC } from 'react'

export type UpdateBookmarkInput = Omit<Partial<IBookmark>, 'tags'> & {
  tags?: string
}

export const useBookmarks = () => {
  //
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
