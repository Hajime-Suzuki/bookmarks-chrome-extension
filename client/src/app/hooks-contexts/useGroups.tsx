import axios from 'axios'
import update from 'immutability-helper'
import React, { createContext, FC, useEffect, useState } from 'react'
import { API_GROUPS_URL } from '../../constants'
import { GroupsAPI } from '../api/groups'
import { IBookmark, IGroup, Tab } from '../types'
import { css } from 'styled-components'
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

  const reorderBookmarks = (
    type: 'push' | 'pull' | 'reorder',
    id: IGroup['_id'],
    currentIndex,
    targetIndex,
    bookmark: IBookmark
  ) => {
    setGroups(_groups => {
      if (!_groups) return _groups
      const targetGroupIndex = _groups.findIndex(g => g._id === id)

      const updatedGroups = (params: any) =>
        update(_groups, {
          [targetGroupIndex]: {
            bookmarks: {
              $splice: params
            }
          }
        })

      switch (type) {
        case 'push': {
          console.log('push', _groups[targetGroupIndex]._id)

          return updatedGroups([[targetIndex, 0, bookmark]])
        }
        case 'pull': {
          console.log('pull', _groups[targetGroupIndex]._id)

          return updatedGroups([[currentIndex, 1]])
        }
        case 'reorder': {
          console.log('reorder', _groups[targetGroupIndex]._id)

          return updatedGroups([[currentIndex, 1], [targetIndex, 0, bookmark]])
        }
        default: {
          console.warn('wrong args combination')
          return _groups
        }
      }

      // return updated
    })
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
