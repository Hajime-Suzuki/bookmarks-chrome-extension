import React from 'react'
import { showName, add } from 'shared/src'
// import { Typography } from '@material-ui/core'
import { Typography } from '@material-ui/core'

const App: React.FC = () => {
  console.log(showName())
  return (
    <Typography variant="h2">
      App! {add(1, 2)} {showName()}
    </Typography>
  )
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
}

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
