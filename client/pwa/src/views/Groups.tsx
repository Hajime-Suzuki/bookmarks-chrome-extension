import { GroupContext } from '@bookmarks/extension/src/app/hooks-contexts/useGroups'
import { Content } from '@bookmarks/extension/src/app/view/Bookmarks/components/bookmark-card/BookmarkContent'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import React, { Fragment, useContext } from 'react'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'

const Groups = () => {
  const { groups } = useContext(GroupContext)
  if (!groups) return <div>Loading</div>

  return (
    <>
      {groups.map(group => {
        return (
          <Fragment key={group._id}>
            <List>
              <ListSubheader style={{ backgroundColor: '#FAFAFA' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {group.title}
                  <div
                    style={{
                      height: '1px',
                      marginLeft: 12,
                      flexGrow: 1,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              </ListSubheader>

              {group.bookmarks.map(bookmark => {
                return (
                  <Link
                    href={bookmark.url}
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    key={bookmark._id}
                  >
                    <Content bookmark={bookmark} />
                  </Link>
                )
              })}
            </List>
          </Fragment>
        )
      })}
    </>
  )
}

export default Groups
