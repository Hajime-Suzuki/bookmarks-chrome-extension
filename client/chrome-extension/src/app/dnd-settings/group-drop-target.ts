import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'
import { DnDContainerWrapperProps } from '../view/Bookmarks'
import { GroupListProps } from '../view/Bookmarks/components/group/ReorderGroups'

const dropTarget: DropTargetSpec<GroupListProps> = {
  hover: (props, monitor, component) => {
    console.log(component)
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
  component: React.ComponentType<DnDContainerWrapperProps>
) => DropTarget(DnDTypes.groups, dropTarget, collect)(component)
