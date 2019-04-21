import { GroupContext } from '@bookmarks/extension/src/app/hooks-contexts/useGroups'
import Button from '@material-ui/core/Button'
import { parse } from 'query-string'
import React, { useContext } from 'react'
import styled from 'styled-components'
import useReactRouter from 'use-react-router'
import { SelectedMenuProvider } from '../../hooks-contenxts/SelectedMenuContext'
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

const Share = () => {
  const { location, history } = useReactRouter()
  const { groups, fetching, createGroup: _createGroup } = useContext(
    GroupContext
  )
  const { groupName } = useContext(NewGroupContext)

  const params = parse(location.search) as {
    title: string
    text: string
  }

  const favIconUrl = getFaviconUrl(params.text)

  const createGroup = async () => {
    await _createGroup({
      groupTitle: groupName,
      tab: {
        title: params.title,
        url: params.text,
        ...(favIconUrl && { favIconUrl })
      }
    })
    history.replace('/')
  }

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
