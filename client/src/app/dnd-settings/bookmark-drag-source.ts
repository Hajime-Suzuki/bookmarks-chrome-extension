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
import { resetState } from './bookmark-drop-target'

export interface BeginDragReturnType {
  id: IBookmark['_id']
  bookmark: IBookmark
  index: number
  size: ClientRect | DOMRect
}

const dragSource: DragSourceSpec<BookmarkCardProps, BeginDragReturnType> = {
  beginDrag: (props, monitor, component) => {
    return {
      id: props.bookmark._id,
      bookmark: props.bookmark,
      index: props.index,
      size: (findDOMNode(component) as Element).getBoundingClientRect()
    }
  },
  endDrag: (props, monitor, component) => {
    console.log('endDrag')
    resetState()
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
