import { useDrag, useDrop } from 'react-dnd/lib/cjs/hooks'
import { DnDTypes } from '../../constants'
import { Tab } from '../types'
import useOpenedTabs from './useOpenedTabs'
import { FC } from 'react'
import { BookmarkWrapperProps } from '../view/Bookmarks'
import { TabListProps } from '../view/Tabs/OpenendTabs'
import { useGroups } from './useGroups'

interface DropTabProps {
  type: DnDTypes.tabs
  isDragging: boolean
  tab: Tab
}

export const useDnDDropTab = (props: BookmarkWrapperProps) => {
  const [dropProps, drop] = useDrop<
    DropTabProps,
    void,
    { isDragging: boolean }
  >({
    accept: DnDTypes.tabs,
    collect: monitor => {
      return {
        isDragging: !!monitor.getItem()
      }
    },
    drop: item => {
      // any action here
    }
  })

  return {
    dropProps,
    drop
  }
}

export const useDnDDragTab = (props: TabListProps) => {
  const [, drag] = useDrag({
    item: {
      type: DnDTypes.tabs,
      tab: props.tab
    }
  })

  return {
    drag
  }
}
