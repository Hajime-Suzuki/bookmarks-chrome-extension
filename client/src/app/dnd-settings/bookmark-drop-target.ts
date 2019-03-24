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

// TODO: make grid size dynamic...
const GRID_SIZE = 4
let prevTargetIndex: null | number = null

const getXIndex = (dropAreaWith: number, targetOffsetX: number) => {
  const XThreshold = dropAreaWith / GRID_SIZE
  const XIndex = Math.floor(targetOffsetX / XThreshold)
  return XIndex
}

const getYIndex = (targetOffsetY: number, cardHeight: number) => {
  const YIndex = Math.floor(targetOffsetY / cardHeight) - 1
  return YIndex < 0 ? 0 : YIndex
}

const bookmarkDropSource: DropTargetSpec<DnDContainerWrapperProps> = {
  hover: (props, monitor, component) => {
    // check item's index when dragging starts, in the list and position in the drop area. Then get index within the list. If they are the same, do nothing.

    if (!component) return
    const droppedItem = monitor.getItem() as BeginDragReturnType

    const { width: dropAreaWith } = (findDOMNode(
      component
    ) as Element).getBoundingClientRect()

    const { x: targetOffsetX, y: targetOffsetY } = monitor.getClientOffset()!

    const XIndex = getXIndex(dropAreaWith, targetOffsetX)

    const YIndex = getYIndex(targetOffsetY, droppedItem.size.height)

    const targetIndex = YIndex * GRID_SIZE + XIndex

    if (targetIndex === prevTargetIndex) return

    prevTargetIndex = targetIndex

    const currentIndex = droppedItem.index
    const { reorderBookmark } = component.context as BookmarkContext
    reorderBookmark(currentIndex, targetIndex)

    // mutate dropItem index so that I can continue to sort without dropping the item.
    droppedItem.index = targetIndex
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
