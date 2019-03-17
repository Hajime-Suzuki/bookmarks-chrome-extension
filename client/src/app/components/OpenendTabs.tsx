import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import React, { FC, useContext } from 'react'
import useOpenedTabs from '../hooks-contexts/useOpenedTabs'
import { BookmarksContext } from '../hooks-contexts/useFetchBookmarks'
import { Tab } from '../types'

const OpenedTabs: FC<{}> = () => {
  const { tabs, closeTab } = useOpenedTabs()
  const { createBookmark: submit } = useContext(BookmarksContext)

  const createBookmark = async (tab: Tab) => {
    const { title, url, favIconUrl } = tab
    if (!title || !url) return console.warn('title and url are required')

    await submit({ title, url, img: favIconUrl, categories: undefined })
  }

  return (
    <>
      {tabs.map(tab => {
        return (
          <List key={tab.id}>
            <ListItem
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
          </List>
        )
      })}
    </>
  )
}

export default OpenedTabs
