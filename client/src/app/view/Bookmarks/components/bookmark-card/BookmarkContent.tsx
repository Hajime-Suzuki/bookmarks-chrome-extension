import styled from 'styled-components'
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Tooltip
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

const StyledTooltip = styled(Tooltip)`` // TODO: set font size

const Content = ({ bookmark }: Pick<BookmarkCardProps, 'bookmark'>) => {
  const { img, title } = bookmark
  return (
    <StyledTooltip title={title} enterDelay={400} className="aishetn">
      <List className="card-content-list">
        <ListItem button={false}>
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
    </StyledTooltip>
  )
}

export default Content
