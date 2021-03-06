import { GroupContext } from '@bookmarks/extension/src/app/contexts/Groups'
import Button from '@material-ui/core/Button'
import { parse } from 'query-string'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import useReactRouter from 'use-react-router'
import GroupSelect from './GroupSelect'
import BookmarkTitle from './BookmarkTitle'
import { BookmarkContext } from '../../contexts/Bookmarks'
import {
  SelectedMenuContext,
  SelectedMenuProvider
} from '../../contexts/SelectedMenu'
import { NewGroupContext, NewGroupProvider } from '../../contexts/NewGroup'

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

const useCreateGroup = (params: ItemInfo, bookmarkTitle: string) => {
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
      title: bookmarkTitle === '' ? params.title : bookmarkTitle,
      url: params.text,
      ...(favIconUrl && { favIconUrl })
    }
    if (selectedGroup.id) {
      const res = await createBookmark(selectedGroup.id, bookmark)

      const targetIndex =
        groups && selectedGroup.index
          ? groups[selectedGroup.index].bookmarks.length
          : 0
      pushBookmark({
        groupId: selectedGroup.id,
        groupIndex: selectedGroup.index || 0,
        targetBookmarkIndex: targetIndex,
        bookmark: res
      })
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

  const [bookmarkTitle, setBookmarkTitle] = useState(params.title)
  const handleBookmarkTitleChange = (e: any) =>
    setBookmarkTitle(e.currentTarget.value)

  const { createGroup } = useCreateGroup(params, bookmarkTitle)

  if (fetching || !groups) return <div>fetching</div>

  return (
    <Wrapper>
      <GroupSelect groups={groups} />
      <BookmarkTitle
        title={bookmarkTitle}
        handleBookmarkTitleChange={handleBookmarkTitleChange}
      />
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
