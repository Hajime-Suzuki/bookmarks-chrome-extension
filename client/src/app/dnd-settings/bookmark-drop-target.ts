import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec
} from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { DnDTypes } from '../../constants'
import { BookmarkContext } from '../hooks-contexts/useBookmarks'
import { DnDContainerWrapperProps } from '../view/Bookmarks'
import { BeginDragReturnType } from './bookmark-drag-source'

const bookmarkDropSource: DropTargetSpec<DnDContainerWrapperProps> = {
  drop: (props, monitor, component) => {
    if (!component) return
    const itemId = (monitor.getItem() as BeginDragReturnType).id
    const remove = (component.context as BookmarkContext).deleteBookmark
    remove(itemId)

    // console.log(hoverBoundingRect)
    // console.log(monitor.getClientOffset())
    // console.log(hoverBoundingRect)
    // console.log(monitor.getItem())
  }
}

const bookmarkDropCollect = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  bookmarkConnectDropSource: connect.dropTarget()
})

export type BookmarkDropTargetProps = ReturnType<typeof bookmarkDropCollect>

export const bookmarkDropTarget = (
  component: React.ComponentType<DnDContainerWrapperProps>
) =>
  DropTarget(DnDTypes.bookmarks, bookmarkDropSource, bookmarkDropCollect)(
    component
  )
