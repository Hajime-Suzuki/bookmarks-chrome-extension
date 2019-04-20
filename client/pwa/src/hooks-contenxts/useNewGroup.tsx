import React, { useState, FC, createContext } from 'react'

const useNewGroup = () => {
  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState('')
  const closeModal = () => setOpen(false)
  const openModal = () => setOpen(true)

  return {
    open,
    groupName,
    closeModal,
    openModal,
    setGroupName
  }
}

export const NewGroupContext = createContext({} as ReturnType<
  typeof useNewGroup
>)
export const NewGroupProvider: FC<{}> = ({ children }) => {
  const value = useNewGroup()

  return (
    <NewGroupContext.Provider value={value}>
      {children}
    </NewGroupContext.Provider>
  )
}
