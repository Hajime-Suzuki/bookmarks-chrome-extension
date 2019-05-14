import update from 'immutability-helper'
import React, { createContext, FC, useEffect, useState } from 'react'
import { GroupsAPI } from '@bookmarks/shared/api/groups'
import { getUser } from '@bookmarks/shared/helpers/getUser'
import { useBookmarks } from '@bookmarks/shared/hooks/useBookmarks'
import { useHttp } from '@bookmarks/shared/hooks/useHttp'
import { IGroup, Tab } from '@bookmarks/shared/types'

interface CreateGroupInput {
  groupTitle?: string
  tab?: Pick<Tab, 'title' | 'url' | 'favIconUrl'>
}

interface ReorderArgs {
  targetIndex: number
  originIndex: number
}

const useGroups = () => {
  const [groups, setGroups] = useState<IGroup[] | null>(null)

  const bookmarks = useBookmarks(groups, setGroups)

  const { fn: fetchGroups, fetching, error } = useHttp(async () => {
    const { groups: fetchedGroups } = await GroupsAPI.fetch()
    setGroups(fetchedGroups)
  })

  const createGroup = async ({ groupTitle, tab }: CreateGroupInput) => {
    const user = await getUser()
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

  const reorderGroups = ({ targetIndex, originIndex }: ReorderArgs) => {
    if (!groups) return
    const originGroup = groups[originIndex]
    const updated = update(groups, {
      $splice: [[originIndex, 1], [targetIndex, 0, originGroup]]
    })
    setGroups(updated)
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return {
    groups,
    fetching,
    error,
    createGroup,
    updateGroup,
    deleteGroup,
    reorderGroups,
    ...bookmarks
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
