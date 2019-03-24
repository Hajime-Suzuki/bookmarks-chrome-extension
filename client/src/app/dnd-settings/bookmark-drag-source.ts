import { BookmarkCardProps } from '../view/Bookmarks/components/bookmark-card'
import { DragSourceMonitor, DragSourceConnector, DragSource } from 'react-dnd'
import { DnDTypes } from '../../constants'

const dragSource = {
  beginDrag: (props: BookmarkCardProps, monitor: DragSourceMonitor) => {
    console.log('begin!!!!')
    console.log(props)
    return {
      id: props.bookmark._id,
      title: props.bookmark.title
    }
  },
  endDrag: (props: BookmarkCardProps, monitor: DragSourceMonitor) => {
    console.log('end!!!!')
  }
}

const dragCollect = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
) => ({
  connectDragSource: connect.dragSource()
})

export type BookmarkDragSourceProps = ReturnType<typeof dragCollect>

export const bookmarkDragSource = <T>(
  component: React.ComponentType<T & BookmarkDragSourceProps>
) =>
  DragSource<BookmarkCardProps>(DnDTypes.bookmarks, dragSource, dragCollect)(
    component
  )
