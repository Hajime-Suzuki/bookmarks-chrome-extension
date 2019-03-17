import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React from 'react'
import OpenedTabs from './components/OpenendTabs'
import { theme } from './styles/theme'
import Bookmarks from './components/Bookmarks'
import { Divider } from '@material-ui/core'
import { BookmarksProvider } from './hooks-contexts/useFetchBookmarks'

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <BookmarksProvider>
        <Bookmarks />
        <Divider />
        <OpenedTabs />
      </BookmarksProvider>
    </MuiThemeProvider>
  )
}

export default App
