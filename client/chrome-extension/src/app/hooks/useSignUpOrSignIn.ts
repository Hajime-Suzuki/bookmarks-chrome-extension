import { useState, useContext } from 'react'
import { UserContext } from '../contexts/User'
import Amplify, { Auth } from 'aws-amplify'
import { useHttp } from './useHttp'

const config = {
  Auth: {
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID
  }
}

Amplify.configure(config)

interface SignUpOrLoginArgs {
  email: string
  password: string
}

export const useSignUpOrSignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const { setUser } = useContext(UserContext)

  const toggleSignUp = () => setIsSignUp(!isSignUp)

  const signUp = async (values: SignUpOrLoginArgs) => {
    await Auth.signUp({
      username: values.email,
      password: values.password
    })
  }

  const login = async (values: SignUpOrLoginArgs) => {
    return await Auth.signIn({
      username: values.email,
      password: values.password
    })
  }

  const _handleSubmit = async (values: SignUpOrLoginArgs) => {
    if (isSignUp) await signUp(values)
    const res = await login(values)
    await setUser(res)
    return
  }

  const { fn: handleSubmit, ...state } = useHttp(_handleSubmit)
  return { ...state, isSignUp, toggleSignUp, handleSubmit }
}
