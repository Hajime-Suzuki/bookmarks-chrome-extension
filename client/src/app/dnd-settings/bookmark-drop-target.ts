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
    const droppedItem = monitor.getItem() as BeginDragReturnType
    const { reorderBookmark } = component.context as BookmarkContext
    // TODO: improve. take padding (drop area, and drag item) into account.
    const { width: dropAreaWith } = (findDOMNode(
      component
    ) as Element).getBoundingClientRect()

    // TODO: make grid size dynamic...
    const GRID_SIZE = 4

    const { x: targetOffsetX, y: targetOffsetY } = monitor.getClientOffset()!

    const XThreshold = dropAreaWith / GRID_SIZE
    const XIndex = Math.floor(targetOffsetX / XThreshold)

    const itemHeight = droppedItem.size.height
    const YIndex =
      Math.floor(targetOffsetY / itemHeight) - 1 > 0
        ? Math.floor(targetOffsetY / itemHeight) - 1
        : 0

    const targetIndex = YIndex * GRID_SIZE + XIndex
    console.log({ x: XIndex, y: YIndex })
    console.log({ index: targetIndex })
    reorderBookmark(droppedItem.index, targetIndex)

    // console.log({ index })
    // const itemId = (monitor.getItem() as BeginDragReturnType).id
    // const remove = (component.context as BookmarkContext).deleteBookmark
    // remove(itemId)

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
