import { BookmarkContext } from '@bookmarks/extension/src/app/hooks-contexts/useBookmarks'
import { GroupContext } from '@bookmarks/extension/src/app/hooks-contexts/useGroups'
import Button from '@material-ui/core/Button'
import { parse } from 'query-string'
import React, { useContext } from 'react'
import styled from 'styled-components'
import useReactRouter from 'use-react-router'
import {
  SelectedMenuContext,
  SelectedMenuProvider
} from '../../hooks-contenxts/SelectedMenuContext'
import {
  NewGroupContext,
  NewGroupProvider
} from '../../hooks-contenxts/useNewGroup'
import GroupSelect from './GroupSelect'
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const getFaviconUrl = (url?: string) => {
  if (!url) return null
  const [protocol, , host] = url.split('/')
  const baseUrl = `${protocol}//${host}`
  return baseUrl + '/favicon.ico'
}

interface ItemInfo {
  title: string
  text: string
}

const useCreateGroup = (params: ItemInfo) => {
  const { history } = useReactRouter()
  const { createBookmark } = useContext(BookmarkContext)
  const { selectedItem: selectedGroup } = useContext(SelectedMenuContext)
  const { groupName } = useContext(NewGroupContext)
  const { groups, createGroup: _createGroup, pushBookmark } = useContext(
    GroupContext
  )

  const favIconUrl = getFaviconUrl(params.text)

  const createGroup = async () => {
    const bookmark = {
      title: params.title,
      url: params.text,
      ...(favIconUrl && { favIconUrl })
    }
    if (selectedGroup.id) {
      const res = await createBookmark(selectedGroup.id, bookmark)

      const targetIndex =
        groups && selectedGroup.index
          ? groups[selectedGroup.index].bookmarks.length
          : 0
      pushBookmark({ groupId: selectedGroup.id, targetIndex, bookmark: res })
    }
    if (groupName) {
      await _createGroup({ groupTitle: groupName, tab: bookmark })
    }
    if (selectedGroup.id && groupName) {
      throw new Error('asihtena')
    }
    history.replace('/')
  }

  return {
    createGroup
  }
}

const Share = () => {
  const { location } = useReactRouter()
  const { groups, fetching } = useContext(GroupContext)

  const params = (parse(location.search) as any) as ItemInfo

  const { createGroup } = useCreateGroup(params)

  if (fetching || !groups) return <div>fetching</div>

  return (
    <Wrapper>
      <div>{params.title}</div>
      {params.text}
      <GroupSelect groups={groups} />

      <Button
        style={{ marginTop: '2em' }}
        onClick={createGroup}
        variant="contained"
        color="primary"
      >
        Save
      </Button>
    </Wrapper>
  )
}

export default () => (
  <SelectedMenuProvider>
    <NewGroupProvider>
      <Share />
    </NewGroupProvider>
  </SelectedMenuProvider>
)
