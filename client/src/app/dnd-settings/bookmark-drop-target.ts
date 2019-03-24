import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'
import { DnDContainerProps } from '../view/Bookmarks'

const bookmarkDropSource: DropTargetSpec<DnDContainerProps> = {
  hover: (props, monitor, component) => {
    if (!component) return null
    console.log(component)
  },
  drop: (props, monitor, component) => {
    console.log(monitor.didDrop())
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
  component: React.ComponentType<DnDContainerProps>
) =>
  DropTarget(DnDTypes.bookmarks, bookmarkDropSource, bookmarkDropCollect)(
    component
  )
