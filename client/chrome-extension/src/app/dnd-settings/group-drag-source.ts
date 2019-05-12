import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'
import { GroupListItemWrapperProps } from '../view/Bookmarks/components/group/ReorderGroups'
import { Omit } from 'react-router'
import { findDOMNode } from 'react-dom'
import { dndGroupState as state } from './group-state'

type Props = Omit<GroupListItemWrapperProps, 'connectGroupDragSource'>

export interface GroupBeginDragType {
  groupIndex: number
  size: ClientRect | DOMRect
}

const dragSource: DragSourceSpec<Props, GroupBeginDragType> = {
  beginDrag: (props, monitor, component) => {
    console.log('drag', { props })
    return {
      // groupId: props.group._id,
      groupIndex: props.groupIndex,
      size: (findDOMNode(component) as Element).getBoundingClientRect()
    }
  },
  endDrag: async (props, monitor, component) => {
    await state.placeReorder(props.group)
    state.reset()
  }
}

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectGroupDragSource: connect.dragSource()
})

export type GroupDragSourceProps = ReturnType<typeof collect>

export const groupDragSource = (
  component: React.ComponentType<GroupListItemWrapperProps>
) => DragSource(DnDTypes.groups, dragSource, collect)(component)
