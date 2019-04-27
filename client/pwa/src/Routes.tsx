import { UserContext } from '@bookmarks/extension/src/app/contexts/useUser'
import React, { FC, useContext } from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router'
import Groups from './views/Groups'
import LoginSignUp from './views/LoginSignUp'
import Share from './views/Share'

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
      <Route exact path="/index.html" component={Share} />
    </>
  )
}

export default Routes
