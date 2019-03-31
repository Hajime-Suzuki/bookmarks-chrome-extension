import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec
} from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { DnDTypes } from '../../constants'
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
    const draggedItem = monitor.getItem() as BeginDragReturnType
    const dropTargetElement = findDOMNode(component) as Element

    const {
      width: dropAreaWith,
      top: dropAreaOffsetTop
    } = dropTargetElement.getBoundingClientRect()

    const { x: targetOffsetX, y: targetOffsetY } = monitor.getClientOffset()!

    const XIndex = getXIndex(dropAreaWith, targetOffsetX)
    const YIndex = getYIndex(
      targetOffsetY - dropAreaOffsetTop + draggedItem.size.height / 2,
      draggedItem.size.height
    )

    const targetIndex = Math.min(
      YIndex * GRID_SIZE + XIndex,
      props.bookmarks.length - 1
    )

    if (targetIndex === prevTargetIndex) return

    const currentIndex = draggedItem.index

    props.reorderBookmarks(props.groupId, currentIndex, targetIndex)
    prevTargetIndex = targetIndex
    draggedItem.index = targetIndex
  },
  drop: () => {
    console.log('drop')
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

// console.table({
//   index: draggedItem.index,
//   dropAreaWith,
//   dropAreaHeight,
//   dropAreaOffsetTop,
//   targetOffsetX,
//   targetOffsetY,
//   XIndex,
//   YIndex
// })
