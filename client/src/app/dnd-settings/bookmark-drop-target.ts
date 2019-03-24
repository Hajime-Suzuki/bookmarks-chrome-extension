import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'
import { DnDContainerWrapperProps } from '../view/Bookmarks'

const bookmarkDropSource: DropTargetSpec<DnDContainerWrapperProps> = {
  drop: (props, monitor, component) => {
    console.log(component)
    console.log(monitor.getItem())
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
