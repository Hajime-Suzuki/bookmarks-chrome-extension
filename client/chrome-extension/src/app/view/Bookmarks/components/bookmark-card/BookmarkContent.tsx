import styled from 'styled-components'

import { BookmarkCardProps } from '.'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'

const TwoLineEllipsis: any = styled(Typography)`
  && {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const StyledTooltip: any = styled(Tooltip)`` // TODO: set font size

export const Content = ({ bookmark }: Pick<BookmarkCardProps, 'bookmark'>) => {
  const { img, title } = bookmark
  return (
    <StyledTooltip title={title} enterDelay={400}>
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
