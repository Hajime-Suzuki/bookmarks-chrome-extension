import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec
} from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { Omit } from 'react-router'
import { DnDTypes } from '../../constants'
import { GroupListWrapperProps } from '../view/Bookmarks/components/group/ReorderGroups'
import { getYIndex } from './bookmark-drop-target'
import { GroupBeginDragType } from './group-drag-source'
import { dndGroupState as state } from './group-state'

type Props = Omit<GroupListWrapperProps, 'connectGroupDropTarget'>

const getIndex = (
  props: Props,
  monitor,
  component,
  draggedItem: GroupBeginDragType
) => {
  const dropTargetElement = findDOMNode(component) as Element
  const { top: dropAreaOffsetTop } = dropTargetElement.getBoundingClientRect()

  const { y: targetOffsetY } = monitor.getClientOffset()!

  const YIndex = getYIndex(
    targetOffsetY - dropAreaOffsetTop + draggedItem.size.height / 2,
    draggedItem.size.height
  )

  const targetIndex = Math.min(YIndex, props.groups.length)
  return targetIndex
}

const initialize = (draggedItem: GroupBeginDragType) => {
  if (!state.currentGroupIndex === null) {
    state.setCurrentGroupIndex(draggedItem.groupIndex)
  }
}

const dropTarget: DropTargetSpec<Props> = {
  hover: (props, monitor, component) => {
    if (!component) return
    const draggedItem = monitor.getItem() as GroupBeginDragType
    initialize(draggedItem)
    const index = getIndex(props, monitor, component, draggedItem)
    const isMoved =
      index !== state.currentGroupIndex && index !== draggedItem.groupIndex
    if (!isMoved) return
    state.setCurrentGroupIndex(index)
    console.log('moved')
  },
  drop: (props, monitor, component) => {
    console.log('drop')
  }
}

const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectGroupDropTarget: connect.dropTarget()
})

export type GroupDropTargetProps = ReturnType<typeof collect>

export const groupDropTarget = (
  component: React.ComponentType<GroupListWrapperProps>
) => DropTarget(DnDTypes.groups, dropTarget, collect)(component)
