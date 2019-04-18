import { UserContextProvider } from '@bookmarks/extension/src/app/hooks-contexts/useUser'
import { GroupsProvider } from '@bookmarks/extension/src/app/hooks-contexts/useGroups'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import styled from 'styled-components'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from '@bookmarks/extension/src/app/styles/theme'

const App: FC<{}> = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContextProvider>
          <GroupsProvider>
            <CssBaseline />

            <Routes />
          </GroupsProvider>
        </UserContextProvider>
      </BrowserRouter>
    </MuiThemeProvider>
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
