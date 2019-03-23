import styled from 'styled-components'
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core'
import { BookmarkCardProps } from '.'
import React from 'react'

const TwoLineEllipsis = styled(Typography)`
  && {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Content = ({ bookmark }: BookmarkCardProps) => {
  const { img, title } = bookmark
  return (
    <List className="card-content-list">
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ width: 30, height: 30 }} src={img} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <TwoLineEllipsis variant="subheading" gutterBottom>
              {title}
            </TwoLineEllipsis>
          }
        />
      </ListItem>
    </List>
  )
}

export default Content
