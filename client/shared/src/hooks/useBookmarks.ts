import { CognitoUser } from '@aws-amplify/auth'
import { IGroup, IBookmark } from '../types'

import { Omit } from '@material-ui/core'
import update from 'immutability-helper'
import { CreateBookmarkInput, bookmarksAPI } from '../api/bookmarks'

/**
 * @description:  currently this hook is tied to useGroups
 */

type UpdateBookmarkInput = Omit<Partial<IBookmark>, 'tags'> & {
  tags?: string
}

interface ReorderBookmarksArgs {
  groupId: IGroup['_id']
  groupIndex: number
  currentBookmarkIndex: number
  targetBookmarkIndex: number
  bookmark: IBookmark
}

interface UpdateBookmarkArgs {
  id: IBookmark['_id']
  groupIndex: number
  bookmarkIndex: number
  input: UpdateBookmarkInput
}

const updatedGroups = (groups: IGroup[], targetIndex: number, params: any) =>
  update(groups, {
    [targetIndex]: {
      bookmarks: {
        $splice: params
      }
    }
  })

export const useBookmarks = (
  groups: IGroup[] | null,
  setGroups: React.Dispatch<React.SetStateAction<IGroup[] | null>>
) => {
  const createBookmark = async (
    targetGroup: string,
    input: CreateBookmarkInput
  ) => {
    return bookmarksAPI.create(targetGroup, input)
  }

  ///// TODO: ues group index and merge these functions.
  const pushBookmark = (
    args: Omit<ReorderBookmarksArgs, 'currentBookmarkIndex'>
  ) => {
    setGroups(_groups => {
      if (!_groups) return _groups
      const { groupId, targetBookmarkIndex, bookmark, groupIndex } = args
      const params = [[targetBookmarkIndex, 0, { ...bookmark, group: groupId }]]
      return updatedGroups(_groups, groupIndex, params)
    })
  }

  const pullBookmark = (
    args: Omit<
      ReorderBookmarksArgs,
      'currentBookmarkIndex' | 'bookmark' | 'groupId'
    >
  ) => {
    setGroups(_groups => {
      if (!_groups) return _groups
      const { targetBookmarkIndex, groupIndex } = args
      const params = [[targetBookmarkIndex, 1]]
      return updatedGroups(_groups, groupIndex, params)
    })
  }

  const reorderBookmarks = (args: Omit<ReorderBookmarksArgs, 'groupId'>) => {
    if (!groups) return
    const {
      currentBookmarkIndex,
      targetBookmarkIndex,
      bookmark,
      groupIndex
    } = args
    const params = [
      [currentBookmarkIndex, 1],
      [targetBookmarkIndex, 0, bookmark]
    ]
    setGroups(updatedGroups(groups, groupIndex, params))
  }
  /////

  const updateBookmark = async (args: UpdateBookmarkArgs) => {
    const { id, input, groupIndex, bookmarkIndex } = args
    if (!groups) return

    const {
      data: { bookmark: updatedBookmark }
    } = await bookmarksAPI.update(id, input)

    const updated = update(groups, {
      [groupIndex]: {
        bookmarks: { [bookmarkIndex]: { $merge: updatedBookmark } }
      }
    })
    setGroups(updated)
  }

  const removeBookmark = async (id: IBookmark['_id']) => {
    return bookmarksAPI.remove(id)
  }

  return {
    pushBookmark,
    pullBookmark,
    reorderBookmarks,
    updateBookmark,
    createBookmark,
    removeBookmark
  }
}
