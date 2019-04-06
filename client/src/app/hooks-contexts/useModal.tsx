import React, { createContext, FC, useState } from 'react'
import { IBookmark } from '../types'

type BookmarkWithIndex = IBookmark & { index: number | null }
const useModal = () => {
  const [isOpen, setOpen] = useState(false)
  const [selectedBookmark, setBookmark] = useState<BookmarkWithIndex | null>(
    null
  )

  const openModal = () => setOpen(true)

  const closeModal = () => {
    setOpen(false)
    setBookmark(null)
  }
  const selectEditBookmark = (arg: IBookmark, index: number) =>
    setBookmark({ ...arg, index })

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
