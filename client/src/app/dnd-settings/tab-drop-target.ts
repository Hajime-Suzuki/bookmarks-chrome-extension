import { DropTargetConnector, DropTargetMonitor, DropTarget } from 'react-dnd'
import { Tab } from '../types'
import { DnDTypes } from '../../constants'
import { DnDContainerProps } from '../view/Bookmarks'

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
  component: React.ComponentType<DnDContainerProps>
) => DropTarget(DnDTypes.tabs, {}, tabDropCollect)(component)
