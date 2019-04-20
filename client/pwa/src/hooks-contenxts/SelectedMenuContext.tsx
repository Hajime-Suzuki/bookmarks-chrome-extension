import React, { createContext, useContext, FC } from 'react'
import { useMenu } from './useMenu'

export const SelectedMenuContext = createContext({} as ReturnType<
  typeof useMenu
>)
export const SelectedMenuProvider: FC<{}> = ({ children }) => {
  const value = useMenu()
  return (
    <SelectedMenuContext.Provider value={value}>
      {children}
    </SelectedMenuContext.Provider>
  )
}
