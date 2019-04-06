import axios from 'axios'
import update from 'immutability-helper'
import React, { createContext, FC, useEffect, useState } from 'react'
import { API_GROUPS_URL } from '../../constants'
import { GroupsAPI, ReorderBookmarksAPIArgs } from '../api/groups'
import { IBookmark, IGroup, Tab } from '../types'
import { css } from 'styled-components'
import { Omit } from '@material-ui/core'
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

  const pushBookmark = (args: Omit<ReorderBookmarksArgs, 'currentIndex'>) => {
    setGroups(_groups => {
      if (!_groups) return _groups
      const { groupId, targetIndex, bookmark } = args
      const targetGroupIndex = _groups.findIndex(g => g._id === groupId)
      const params = [[targetIndex, 0, bookmark]]
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
    setGroups(_groups => {
      if (!_groups) return _groups
      const { groupId, currentIndex, targetIndex, bookmark } = args
      const targetGroupIndex = _groups.findIndex(g => g._id === groupId)
      const params = [[currentIndex, 1], [targetIndex, 0, bookmark]]
      return updatedGroups(_groups, targetGroupIndex, params)
    })
  }

  const reorderBookmarksAPICall = async (args: ReorderBookmarksAPIArgs) => {
    await GroupsAPI.reorderBookmarks(args)
    console.log('done')
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return {
    groups,
    fetching,
    createGroup,
    pushBookmark,
    pullBookmark,
    reorderBookmarks,
    reorderBookmarksAPICall
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
