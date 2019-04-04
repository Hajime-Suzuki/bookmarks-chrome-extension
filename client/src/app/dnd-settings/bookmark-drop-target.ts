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

const getXIndex = (dropAreaWith: number, targetOffsetX: number) => {
  const XThreshold = dropAreaWith / GRID_SIZE
  const XIndex = Math.floor(targetOffsetX / XThreshold)
  return XIndex <= GRID_SIZE - 1 ? XIndex : GRID_SIZE - 1
}

const getYIndex = (targetOffsetY: number, cardHeight: number) => {
  const YIndex = Math.floor(targetOffsetY / cardHeight) - 1
  return YIndex < 0 ? 0 : YIndex
}

interface State {
  currentIndex: number | null
  // groupIndex: number | null
  currentGroup: string | null
}

let state: State

export const resetState = () => {
  state = {
    currentIndex: null,
    currentGroup: null
  }
}
resetState()

const getIndex = (props, monitor, component, draggedItem) => {
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

  // const targetIndex = YIndex * GRID_SIZE + XIndex
  const targetIndex = Math.min(
    YIndex * GRID_SIZE + XIndex,
    props.bookmarks.length
  )
  return targetIndex
}
const prevTargetIndex: null | number = null
const draggedItemCurrentGroup: null | string = null
const bookmarkDropSource: DropTargetSpec<DnDContainerWrapperProps> = {
  hover: (props, monitor, component) => {
    // check item's index when dragging starts, in the list and position in the drop area. Then get index within the list. If they are the same, do nothing.

    if (!component) return

    const draggedItem = monitor.getItem() as BeginDragReturnType
    const hoveredGroup = props.groupId

    // initialize when drag start
    if (state.currentIndex === null) {
      state.currentIndex = draggedItem.index
    }
    if (!state.currentGroup) {
      state.currentGroup = hoveredGroup
    }
    // --- initialize

    const targetIndex = getIndex(props, monitor, component, draggedItem)

    const groupChanged = state.currentGroup !== hoveredGroup
    const movedWithinGroup = targetIndex !== state.currentIndex && !groupChanged

    if (movedWithinGroup) {
      console.log('movedWithinGroup')
      if (targetIndex > props.bookmarks.length - 1) return
      props.reorderBookmarks({
        groupId: state.currentGroup,
        currentIndex: state.currentIndex,
        targetIndex,
        bookmark: draggedItem.bookmark
      })
      state.currentIndex = targetIndex
    } else if (groupChanged) {
      console.log('group changed')
      const previousGroup = state.currentGroup
      state.currentGroup = hoveredGroup

      const previousIndex = state.currentIndex
      state.currentIndex = targetIndex

      props.pushBookmark({
        groupId: state.currentGroup,
        targetIndex,
        bookmark: draggedItem.bookmark
      })
      props.pullBookmark({
        groupId: previousGroup,
        targetIndex: previousIndex
      })
    }
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
