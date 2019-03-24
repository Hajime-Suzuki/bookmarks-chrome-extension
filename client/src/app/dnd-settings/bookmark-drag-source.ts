import { BookmarkCardProps } from '../view/Bookmarks/components/bookmark-card'
import {
  DragSourceMonitor,
  DragSourceConnector,
  DragSource,
  DragSourceSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'
import { findDOMNode } from 'react-dom'
import { IBookmark } from '../types'

export interface BeginDragReturnType {
  id: IBookmark['_id']
  title: IBookmark['title'] // dev purpose
  index: number
  size: ClientRect | DOMRect
}

const dragSource: DragSourceSpec<BookmarkCardProps, BeginDragReturnType> = {
  beginDrag: (props, monitor, component) => {
    return {
      id: props.bookmark._id,
      title: props.bookmark.title, // dev purpose
      index: props.index,
      size: (findDOMNode(component) as Element).getBoundingClientRect()
    }
  },
  endDrag: (props, monitor, component) => {
    return
  }
}

const dragCollect = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
) => ({
  connectDragSource: connect.dragSource()
})

export type BookmarkDragSourceProps = ReturnType<typeof dragCollect>

export const bookmarkDragSource = <T>(
  component: React.ComponentType<T & BookmarkDragSourceProps>
) =>
  DragSource<BookmarkCardProps>(DnDTypes.bookmarks, dragSource, dragCollect)(
    component
  )
