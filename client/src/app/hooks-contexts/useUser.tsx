import React, { createContext } from 'react'
import { useState, useEffect, FC } from 'react'
import { CognitoUser } from '@aws-amplify/auth'
import { Auth } from 'aws-amplify'

const useUser = () => {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<CognitoUser | null>(null)

  const getUser = async () => {
    setFetching(true)
    setError(null)
    try {
      const u = await Auth.currentAuthenticatedUser()
      setUser(u)
    } catch (e) {
      setError(e.message)
    }
    setFetching(false)
  }
  useEffect(() => {
    getUser()
  }, [])

  return {
    fetching,
    user,
    error,
    setUser
  }
}

type UserContext = ReturnType<typeof useUser>
export const UserContext = createContext({} as UserContext)

export const UserContextProvider: FC<{}> = ({ children }) => {
  const users = useUser()
  return <UserContext.Provider value={users}>{children}</UserContext.Provider>
}
