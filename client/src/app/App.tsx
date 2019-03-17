import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React from 'react'
import OpenedTabs from './view/Tabs/OpenendTabs'
import { theme } from './styles/theme'
import { Divider, Grid } from '@material-ui/core'
import { BookmarksProvider } from './hooks-contexts/useFetchBookmarks'
import Bookmarks from './view/Bookmarks'
import CssBaseline from '@material-ui/core/CssBaseline'

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BookmarksProvider>
        <Grid container>
          <Grid item lg={9}>
            <Bookmarks />
          </Grid>
          <Grid item lg={3}>
            <OpenedTabs />
          </Grid>
        </Grid>
      </BookmarksProvider>
    </MuiThemeProvider>
  )
}

export default App
