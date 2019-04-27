import { CognitoUser } from '@aws-amplify/auth'
import update from 'immutability-helper'
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState
} from 'react'
import { GroupsAPI } from '../api/groups'
import { useBookmarks } from '../hooks/useBookmarks'
import { useHttp } from '../hooks/useHttp'
import { IGroup, Tab } from '../types'
import { UserContext } from './User'

// TODO: put all interface to api

export interface CreateGroupInput {
  groupTitle?: string
  tab?: Pick<Tab, 'title' | 'url' | 'favIconUrl'>
}

const useGroups = (user: CognitoUser | null) => {
  const [groups, setGroups] = useState<IGroup[] | null>(null)

  const bookmarks = useBookmarks(user, groups, setGroups)

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

export type GroupContext = ReturnType<typeof useGroups>
export const GroupContext = createContext({} as GroupContext)

export const GroupsProvider: FC = props => {
  const { user } = useContext(UserContext)
  const groups = useGroups(user)
  return (
    <GroupContext.Provider value={groups}>
      {props.children}
    </GroupContext.Provider>
  )
}
