import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec
} from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { DnDTypes } from '../../constants'
import { GroupsAPI } from '../api/groups'
import { IBookmark } from '../types'
import { BookmarkCardProps } from '../view/Bookmarks/components/bookmark-card'
import { dndBookmarkState as state } from './bookmark-state'

export interface BeginDragReturnType {
  // id: IBookmark['_id']
  bookmark: IBookmark
  index: number
  size: ClientRect | DOMRect
}

const dragSource: DragSourceSpec<BookmarkCardProps, BeginDragReturnType> = {
  beginDrag: (props, _, component) => {
    state.reset()
    return {
      // id: props.bookmark._id,
      bookmark: props.bookmark,
      index: props.index,
      size: (findDOMNode(component) as Element).getBoundingClientRect()
    }
  },
  canDrag: () => !state.updating,
  endDrag: async (_, monitor) => {
    const draggedItem = monitor.getItem() as BeginDragReturnType
    const { currentGroup, currentIndex } = state

    const isReorderWithinGroup =
      currentGroup === draggedItem.bookmark.group &&
      draggedItem.index !== currentIndex

    const isReorderCrossGroup = currentGroup !== draggedItem.bookmark.group

    if (isReorderWithinGroup || isReorderCrossGroup) {
      if (!currentGroup || currentIndex === null) return
      console.log('reorder')
      state.setUpdating(true)
      await GroupsAPI.reorderBookmarks({
        bookmarkId: draggedItem.bookmark._id,
        position: currentIndex,
        from: isReorderWithinGroup ? currentGroup : draggedItem.bookmark.group,
        to: currentGroup
      })
    } else {
      console.log('else')
    }

    state.reset()
    return
  }
}

const dragCollect = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource()
})

export type BookmarkDragSourceProps = ReturnType<typeof dragCollect>

export const bookmarkDragSource = (
  component: React.ComponentType<BookmarkDragSourceProps & BookmarkCardProps>
) =>
  DragSource<BookmarkCardProps>(DnDTypes.bookmarks, dragSource, dragCollect)(
    component
  )
