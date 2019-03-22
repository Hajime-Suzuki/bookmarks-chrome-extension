import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React from 'react'
import OpenedTabs from './view/Tabs/OpenendTabs'
import { theme } from './styles/theme'
import { Divider, Grid } from '@material-ui/core'
import { BookmarksProvider } from './hooks-contexts/useBookmarks'
import Bookmarks from './view/Bookmarks'
import CssBaseline from '@material-ui/core/CssBaseline'
import { EditModalProvider } from './hooks-contexts/useModal'

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import styled from 'styled-components'

const BookmarkWrapper = styled(Grid)`
  padding: ${theme.spacing.unit * 2}px;
`

interface Props {
  desktop: string
}
const TabWrapper = styled(Grid)<Props>`
  padding: ${({ desktop }) =>
    desktop ? `${theme.spacing.unit * 2}px 0` : `${theme.spacing.unit * 2}px`};
`

const App: React.FC = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <EditModalProvider>
        <BookmarksProvider>
          <Grid container>
            <BookmarkWrapper item lg={9}>
              <Bookmarks />
            </BookmarkWrapper>
            <TabWrapper item lg={3} desktop={`${isDesktop}`}>
              <OpenedTabs />
            </TabWrapper>
          </Grid>
        </BookmarksProvider>
      </EditModalProvider>
    </MuiThemeProvider>
  )
}

export default App
