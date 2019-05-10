import { theme } from '@bookmarks/extension/src/app/styles/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import { BookmarksProvider } from './contexts/Bookmarks'
import { UserContextProvider } from '@bookmarks/extension/src/app/contexts/User'
import { GroupsProvider } from '@bookmarks/extension/src/app/contexts/Groups'

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
