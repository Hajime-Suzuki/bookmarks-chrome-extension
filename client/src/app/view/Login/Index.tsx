import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Amplify, { Auth } from 'aws-amplify'
import { Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../hooks-contexts/useUser'

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
const useSignUpOrSignIn = () => {
  const initialState: State = {
    fetching: false,
    error: null
  }
  const [state, setState] = useState(initialState)
  const [isSignUp, setIsSignUp] = useState(false)
  const { setUser } = useContext(UserContext)

  const toggleSignUp = () => setIsSignUp(!isSignUp)

  const signUp = async (values: SignUpOrLoginArgs) => {
    setState({ ...state, fetching: true })
    try {
      await Auth.signUp({
        username: values.email,
        password: values.password
      })
    } catch (e) {
      setState({ fetching: false, error: e.message })
    }
  }

  const login = async (values: SignUpOrLoginArgs) => {
    try {
      const res = await Auth.signIn({
        username: values.email,
        password: values.password
      })
      setState(initialState)
      setUser(res)
    } catch (e) {
      setState({ fetching: false, error: e.message })
    }
  }

  const handleSubmit = async (values: SignUpOrLoginArgs) => {
    if (isSignUp) await signUp(values)
    await login(values)
  }

  return { ...state, isSignUp, toggleSignUp, handleSubmit }
}

const LoginOrSignUp = () => {
  const { handleSubmit, isSignUp, toggleSignUp, error } = useSignUpOrSignIn()
  const initialValues = {
    email: '',
    password: ''
  }

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => {
          return (
            <Form>
              <Typography variant="title" align="center">
                {isSignUp ? 'Sign up' : 'Sign in'}
              </Typography>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={24}
              >
                <Grid item>
                  <TextField
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </Grid>
                {error && (
                  <Grid item>
                    <Typography>{error}</Typography>
                  </Grid>
                )}
                <Grid item>
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Typography
                    style={{ cursor: 'pointer' }}
                    onClick={toggleSignUp}
                  >
                    {isSignUp ? 'or sign in' : 'or sign up'}
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginOrSignUp
