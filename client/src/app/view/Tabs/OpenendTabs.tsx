import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import React, { FC, useContext } from 'react'
import useOpenedTabs from '../../hooks-contexts/useOpenedTabs'
import { BookmarkContext } from '../../hooks-contexts/useBookmarks'
import { Tab } from '../../types'

const OpenedTabs: FC<{}> = () => {
  const { tabs, closeTab } = useOpenedTabs()
  const { createBookmark: submit } = useContext(BookmarkContext)

  const createBookmark = async (tab: Tab) => {
    const { title, url, favIconUrl } = tab
    if (!title || !url) return console.warn('title and url are required')

    await submit({ title, url, img: favIconUrl, tags: undefined })
  }

  return (
    <List>
      {tabs.map(tab => {
        return (
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
        )
      })}
    </List>
  )
}

export default OpenedTabs
