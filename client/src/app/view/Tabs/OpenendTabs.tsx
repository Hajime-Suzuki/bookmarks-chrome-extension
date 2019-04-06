import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import React, { FC, useContext } from 'react'
import {
  tabDragSource,
  TabDragSourceProps
} from '../../dnd-settings/tab-drag-source'
import { GroupContext } from '../../hooks-contexts/useGroups'
import { OpenedTabContext } from '../../hooks-contexts/useOpenedTabs'

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

export interface TabListProps {
  tab: chrome.tabs.Tab
}

// const _TabList: FC<TabListProps & TabDragSourceProps> =

const TabList = tabDragSource(
  ({ tab, connectDragSource }: TabListProps & TabDragSourceProps) => {
    const { createGroup } = useContext(GroupContext)
    return connectDragSource(
      <div>
        <ListItem
          key={tab.id}
          button
          onClick={async () => {
            createGroup({ tab })
            // await createBookmark(tab)
            // return tab.id && closeTab(tab.id)
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
)

export default OpenedTabs
