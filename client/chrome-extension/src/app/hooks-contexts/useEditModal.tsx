import React, { createContext, FC, useState, useContext } from 'react'
import { IBookmark, IGroup } from '../types'
import { Omit } from '@material-ui/core'

type BookmarkWithIndex = IBookmark & { index: number | null }
type GroupWithIndex = IGroup & { index: number | null }

export interface EditModal<T> {
  isOpen: boolean
  selectedItem: T & { index: number | null } | null
  openModal: (arg: Omit<T, 'index'>, index: number) => void
  closeModal: () => void
}

const useModalEditModal = <T extends IBookmark | IGroup>() => {
  type TState = T extends IBookmark ? BookmarkWithIndex : GroupWithIndex
  const [isOpen, setOpen] = useState(false)
  const [selectedItem, select] = useState<TState | null>(null)

  const openModal = (arg: Omit<TState, 'index'>, index: number) => {
    select(({ ...arg, index } as unknown) as TState)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    select(null)
  }

  return {
    isOpen,
    openModal,
    closeModal,
    selectedItem
  } as EditModal<TState>
}

export const EditBookmarkModalContext = createContext({} as EditModal<
  IBookmark
>)

export const EditBookmarkModalProvider: FC<{}> = ({ children }) => {
  const value = useModalEditModal<IBookmark>()
  return (
    <EditBookmarkModalContext.Provider value={value}>
      {children}
    </EditBookmarkModalContext.Provider>
  )
}

export const EditGroupModalContext = createContext({} as EditModal<IGroup>)

export const EditGroupModalContextProvider: FC<{}> = ({ children }) => {
  const value = useModalEditModal<IGroup>()
  return (
    <EditGroupModalContext.Provider value={value}>
      {children}
    </EditGroupModalContext.Provider>
  )
}
