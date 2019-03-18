import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Link,
  Typography,
  Icon,
  IconButton,
  CardMedia as CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core'
import React, { FC, useContext, createRef, useRef } from 'react'
import { IBookmark } from '../../../types'
import { BookmarkContext } from '../../../hooks-contexts/useFetchBookmarks'
import styled from 'styled-components'
import { theme } from '../../../styles/theme'

interface Props {
  bookmark: IBookmark
}

const BookmarkCard: FC<Props> = ({ bookmark }) => {
  const { url } = bookmark
  return (
    <Card style={{ height: '100%' }}>
      <CardActionArea style={{ height: '56%' }}>
        <Link
          color="inherit"
          underline="none"
          style={{ display: 'block' }}
          href={url}
          target="blank"
        >
          <Content bookmark={bookmark} />
        </Link>
      </CardActionArea>
      <CardActions disableActionSpacing>
        <BottomSection bookmark={bookmark} />
      </CardActions>
    </Card>
  )
}

const TwoLineEllipsis = styled(Typography)`
  && {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Content = ({ bookmark }: Props) => {
  const { img, title } = bookmark
  return (
    <List className="card-content-list">
      <ListItem>
        <ListItemAvatar>
          <Avatar style={cardStyle} src={img} />
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

const cardStyle = {
  width: 30,
  height: 30
}

const BottomSection = ({ bookmark }: Props) => {
  const { deleteBookmark } = useContext(BookmarkContext)
  const { _id, tags } = bookmark
  return (
    <>
      <IconButton
        onClick={() => {
          console.log(bookmark.title, bookmark._id)
          deleteBookmark(_id)
        }}
      >
        <Icon fontSize="small" className="fas fa-minus-circle" />
      </IconButton>
      <Typography
        style={{
          width: '100%',
          textAlign: 'center',
          color: theme.typography.caption.color
        }}
      >
        {tags && tags.join(' ')}
      </Typography>
      <IconButton
        style={{
          marginLeft: 'auto'
        }}
      >
        <Icon fontSize="small" className="fas fa-ellipsis-h" />
      </IconButton>
    </>
  )
}

export default BookmarkCard
