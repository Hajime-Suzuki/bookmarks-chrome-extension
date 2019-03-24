import { DropTargetConnector, DropTargetMonitor, DropTarget } from 'react-dnd'
import { Tab } from '../types'
import { DnDTypes } from '../../constants'
import { DnDContainerWrapperProps } from '../view/Bookmarks'

const tabDropCollect = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  isDragging: !!monitor.getItem(),
  droppedItem: (monitor.didDrop() && (monitor.getItem().tab as Tab)) || null,
  tabConnectDropTarget: connect.dropTarget()
})

export type TabDropTargetProps = ReturnType<typeof tabDropCollect>

export const tabDropTarget = (
  component: React.ComponentType<DnDContainerWrapperProps>
) => DropTarget(DnDTypes.tabs, {}, tabDropCollect)(component)
