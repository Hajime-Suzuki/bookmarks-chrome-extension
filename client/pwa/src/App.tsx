import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React, { FC, useContext } from 'react'
import { BookmarksProvider } from '../../chrome-extension/src/app/hooks-contexts/useBookmarks'
import { GroupContext, GroupsProvider } from '../../chrome-extension/src/app/hooks-contexts/useGroups'
import { UserContext } from '../../chrome-extension/src/app/hooks-contexts/useUser'
import { theme } from '../../chrome-extension/src/app/styles/theme'
import { Bookmarks } from '../../chrome-extension/src/app/view/Bookmarks'
import LoginOrSignUp from '../../chrome-extension/src/app/view/Login'

const App: React.FC = () => {
  const { fetching, user } = useContext(UserContext)
  const { groups } = useContext(GroupContext)
  return (
    <ContextProviders>
      <div>
        {!fetching &&
          user &&
          groups &&
          groups.map((group, i) => (
            <Bookmarks
              bookmarks={group.bookmarks}
              groupId={group._id}
              groupIndex={i}
            />
          ))}
        {!user && !fetching && <LoginOrSignUp />}
        {fetching && <div>Loading</div>}
      </div>
    </ContextProviders>
  )
}

const ContextProviders: FC<{}> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GroupsProvider>
        <BookmarksProvider>{children}</BookmarksProvider>
      </GroupsProvider>
    </MuiThemeProvider>
  )
}

export default App
