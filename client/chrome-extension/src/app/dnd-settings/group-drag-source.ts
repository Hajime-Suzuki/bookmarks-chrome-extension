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

type Props = Omit<GroupListItemWrapperProps, 'connectGroupDragSource'>

export interface GroupBeginDragType {
  groupIndex: number
  size: ClientRect | DOMRect
}

const dragSource: DragSourceSpec<Props, GroupBeginDragType> = {
  beginDrag: (props, monitor, component) => {
    console.log('drag')
    return {
      // groupId: props.group._id,
      groupIndex: props.groupIndex,
      size: (findDOMNode(component) as Element).getBoundingClientRect()
    }
  }
}

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectGroupDragSource: connect.dragSource()
})

export type GroupDragSourceProps = ReturnType<typeof collect>

export const groupDragSource = (
  component: React.ComponentType<GroupListItemWrapperProps>
) => DragSource(DnDTypes.groups, dragSource, collect)(component)
