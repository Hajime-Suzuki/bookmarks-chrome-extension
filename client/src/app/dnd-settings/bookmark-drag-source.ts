import { BookmarkCardProps } from '../view/Bookmarks/components/bookmark-card'
import {
  DragSourceMonitor,
  DragSourceConnector,
  DragSource,
  DragSourceSpec
} from 'react-dnd'
import { DnDTypes } from '../../constants'
import { findDOMNode } from 'react-dom'
import { IBookmark } from '../types'
import { resetDragState, dragState } from './bookmark-drop-target'
import { GroupContext } from '../hooks-contexts/useGroups'

export interface BeginDragReturnType {
  id: IBookmark['_id']
  bookmark: IBookmark
  index: number
  size: ClientRect | DOMRect
}

const dragSource: DragSourceSpec<BookmarkCardProps, BeginDragReturnType> = {
  beginDrag: (props, _, component) => {
    resetDragState()
    return {
      id: props.bookmark._id,
      bookmark: props.bookmark,
      index: props.index,
      size: (findDOMNode(component) as Element).getBoundingClientRect()
    }
  },
  endDrag: async (props, monitor, component) => {
    // if (!component) {
    //   return console.log('no component')
    // } else {
    //   console.log(component)
    // }
    const draggedItem = monitor.getItem() as BeginDragReturnType
    const { reorderBookmarksAPICall } = component.context as GroupContext
    const { currentIndex } = dragState
    await reorderBookmarksAPICall({
      bookmark: draggedItem.id,
      position: currentIndex as number,
      groupId: '5ca7cb542c45a00987cc6961'
    })
    resetDragState()
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
