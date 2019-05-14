import { useModal } from '@bookmarks/shared/hooks/useModal'
import React, { createContext, FC } from 'react'

const useReorderGroups = () => {
  const modal = useModal()

  return {
    ...modal
  }
}

export type ReorderModalContext = ReturnType<typeof useReorderGroups>
export const ReorderModalContext = createContext({} as ReorderModalContext)

export const ReorderModalProvider: FC<{}> = props => {
  const reorderGroup = useReorderGroups()

  return (
    <ReorderModalContext.Provider value={reorderGroup}>
      {props.children}
    </ReorderModalContext.Provider>
  )
}
