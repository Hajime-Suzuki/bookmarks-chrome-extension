import { BookmarkCardProps } from '../view/Bookmarks/components/bookmark-card'
import {
  DragSourceMonitor,
  DragSourceConnector,
  DragSource,
  DragSourceSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'

const dragSource: DragSourceSpec<BookmarkCardProps, any> = {
  beginDrag: (
    props: BookmarkCardProps,
    monitor: DragSourceMonitor,
    component
  ) => {
    console.log(component)
    return {
      id: props.bookmark._id,
      title: props.bookmark.title, // dev purpose
      index: props.index
    }
  },
  endDrag: (props: BookmarkCardProps, monitor: DragSourceMonitor) => {
    // console.log('end!!!!')
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
