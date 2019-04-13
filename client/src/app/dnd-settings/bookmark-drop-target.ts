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
import { dndBookmarkState as state } from './bookmark-state'

/**
 *
 * key items:
 * hoveredGroup(local var), targetIndex(local var), and state values.
 * Here store data to local variables as much as possible and don't access directly monitor/props in order to avoid confusion.
 * Because we need to have 3 types of variables: local var, props/monitor, and state.
 *
 * @state
 *  state is needed to make some comparison within hover(), since API call to update groups happens only when drag has been ended. state has currentGroup and currentIndex, which are updated during dragging.
 *
 * @actions
 *  only when dragged item enters a different group, or it is moved with in the group, do following two actions.
 *
 * 1. moved within the group: reorder bookmarks.
 * remove the item of current index from its the bookmark array, and push the item item to the target position.
 * @note if targetIndex is grater than bookmarks.length - 1, skip the action, otherwise the card is added to wrong position, which breaks the array.
 *
 * 2. when group is changed: pull and push the card
 * push the bookmark to the target group, and remove it from the original group.
 *
 */

const getXIndex = (
  dropAreaWith: number,
  targetOffsetX: number,
  gridSize: number
) => {
  const XThreshold = dropAreaWith / gridSize
  const XIndex = Math.floor(targetOffsetX / XThreshold)
  return XIndex <= gridSize - 1 ? XIndex : gridSize - 1
}

const getYIndex = (targetOffsetY: number, cardHeight: number) => {
  const YIndex = Math.floor(targetOffsetY / cardHeight) - 1
  return Math.max(0, YIndex)
}

const getIndex = (
  props: DnDContainerWrapperProps & GridSize,
  monitor,
  component,
  draggedItem
) => {
  const dropTargetElement = findDOMNode(component) as Element
  const {
    width: dropAreaWith,
    top: dropAreaOffsetTop
  } = dropTargetElement.getBoundingClientRect()

  const { x: targetOffsetX, y: targetOffsetY } = monitor.getClientOffset()!

  const XIndex = getXIndex(dropAreaWith, targetOffsetX, props.gridSize)
  const YIndex = getYIndex(
    targetOffsetY - dropAreaOffsetTop + draggedItem.size.height / 2,
    draggedItem.size.height
  )

  const targetIndex = Math.min(
    YIndex * props.gridSize + XIndex,
    props.bookmarks.length
  )
  return targetIndex
}

const bookmarkDropSource: DropTargetSpec<
  DnDContainerWrapperProps & GridSize
> = {
  hover: (props, monitor, component) => {
    if (!component) return

    const draggedItem = monitor.getItem() as BeginDragReturnType
    const hoveredGroup = props.groupId

    // initialize when drag start
    if (state.currentIndex === null) {
      state.setCurrentIndex(draggedItem.index)
    }
    if (!state.currentGroup) {
      state.setCurrentGroup(hoveredGroup)
    }
    // --- initialize

    const targetIndex = getIndex(props, monitor, component, draggedItem)

    const groupChanged = state.currentGroup !== hoveredGroup
    const movedWithinGroup = targetIndex !== state.currentIndex && !groupChanged

    if (movedWithinGroup) {
      // console.log('movedWithinGroup')
      if (targetIndex > props.bookmarks.length - 1) return
      props.reorderBookmarks({
        groupId: state.currentGroup!,
        currentIndex: state.currentIndex!,
        targetIndex,
        bookmark: draggedItem.bookmark
      })
      state.setCurrentIndex(targetIndex)
    } else if (groupChanged) {
      // console.log('group changed')
      const previousGroup = state.currentGroup!
      state.setCurrentGroup(hoveredGroup)
      const currentGroup = state.currentGroup!

      const previousIndex = state.currentIndex!
      state.setCurrentIndex(targetIndex)

      props.pushBookmark({
        groupId: currentGroup,
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
  _: DropTargetMonitor
) => ({
  bookmarkConnectDropSource: connect.dropTarget()
})

interface GridSize {
  gridSize: number
}

export type BookmarkDropTargetProps = ReturnType<typeof bookmarkDropCollect> &
  GridSize

export const bookmarkDropTarget = (
  component: React.ComponentType<DnDContainerWrapperProps & GridSize>
) =>
  DropTarget(DnDTypes.bookmarks, bookmarkDropSource, bookmarkDropCollect)(
    component
  )
