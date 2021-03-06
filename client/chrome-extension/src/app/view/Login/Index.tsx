import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Form, Formik } from 'formik'
import React, { FC } from 'react'
import { useSignUpOrSignIn } from '@bookmarks/shared/src/hooks/useSignUpOrSignIn'

interface Props {
  onLogin?: () => void
}

const LoginOrSignUp: FC<Props> = ({ onLogin }) => {
  const { handleSubmit, isSignUp, toggleSignUp, error } = useSignUpOrSignIn()
  const initialValues = {
    email: '',
    password: ''
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (e: any) => {
        await handleSubmit(e)
        if (onLogin) onLogin()
      }}
    >
      {({ values, handleChange }) => {
        return (
          <Form>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              spacing={24}
            >
              <Grid item>
                <Typography variant="title" align="center">
                  {isSignUp ? 'Sign up' : 'Sign in'}
                </Typography>
              </Grid>
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
  )
}

export default LoginOrSignUp
