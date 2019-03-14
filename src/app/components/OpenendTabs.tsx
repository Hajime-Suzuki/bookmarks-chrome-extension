import React, { FC } from 'react'
import useOpenedTabs from '../hooks/useOpenedTabs'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button
} from '@material-ui/core'

const OpenedTabs: FC<{}> = () => {
  const { tabs, removeTab } = useOpenedTabs()
  return (
    <>
      <Button onClick={removeTab}>reomve 1</Button>
      {tabs.map(tab => {
        return (
          <List key={tab.id}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar src={tab.favIconUrl} />
              </ListItemAvatar>
              <ListItemText>{tab.title}</ListItemText>
            </ListItem>
          </List>
        )
      })}
    </>
  )
}

export default OpenedTabs
