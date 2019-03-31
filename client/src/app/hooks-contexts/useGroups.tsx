import React, { useState, useEffect, createContext, FC } from 'react'
import axios from 'axios'
import { API_BOOKMARK_URL, API_GROUPS_URL } from '../../constants'
import { IBookmark, IGroup, Tab } from '../types'
import { Omit } from '@material-ui/core'
import { GroupAPI } from '../api/group'

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
    console.log(data)
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
    const { newGroup } = await GroupAPI.createGroup(body)
    setGroups([newGroup, ...(groups ? groups : [])])
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return {
    groups,
    fetching,
    createGroup
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
