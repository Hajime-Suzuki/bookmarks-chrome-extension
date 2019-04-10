import { useState, useContext } from 'react'
import { UserContext } from './useUser'
import Amplify, { Auth } from 'aws-amplify'
import { useHttp } from './useHttp'

const config = {
  Auth: {
    identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
    region: process.env.COGNITO_REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID
  }
}

Amplify.configure(config)

interface State {
  fetching: boolean
  error: string | null
}

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
    console.log('TCL: _handleSubmit -> values', values)
    if (isSignUp) await signUp(values)
    const res = await login(values)
    setUser(res)
  }

  const { fn: handleSubmit, ...state } = useHttp(_handleSubmit)

  return { ...state, isSignUp, toggleSignUp, handleSubmit }
}
