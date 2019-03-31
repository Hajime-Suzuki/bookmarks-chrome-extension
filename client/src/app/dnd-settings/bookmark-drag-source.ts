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
  index: number
  size: ClientRect | DOMRect
}

const dragSource: DragSourceSpec<BookmarkCardProps, BeginDragReturnType> = {
  beginDrag: (props, monitor, component) => {
    console.log(props.index)
    return {
      id: props.bookmark._id,
      index: props.index,
      size: (findDOMNode(component) as Element).getBoundingClientRect()
    }
  },
  endDrag: (props, monitor, component) => {
    // send order to the server
    return
  }
}

const dragCollect = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource()
})

export type BookmarkDragSourceProps = ReturnType<typeof dragCollect>

export const bookmarkDragSource = (
  component: React.ComponentType<BookmarkDragSourceProps & BookmarkCardProps>
) =>
  DragSource<BookmarkCardProps>(DnDTypes.bookmarks, dragSource, dragCollect)(
    component
  )
