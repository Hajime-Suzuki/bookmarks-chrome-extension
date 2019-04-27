import { CognitoUser } from '@aws-amplify/auth'
import { IGroup, IBookmark } from '../types'
import { CreateBookmarkInput, bookmarksAPI } from '../api/bookmarks'
import { Omit } from '@material-ui/core'
import update from 'immutability-helper'

/**
 * @description:  currently this hook is tied to useGroups
 */

type UpdateBookmarkInput = Omit<Partial<IBookmark>, 'tags'> & {
  tags?: string
}

interface ReorderBookmarksArgs {
  groupId?: IGroup['_id']
  currentIndex: number
  targetIndex: number
  bookmark: IBookmark
  groupIndex: number
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
  user: CognitoUser | null,
  groups: IGroup[] | null,
  setGroups: React.Dispatch<React.SetStateAction<IGroup[] | null>>
) => {
  const createBookmark = async (
    targetGroup: string,
    input: CreateBookmarkInput
  ) => {
    return bookmarksAPI.create(targetGroup, input, user)
  }

  ///// TODO: ues group index and merge these functions.
  const pushBookmark = (
    args: Required<Omit<ReorderBookmarksArgs, 'currentIndex'>>
  ) => {
    setGroups(_groups => {
      if (!_groups) return _groups
      const { groupId, targetIndex, bookmark, groupIndex } = args
      const params = [[targetIndex, 0, { ...bookmark, group: groupId }]]
      return updatedGroups(_groups, groupIndex, params)
    })
  }

  const pullBookmark = (
    args: Omit<ReorderBookmarksArgs, 'currentIndex' | 'bookmark'>
  ) => {
    setGroups(_groups => {
      if (!_groups) return _groups
      const { targetIndex, groupIndex } = args
      const params = [[targetIndex, 1]]
      return updatedGroups(_groups, groupIndex, params)
    })
  }

  const reorderBookmarks = (args: ReorderBookmarksArgs) => {
    if (!groups) return
    const { currentIndex, targetIndex, bookmark, groupIndex } = args
    const params = [[currentIndex, 1], [targetIndex, 0, bookmark]]
    setGroups(updatedGroups(groups, groupIndex, params))
  }
  /////

  const updateBookmark = async (args: UpdateBookmarkArgs) => {
    const { id, input, groupIndex, bookmarkIndex } = args
    if (!groups) return
    const { bookmark: updatedBookmark } = await bookmarksAPI.update(
      id,
      input,
      user
    )
    const updated = update(groups, {
      [groupIndex]: {
        bookmarks: { [bookmarkIndex]: { $merge: updatedBookmark } }
      }
    })
    setGroups(updated)
  }

  const removeBookmark = async (id: IBookmark['_id']) => {
    return bookmarksAPI.remove(id, user)
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
