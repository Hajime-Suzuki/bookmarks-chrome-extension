import { Card, CardActionArea, CardActions, Link } from '@material-ui/core'
import React, { FC } from 'react'
import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd'
import { IBookmark } from '../../../../types'
import BottomSection from './BottomSection'
import Content from './BookmarkContent'
import { DnDTypes } from '../../../../../constants'

export interface BookmarkCardProps {
  bookmark: IBookmark
}

type CardSourceCollectedProps = ReturnType<typeof collect>

const BookmarkCard: FC<
  BookmarkCardProps & CardSourceCollectedProps
> = props => {
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
  beginDrag: (props: BookmarkCardProps, monitor: DragSourceMonitor) => {
    // console.log('begin!!!!')
    return {
      id: props.bookmark._id,
      title: props.bookmark.title
    }
  },
  endDrag: (props: BookmarkCardProps, monitor: DragSourceMonitor) => {
    // console.log('end!!!!')
  }
}

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource()
})

export default DragSource<BookmarkCardProps>(
  DnDTypes.bookmarks,
  dragSource,
  collect
)(BookmarkCard)
