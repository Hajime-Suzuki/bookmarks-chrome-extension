import React, { FC, useContext, useEffect } from 'react'
import { showName, add } from '@bookmarks/shared'
// import { Typography } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ListItemText from '@material-ui/core/ListItemText'
import Something from '@bookmarks/shared/components/Something'
import {
  UserContextProvider,
  UserContext
} from '@bookmarks/extension/src/app/hooks-contexts/useUser'
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Redirect,
  RouteProps,
  Link
} from 'react-router-dom'

import LoginOrSignUp from '@bookmarks/extension/src/app/view/Login'

const AuthRoute: FC<any> = props => {
  const { component: Component, ...restProps } = props
  const { user, fetching } = useContext(UserContext)

  console.log(fetching, !!user)

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
      <Route exact path="/" component={() => <div>Top!</div>} />
      <Route
        exact
        path="/login"
        component={(props: RouteComponentProps) => (
          <LoginOrSignUp
            onLogin={() => {
              props.history.push('/bookmarks')
            }}
          />
        )}
      />
      <AuthRoute
        exact
        path="/bookmarks"
        component={() => <div>Bookmarks</div>}
      />
    </>
  )
}
const App: FC<{}> = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes />
        <Link to="/bookmarks">bookmarks</Link>
      </UserContextProvider>
    </BrowserRouter>
  )
}

// return (
//   <Typography variant="h2">
//     App! {add(1, 2)} {showName()}
//   </Typography>
// )
// const { fetching, user } = useContext(UserContext)
// const { groups } = useContext(GroupContext)
// return (
// <ContextProviders>
//   <div>
//     {!fetching &&
//       user &&
//       groups &&
//       groups.map((group, i) => (
//         <Bookmarks
//           bookmarks={group.bookmarks}
//           groupId={group._id}
//           groupIndex={i}
//         />
//       ))}
//     {!user && !fetching && <LoginOrSignUp />}
//     {fetching && <div>Loading</div>}
//   </div>
// </ContextProviders>
// )

// const ContextProviders: FC<{}> = ({ children }) => {
//   return (
//     <MuiThemeProvider theme={theme}>
//       <CssBaseline />
//       <GroupsProvider>
//         <BookmarksProvider>{children}</BookmarksProvider>
//       </GroupsProvider>
//     </MuiThemeProvider>
//   )
// }

export default App
