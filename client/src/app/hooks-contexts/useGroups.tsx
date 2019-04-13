import { Omit } from '@material-ui/core'
import update from 'immutability-helper'
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState
} from 'react'
import { bookmarksAPI, CreateBookmarkInput } from '../api/bookmarks'
import { GroupsAPI } from '../api/groups'
import { IBookmark, IGroup, Tab } from '../types'
import { UpdateBookmarkInput } from './useBookmarks'
import { useHttp } from './useHttp'
import { UserContext } from './useUser'

// TODO: put all interface to api

export interface CreateGroupInput {
  groupTitle?: string
  tab?: Tab
}

interface ReorderBookmarksArgs {
  groupId: IGroup['_id']
  currentIndex: number
  targetIndex: number
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

export const useGroups = () => {
  const [groups, setGroups] = useState<IGroup[] | null>(null)
  const bookmarks = _useBookmarks(groups, setGroups)
  const { user } = useContext(UserContext)

  const { fn: fetchGroups, fetching, error } = useHttp(async () => {
    const { groups: fetchedGroups } = await GroupsAPI.fetch(user)
    setGroups(fetchedGroups)
  })

  const createGroup = async ({ groupTitle, tab }: CreateGroupInput) => {
    if (!user) return

    if (!groupTitle && !tab) {
      return console.warn('either group title or tab is required')
    }
    if (tab && (!tab.title || !tab.url)) {
      return console.warn('title and url are required')
    }

    const body = {
      user: user.getSignInUserSession()!.getAccessToken().payload
        .username as string,
      ...(groupTitle && { title: groupTitle }),
      ...(tab && {
        bookmark: { title: tab.title!, url: tab.url!, img: tab.favIconUrl }
      })
    }
    const { newGroup } = await GroupsAPI.createGroup(body, user)
    setGroups([newGroup, ...(groups ? groups : [])])
  }

  const updateGroup = async (index: number, input: any) => {
    if (!groups) return
    await GroupsAPI.updateGroup(groups[index]._id, input, user)

    const updated = update(groups, {
      [index]: { $merge: input }
    })
    setGroups(updated)
  }

  const deleteGroup = async (index: number) => {
    if (!groups) return
    await GroupsAPI.deleteGroup(groups[index]._id, user)
    const updated = update(groups, { $splice: [[index, 1]] })
    setGroups(updated)
  }

  useEffect(() => {
    if (user) fetchGroups()
  }, [user])

  return {
    groups,
    fetching,
    error,
    createGroup,
    updateGroup,
    deleteGroup,
    ...bookmarks
  }
}

const _useBookmarks = (
  groups: IGroup[] | null,
  setGroups: React.Dispatch<React.SetStateAction<IGroup[] | null>>
) => {
  const { user } = useContext(UserContext)

  const createBookmark = async (
    targetGroup: string,
    input: CreateBookmarkInput
  ) => {
    return bookmarksAPI.create(targetGroup, input, user)
  }

  ///// TODO: ues group index and merge these functions.
  const pushBookmark = (args: Omit<ReorderBookmarksArgs, 'currentIndex'>) => {
    setGroups(_groups => {
      if (!_groups) return _groups
      const { groupId, targetIndex, bookmark } = args
      const targetGroupIndex = _groups.findIndex(g => g._id === groupId)
      const params = [[targetIndex, 0, { ...bookmark, group: groupId }]]
      return updatedGroups(_groups, targetGroupIndex, params)
    })
  }

  const pullBookmark = (
    args: Omit<ReorderBookmarksArgs, 'currentIndex' | 'bookmark'>
  ) => {
    setGroups(_groups => {
      if (!_groups) return _groups
      const { groupId, targetIndex } = args
      const targetGroupIndex = _groups.findIndex(g => g._id === groupId)
      const params = [[targetIndex, 1]]
      return updatedGroups(_groups, targetGroupIndex, params)
    })
  }

  const reorderBookmarks = (args: ReorderBookmarksArgs) => {
    if (!groups) return
    const { groupId, currentIndex, targetIndex, bookmark } = args
    const targetGroupIndex = groups.findIndex(g => g._id === groupId)
    const params = [[currentIndex, 1], [targetIndex, 0, bookmark]]
    setGroups(updatedGroups(groups, targetGroupIndex, params))
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

export type GroupContext = ReturnType<typeof useGroups>
export const GroupContext = createContext({} as GroupContext)

export const GroupsProvider: FC = props => {
  const groups = useGroups()
  return (
    <GroupContext.Provider value={groups}>
      {props.children}
    </GroupContext.Provider>
  )
}
