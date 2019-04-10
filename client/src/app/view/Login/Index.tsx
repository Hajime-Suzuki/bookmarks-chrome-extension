import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Form, Formik } from 'formik'
import React from 'react'
import { useSignUpOrSignIn } from '../../hooks-contexts/useSignUpOrSignIn'

const LoginOrSignUp = () => {
  const { handleSubmit, isSignUp, toggleSignUp, error } = useSignUpOrSignIn()
  const initialValues = {
    email: '',
    password: ''
  }
  console.log({ error })
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
