import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Amplify, { Auth } from 'aws-amplify'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
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

const Login = () => {
  const { setUser } = useContext(UserContext)
  const initialValues = {
    email: '',
    password: ''
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: typeof initialValues) => {
          const res = await Auth.signIn({
            username: values.email,
            password: values.password
          })
          setUser(res)
        }}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
              <Typography variant="title" align="center">
                Login
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
                <Grid item>
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default Login
