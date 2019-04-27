import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'
import { Tab } from '../types'
import { DnDContainerWrapperProps } from '../view/Bookmarks'
import { TabListProps } from '../view/Tabs/OpenendTabs'

const tabDropSpec: DropTargetSpec<DnDContainerWrapperProps> = {
  drop: (props, monitor, component) => {
    const item = monitor.getItem() as TabListProps
    const { url, title, favIconUrl } = item.tab

    if (!url || !title) return console.warn('url and title are required')

    const targetGroup = props.groupId
      // tslint:disable-next-line:align
    ; (async () => {
      const res = await props.createBookmark(targetGroup, {
        title,
        url,
        img: favIconUrl
      })

      const lastPosition = props.bookmarks.length
      props.pushBookmark({
        groupId: targetGroup,
        groupIndex: props.groupIndex,
        targetBookmarkIndex: lastPosition,
        bookmark: res
      })
      props.closeTab(item.tab.id!)
    })()
  }
}

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
) => DropTarget(DnDTypes.tabs, tabDropSpec, tabDropCollect)(component)
