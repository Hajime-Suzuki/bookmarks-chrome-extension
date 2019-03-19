import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React from 'react'
import OpenedTabs from './view/Tabs/OpenendTabs'
import { theme } from './styles/theme'
import { Divider, Grid } from '@material-ui/core'
import { BookmarksProvider } from './hooks-contexts/useBookmarks'
import Bookmarks from './view/Bookmarks'
import CssBaseline from '@material-ui/core/CssBaseline'
import { EditModalProvider } from './hooks-contexts/useModal'

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <EditModalProvider>
        <BookmarksProvider>
          <Grid container>
            <Grid item lg={9} style={{ padding: theme.spacing.unit * 2 }}>
              <Bookmarks />
            </Grid>
            <Grid item lg={3} style={{ padding: '30px 0' }}>
              <OpenedTabs />
            </Grid>
          </Grid>
        </BookmarksProvider>
      </EditModalProvider>
    </MuiThemeProvider>
  )
}

export default App
