import React, { useState, createContext, FC } from 'react'
import { IBookmark } from '../types'

type ID = IBookmark['_id']
const useModal = () => {
  const [isOpen, setOpen] = useState(false)
  const [selectedId, selectBookmark] = useState<ID | null>(null)
  const openModal = () => setOpen(true)
  const closeModal = () => {
    setOpen(false)
    selectBookmark(null)
  }
  const selectEditBookmark = (_id: ID) => selectBookmark(_id)

  return {
    isOpen,
    openModal,
    closeModal,
    selectedId,
    selectEditBookmark
  }
}

export const EditModalContext = createContext({} as ReturnType<typeof useModal>)

export const EditModalProvider: FC<{}> = ({ children }) => {
  const value = useModal()
  return (
    <EditModalContext.Provider value={value}>
      {children}
    </EditModalContext.Provider>
  )
}
