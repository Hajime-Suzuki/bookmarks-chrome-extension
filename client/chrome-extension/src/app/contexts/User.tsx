import { CognitoUser } from '@aws-amplify/auth'
import { Auth } from 'aws-amplify/'
import React, { createContext, FC, useEffect, useState } from 'react'
import { useHttp } from '@bookmarks/shared/src/hooks/useHttp'

const useUser = () => {
  const [user, setUser] = useState<CognitoUser | null>(null)
  const [fetching, setFetching] = useState(true)

  const { fn: getUser, error } = useHttp(async () => {
    try {
      const currentUser: CognitoUser = await Auth.currentAuthenticatedUser()
      setUser(currentUser)
      setFetching(false)
    } catch (error) {
      setFetching(false)
    }
  })

  const logOut = async () => await Auth.signOut()

  useEffect(() => {
    getUser()
  }, [])

  return {
    fetching,
    user,
    logOut,
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
