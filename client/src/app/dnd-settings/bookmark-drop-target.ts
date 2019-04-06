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

interface State {
  currentIndex: number | null
  currentGroup: string | null
}
export let dragState: State

export const resetDragState = () => {
  dragState = {
    currentIndex: null,
    currentGroup: null
  }
}

const updateDragCurrentIndex = (newIndex: number) =>
  (dragState.currentIndex = newIndex)
const updateDragCurrentGroup = (newGroup: string) =>
  (dragState.currentGroup = newGroup)

const getXIndex = (dropAreaWith: number, targetOffsetX: number) => {
  const XThreshold = dropAreaWith / GRID_SIZE
  const XIndex = Math.floor(targetOffsetX / XThreshold)
  return XIndex <= GRID_SIZE - 1 ? XIndex : GRID_SIZE - 1
}

const getYIndex = (targetOffsetY: number, cardHeight: number) => {
  const YIndex = Math.floor(targetOffsetY / cardHeight) - 1
  return Math.max(0, YIndex)
}

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

  const targetIndex = Math.min(
    YIndex * GRID_SIZE + XIndex,
    props.bookmarks.length
  )
  return targetIndex
}

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

const bookmarkDropSource: DropTargetSpec<DnDContainerWrapperProps> = {
  hover: (props, monitor, component) => {
    if (!component) return

    const draggedItem = monitor.getItem() as BeginDragReturnType
    const hoveredGroup = props.groupId

    // initialize when drag start
    if (dragState.currentIndex === null) {
      updateDragCurrentIndex(draggedItem.index)
    }
    if (!dragState.currentGroup) {
      updateDragCurrentGroup(hoveredGroup)
    }
    // --- initialize

    const targetIndex = getIndex(props, monitor, component, draggedItem)

    const groupChanged = dragState.currentGroup !== hoveredGroup
    const movedWithinGroup =
      targetIndex !== dragState.currentIndex && !groupChanged

    if (movedWithinGroup) {
      // console.log('movedWithinGroup')
      if (targetIndex > props.bookmarks.length - 1) return
      props.reorderBookmarks({
        groupId: dragState.currentGroup!,
        currentIndex: dragState.currentIndex!,
        targetIndex,
        bookmark: draggedItem.bookmark
      })
      updateDragCurrentIndex(targetIndex)
    } else if (groupChanged) {
      // console.log('group changed')
      const previousGroup = dragState.currentGroup!
      updateDragCurrentGroup(hoveredGroup)
      const currentGroup = dragState.currentGroup!

      const previousIndex = dragState.currentIndex!
      updateDragCurrentIndex(targetIndex)

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
