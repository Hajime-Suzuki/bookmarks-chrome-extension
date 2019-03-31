import { useDrag, useDrop } from 'react-dnd/lib/cjs/hooks'
import { DnDTypes } from '../../constants'
import { IBookmark } from '../types'
import { BookmarkWrapperProps } from '../view/Bookmarks'

const GRID_SIZE = 4

const getXIndex = (dropAreaWith: number, targetOffsetX: number) => {
  const XThreshold = dropAreaWith / GRID_SIZE
  const XIndex = Math.floor(targetOffsetX / XThreshold)
  return XIndex
}

const getYIndex = (targetOffsetY: number, cardHeight: number) => {
  const YIndex = Math.floor(targetOffsetY / cardHeight) - 1
  return YIndex < 0 ? 0 : YIndex
}

type Ref = React.RefObject<HTMLDivElement>
let index: number | undefined
export const useDnDDropBookmark = (props: BookmarkWrapperProps, ref: Ref) => {
  const [, drop] = useDrop<ItemType, null, null>({
    accept: DnDTypes.bookmarks,
    hover: (item, monitor) => {
      if (!ref.current || !item.draggedItem) return

      const { width: dropAreaWith } = ref.current.getClientRects()[0]
      const { x: targetOffsetX, y: targetOffsetY } = monitor.getClientOffset()!

      const XIndex = getXIndex(dropAreaWith, targetOffsetX)
      const YIndex = getYIndex(targetOffsetY, item.draggedItem.height)
      const targetIndex = Math.min(
        YIndex * GRID_SIZE + XIndex,
        props.bookmarks.length - 1
      )

      if (targetIndex === index) return
      index = targetIndex

      const currentDraggedItemIndex = item.index

      // reorderBookmark(currentIndex, targetIndex)
      // item.index = targetIndex
      console.log(item.index)
    },
    drop: (item, monitor) => {
      return undefined
    }
  })

  return {
    drop
  }
}

interface ItemType {
  type: DnDTypes
  id: IBookmark['_id']
  index: number
  draggedItem: ClientRect | null
}
export const useDnDDragBookmark = (props, ref: Ref) => {
  const genItem = () => ({
    type: DnDTypes.bookmarks,
    id: props.bookmark._id,
    index: props.index,
    draggedItem: (ref.current && ref.current.getClientRects()[0]) || null
  })

  const [dragProps, drag] = useDrag<ItemType, {}, { isDragging: boolean }>({
    item: genItem(),
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      }
    },
    begin: monitor => genItem()
  })

  return {
    dragProps,
    drag
  }
}
