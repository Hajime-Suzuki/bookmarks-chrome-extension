import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'

const dragSource: DragSourceSpec<any, any> = {
  beginDrag: (props, monitor) => {
    return {
      group: 1234
    }
  }
}

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectGroupDragSource: connect.dragSource()
})

export type GroupDragSourceProps = ReturnType<typeof collect>

export const groupDragSource = (component: any) =>
  DragSource(DnDTypes.groups, dragSource, collect)(component)

// const GroupWrapper = groupDragSource(props => {
//   const { connectGroupDragSource, children } = props
//   class C extends React.Component<any> {
//     render() {
//       return connectGroupDragSource(
//         <div>Test ashtiaynshietonaihsentieaht {children}</div>
//       )
//     }
//   }
//   return <C />
// })
