import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import React, { FC, useContext } from 'react'
import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd'
import { BookmarkContext } from '../../hooks-contexts/useBookmarks'
import { OpenedTabContext } from '../../hooks-contexts/useOpenedTabs'
import { Tab } from '../../types'
import { DnDTypes } from '../../../constants'

const OpenedTabs: FC<{}> = () => {
  const { tabs } = useContext(OpenedTabContext)
  return (
    <List style={{ padding: 0 }}>
      {tabs.map(tab => {
        return <TabList key={tab.id} tab={tab} />
      })}
    </List>
  )
}

interface ListProps {
  tab: chrome.tabs.Tab
}

const _TabList: FC<ListProps & ReturnType<typeof collect>> = ({
  tab,
  connectDragSource
}) => {
  const { closeTab } = useContext(OpenedTabContext)
  const { createBookmark: submit } = useContext(BookmarkContext)

  const createBookmark = async ({ title, url, favIconUrl }: Tab) => {
    if (!title || !url) return console.warn('title and url are required')
    await submit({ title, url, img: favIconUrl, tags: undefined })
  }

  return connectDragSource(
    <div>
      <ListItem
        key={tab.id}
        button
        onClick={async () => {
          await createBookmark(tab)
          return tab.id && closeTab(tab.id)
        }}
      >
        <ListItemAvatar>
          <Avatar src={tab.favIconUrl} />
        </ListItemAvatar>
        <ListItemText>{tab.title}</ListItemText>
      </ListItem>
    </div>
  )
}

const dragSource = {
  beginDrag: (props: ListProps, monitor: DragSourceMonitor) => {
    return {
      tab: props.tab
    }
  }
}

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource()
})

const TabList = DragSource<ListProps>(DnDTypes.tabs, dragSource, collect)(
  _TabList
)

export default OpenedTabs
