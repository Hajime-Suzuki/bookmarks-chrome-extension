import React, { useState, FC, createContext, useMemo } from 'react'
import { format } from 'date-fns'

const useNewGroup = () => {
  const [open, setOpen] = useState(false)
  const newGroup = useMemo(() => format(new Date(), 'yyyy MM dd'), [])
  const [groupName, setGroupName] = useState(newGroup)
  const closeModal = () => setOpen(false)
  const openModal = () => setOpen(true)
  const removeGroupName = () => setGroupName('')
  return {
    open,
    groupName,
    closeModal,
    openModal,
    setGroupName,
    removeGroupName
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
