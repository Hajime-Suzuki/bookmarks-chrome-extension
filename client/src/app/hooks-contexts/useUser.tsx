import React, { createContext } from 'react'
import { useState, useEffect, FC } from 'react'
import { CognitoUser } from '@aws-amplify/auth'
import { Auth } from 'aws-amplify'
import { useHttp } from './useHttp'
import axios from 'axios'

const useUser = () => {
  const [user, setUser] = useState<CognitoUser | null>(null)
  const { fn: getUser, fetching, error } = useHttp(async () => {
    const currentUser: CognitoUser = await Auth.currentAuthenticatedUser()
    return setUser(currentUser)
  })

  console.log({ user })

  useEffect(() => {
    getUser()
  }, [])

  return {
    fetching,
    user,
    setUser,
    error
  }
}

type UserContext = ReturnType<typeof useUser>
export const UserContext = createContext({} as UserContext)

export const UserContextProvider: FC<{}> = ({ children }) => {
  const users = useUser()
  return <UserContext.Provider value={users}>{children}</UserContext.Provider>
}
