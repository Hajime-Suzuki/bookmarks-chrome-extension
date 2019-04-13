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
import useOpenedTabs, {
  OpenedTabContext
} from '../../hooks-contexts/useOpenedTabs'

const OpenedTabs: FC<{}> = () => {
  const { tabs } = useContext(OpenedTabContext)

  return (
    <List
      style={{
        position: 'fixed',
        boxShadow: '2px 0px 5px  grey',
        height: '100vh',
        overflow: 'scroll',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
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
    const { closeTab } = useContext(OpenedTabContext)
    return connectDragSource(
      <div>
        <ListItem
          key={tab.id}
          button
          onClick={async () => {
            createGroup({ tab })
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
)

export default OpenedTabs
