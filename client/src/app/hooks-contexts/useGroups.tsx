import { Omit } from '@material-ui/core'
import axios from 'axios'
import update from 'immutability-helper'
import React, {
  createContext,
  FC,
  useEffect,
  useState,
  useContext
} from 'react'
import { API_GROUPS_URL } from '../../constants'
import { GroupsAPI } from '../api/groups'
import { IBookmark, IGroup, Tab } from '../types'
import { UpdateBookmarkInput } from './useBookmarks'
import { bookmarksAPI } from '../api/bookmarks'
import { UserContext } from './useUser'
interface FetchBookmarksResponse {
  groups: IGroup[]
}

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
  const [fetching, setFetching] = useState(false)

  const fetchGroups = async () => {
    setFetching(true)
    const { data } = await axios.get<FetchBookmarksResponse>(API_GROUPS_URL)
    setFetching(false)
    setGroups(data.groups)
  }

  const createGroup = async ({ groupTitle, tab }: CreateGroupInput) => {
    if (!groupTitle && !tab) {
      return console.warn('either group title or tab is required')
    }
    if (tab && (!tab.title || !tab.url)) {
      return console.warn('title and url are required')
    }

    const body = {
      ...(groupTitle && { title: groupTitle }),
      ...(tab && {
        bookmark: { title: tab.title, url: tab.url, img: tab.favIconUrl }
      })
    }
    const { newGroup } = await GroupsAPI.createGroup(body)
    setGroups([newGroup, ...(groups ? groups : [])])
  }

  const updateGroup = async (index: number, input: any) => {
    if (!groups) return
    await GroupsAPI.updateGroup(groups[index]._id, input)

    const updated = update(groups, {
      [index]: { $merge: input }
    })
    setGroups(updated)
  }

  const deleteGroup = async (index: number) => {
    if (!groups) return
    await GroupsAPI.deleteGroup(groups[index]._id)
    const updated = update(groups, { $splice: [[index, 1]] })
    setGroups(updated)
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return {
    groups,
    fetching,
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
  // TODO: ues group index and merge these functions.
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

  const updateBookmark = async (args: UpdateBookmarkArgs) => {
    const { id, input, groupIndex, bookmarkIndex } = args
    if (!groups) return
    const { bookmark: updatedBookmark } = await bookmarksAPI.update(id, input)
    const updated = update(groups, {
      [groupIndex]: {
        bookmarks: { [bookmarkIndex]: { $merge: updatedBookmark } }
      }
    })
    setGroups(updated)
  }

  return {
    pushBookmark,
    pullBookmark,
    reorderBookmarks,
    updateBookmark
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
