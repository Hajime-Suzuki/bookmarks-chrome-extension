import React, { useState, createContext, FC } from 'react'
import { IBookmark, IGroup } from '../types'

const useModal = () => {
  const [isOpen, setOpen] = useState(false)
  const [selectedBookmark, setBookmark] = useState<IBookmark | null>(null)
  const openModal = () => setOpen(true)

  const closeModal = () => {
    setOpen(false)
    setBookmark(null)
  }
  const selectEditBookmark = (arg: IBookmark) => setBookmark(arg)

  return {
    isOpen,
    openModal,
    closeModal,
    selectedBookmark,
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
