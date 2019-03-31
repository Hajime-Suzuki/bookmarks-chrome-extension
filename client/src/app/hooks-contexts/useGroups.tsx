import axios from 'axios'
import update from 'immutability-helper'
import React, { createContext, FC, useEffect, useState } from 'react'
import { API_GROUPS_URL } from '../../constants'
import { GroupsAPI } from '../api/groups'
import { IBookmark, IGroup, Tab } from '../types'
interface FetchBookmarksResponse {
  groups: IGroup[]
}

export interface CreateGroupInput {
  groupTitle?: string
  tab?: Tab
}

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

  const pushBookmark = (id: IGroup['_id'], bookmark: IBookmark) => {
    if (!groups) return console.warn('there is no group')
    const targetIndex = groups.findIndex(g => g._id === id)
    const updated = update(groups, {
      [targetIndex]: { bookmarks: { $push: [bookmark] } }
    })
    setGroups(updated)
  }

  const reorderBookmarks = (id: IGroup['_id'], currentIndex, targetIndex) => {
    if (!groups) return
    const targetGroupIndex = groups.findIndex(g => g._id === id)
    const currentItem = groups[targetGroupIndex].bookmarks[currentIndex]
    const updatedGroups = update(groups, {
      [targetGroupIndex]: {
        bookmarks: {
          $splice: [[currentIndex, 1], [targetIndex, 0, currentItem]]
        }
      }
    })
    setGroups(updatedGroups)
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return {
    groups,
    fetching,
    pushBookmark,
    createGroup,
    reorderBookmarks
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
