import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec
} from 'react-dnd'

import { TabListProps } from '../view/Tabs/OpenendTabs'
import { DnDTypes } from '@bookmarks/shared/src/constants'
import { Tab } from '@bookmarks/shared/src/types'

const dragSource: DragSourceSpec<TabListProps, { tab: Tab }> = {
  beginDrag: (props, monitor) => {
    return {
      tab: props.tab
    }
  }
}

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource()
})

export type TabDragSourceProps = ReturnType<typeof collect>

export const tabDragSource = <T>(component: any) =>
  DragSource(DnDTypes.tabs, dragSource, collect)(component)
