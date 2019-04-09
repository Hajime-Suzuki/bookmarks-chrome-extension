import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Amplify, { Auth } from 'aws-amplify'
import { Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import Grid from '@material-ui/core/Grid'
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

const LoginOrSignUp = () => {
  const [isSignUp, setSignUp] = useState(true)
  const [signUpError, setSignUpError] = useState<string | null>(null)
  const { setUser } = useContext(UserContext)
  const initialValues = {
    email: '',
    password: ''
  }

  const toggleSignUp = () => setSignUp(!isSignUp)

  const handleSubmit = async (values: typeof initialValues) => {
    if (isSignUp) {
      setSignUpError(null)
      try {
        const user = await Auth.signUp({
          username: values.email,
          password: values.password
        })
      } catch (e) {
        setSignUpError(e.message)
      }
    }
    const res = await Auth.signIn({
      username: values.email,
      password: values.password
    })
    setUser(res)
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
                {signUpError && (
                  <Grid item>
                    <Typography>{signUpError}</Typography>
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
