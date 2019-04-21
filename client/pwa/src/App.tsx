import { GroupsProvider } from '@bookmarks/extension/src/app/hooks-contexts/useGroups'
import { UserContextProvider } from '@bookmarks/extension/src/app/hooks-contexts/useUser'
import { theme } from '@bookmarks/extension/src/app/styles/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import { BookmarksProvider } from '@bookmarks/extension/src/app/hooks-contexts/useBookmarks'

const App: FC<{}> = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContextProvider>
          <GroupsProvider>
            <BookmarksProvider>
              <CssBaseline />
              <Routes />
            </BookmarksProvider>
          </GroupsProvider>
        </UserContextProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
