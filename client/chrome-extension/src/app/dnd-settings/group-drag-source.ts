import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec
} from 'react-dnd'
import { GroupListItemWrapperProps } from '../view/Bookmarks/components/group/ReorderGroups'
import { Omit } from 'react-router'
import { findDOMNode } from 'react-dom'
import { dndGroupState as state } from './group-state'
import { DnDTypes } from '@bookmarks/shared/src/constants'

type Props = Omit<GroupListItemWrapperProps, 'connectGroupDragSource'>

export interface GroupBeginDragType {
  groupIndex: number
  size: ClientRect | DOMRect
}

const dragSource: DragSourceSpec<Props, GroupBeginDragType> = {
  beginDrag: (props, _, component) => {
    return {
      groupIndex: props.groupIndex,
      size: (findDOMNode(component) as Element).getBoundingClientRect()
    }
  },
  endDrag: async props => {
    if (props.groupIndex === state.originGroupIndex) return
    await state.placeReorder(props.group)
    state.reset()
  }
}

const collect = (connect: DragSourceConnector, _: DragSourceMonitor) => ({
  connectGroupDragSource: connect.dragSource()
})

export type GroupDragSourceProps = ReturnType<typeof collect>

export const groupDragSource = (
  component: React.ComponentType<GroupListItemWrapperProps>
) => DragSource(DnDTypes.groups, dragSource, collect)(component)
