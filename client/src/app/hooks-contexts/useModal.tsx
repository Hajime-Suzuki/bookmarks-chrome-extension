import React, { useState, createContext, FC } from 'react'
const useModal = () => {
  const [isOpen, setOpen] = useState(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return {
    isOpen,
    openModal,
    closeModal
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
