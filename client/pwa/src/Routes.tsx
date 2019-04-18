import React from 'react'
import { Route, RouteComponentProps, Redirect } from 'react-router'
import { FC, useContext } from 'react'
import { UserContext } from '@bookmarks/extension/src/app/hooks-contexts/useUser'
import Groups from './views/Groups'
import LoginSignUp from './views/LoginSignUp'

const AuthRoute: FC<any> = props => {
  const { component: Component, ...restProps } = props
  const { user, fetching } = useContext(UserContext)

  if (fetching) return null

  return (
    <Route
      {...restProps}
      render={routeProps =>
        user ? <Component {...routeProps} /> : <Redirect to="/login" />
      }
    />
  )
}

const Routes = () => {
  return (
    <>
      <Route
        exact
        path="/login"
        component={(props: RouteComponentProps) => <LoginSignUp {...props} />}
      />
      <AuthRoute exact path="/" component={() => <Groups />} />
    </>
  )
}

export default Routes
