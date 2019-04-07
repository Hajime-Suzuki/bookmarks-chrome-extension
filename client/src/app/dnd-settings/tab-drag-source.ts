import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'
import { Tab } from '../types'
import { TabListProps } from '../view/Tabs/OpenendTabs'

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
