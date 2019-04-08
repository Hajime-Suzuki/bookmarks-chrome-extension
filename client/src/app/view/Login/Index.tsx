import React from 'react'
import Formik from 'formik'

const Login = () => {
  const initialValues = {
    email: '',
    password: ''
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={() => {
          <Typography>Login</Typography>
        }}
      />
    </div>
  )
}

export default Login
