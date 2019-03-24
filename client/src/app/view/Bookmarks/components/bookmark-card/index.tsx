import { Card, CardActionArea, CardActions, Link } from '@material-ui/core'
import React, { FC } from 'react'
import {
  bookmarkDragSource,
  BookmarkDragSourceProps
} from '../../../../dnd-settings/bookmark-drag-source'
import { IBookmark } from '../../../../types'
import Content from './BookmarkContent'
import BottomSection from './BottomSection'

/**
 * @description: This is parent component of a card. This is also the drag source.
 */

export interface BookmarkCardProps {
  bookmark: IBookmark
  index: number
}

const BookmarkCard: FC<BookmarkDragSourceProps & BookmarkCardProps> = props => {
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

export default bookmarkDragSource(BookmarkCard)
