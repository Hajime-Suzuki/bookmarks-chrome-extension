import { CognitoUser } from '@aws-amplify/auth'
import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec
} from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { DnDTypes } from '../../constants'
import { IBookmark } from '../types'
import { BookmarkCardProps } from '../view/Bookmarks/components/bookmark-card'
import { dndBookmarkState as state } from './bookmark-state'

interface OwnProps {
  user: CognitoUser | null
}

export interface BeginDragReturnType {
  // id: IBookmark['_id']
  bookmark: IBookmark
  index: number
  size: ClientRect | DOMRect
}

const dragSource: DragSourceSpec<
  BookmarkCardProps & OwnProps,
  BeginDragReturnType
> = {
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
    const { currentGroup, currentBookmarkIndex } = state

    const isReorderWithinGroup =
      currentGroup === draggedItem.bookmark.group &&
      draggedItem.index !== currentBookmarkIndex

    const isReorderCrossGroup = currentGroup !== draggedItem.bookmark.group

    if (isReorderWithinGroup || isReorderCrossGroup) {
      if (!currentGroup || currentBookmarkIndex === null) return
      console.log('reorder')
      await state.placeReorder({
        bookmarkId: draggedItem.bookmark._id,
        position: currentBookmarkIndex,
        from: isReorderWithinGroup ? currentGroup : draggedItem.bookmark.group,
        to: currentGroup
      })
    } else {
      console.log('else')
    }
    state.reset()
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
  component: React.ComponentType<
    BookmarkDragSourceProps & BookmarkCardProps & OwnProps
  >
) =>
  DragSource<BookmarkCardProps & OwnProps>(
    DnDTypes.bookmarks,
    dragSource,
    dragCollect
  )(component)
