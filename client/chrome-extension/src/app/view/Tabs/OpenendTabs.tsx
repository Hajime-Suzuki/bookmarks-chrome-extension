import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import React, { FC, useContext } from 'react'
import {
  tabDragSource,
  TabDragSourceProps
} from '../../dnd-settings/tab-drag-source'
import { GroupContext } from '@bookmarks/shared/contexts/Groups'
import { OpenedTabContext } from '@bookmarks/shared/contexts/OpenedTabs'

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
