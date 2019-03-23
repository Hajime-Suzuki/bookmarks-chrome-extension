import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'
import React, { FC, useContext } from 'react'
import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd'
import styled from 'styled-components'
import { BookmarkContext } from '../../../hooks-contexts/useBookmarks'
import { EditModalContext } from '../../../hooks-contexts/useModal'
import { theme } from '../../../styles/theme'
import { IBookmark } from '../../../types'

interface Props {
  bookmark: IBookmark
}

type CardSourceCollectedProps = ReturnType<typeof collect>

const BookmarkCard: FC<Props & CardSourceCollectedProps> = props => {
  const { bookmark, connectDragSource } = props

  return connectDragSource(
    <div style={{ height: '100%' }}>
      <Card style={{ height: '100%' }}>
        <CardActionArea style={{ height: '56%' }}>
          <Link
            color="inherit"
            underline="none"
            style={{ display: 'block' }}
            href={bookmark.url}
            target="blank"
          >
            <Content bookmark={bookmark} />
          </Link>
        </CardActionArea>
        <CardActions disableActionSpacing>
          <BottomSection bookmark={bookmark} />
        </CardActions>
      </Card>
    </div>
  )
}

const dragSource = {
  beginDrag: (props: Props, monitor: DragSourceMonitor) => {
    console.log('begin!!!!')
    return {
      id: props.bookmark._id,
      title: props.bookmark.title
    }
  },
  endDrag: (props: Props, monitor: DragSourceMonitor) => {
    console.log('end!!!!')
  }
}

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource()
})

export default DragSource<Props>('bookmark', dragSource, collect)(BookmarkCard)

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

const BottomSection = ({ bookmark }: Props) => {
  const { deleteBookmark } = useContext(BookmarkContext)
  const { openModal, selectEditBookmark } = useContext(EditModalContext)
  const { _id, tags } = bookmark

  return (
    <>
      <IconButton onClick={() => deleteBookmark(_id)}>
        <Icon fontSize="small" className="fas fa-minus-circle" />
      </IconButton>
      <Typography
        style={{
          width: '100%',
          textAlign: 'center',
          color: theme.typography.caption.color
        }}
      >
        {tags && tags.join(', ')}
      </Typography>
      <IconButton
        style={{
          marginLeft: 'auto'
        }}
        onClick={() => {
          selectEditBookmark(_id)
          openModal()
        }}
      >
        <Icon fontSize="small" className="fas fa-ellipsis-h" />
      </IconButton>
    </>
  )
}
