import { Grid } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import React, { Suspense } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import styled from 'styled-components'
import { BookmarksProvider } from './hooks-contexts/useBookmarks'
import { OpenedTabProvider } from './hooks-contexts/useOpenedTabs'
import { theme } from './styles/theme'
import Bookmarks from './view/Bookmarks'
import OpenedTabs from './view/Tabs/OpenendTabs'
import { GroupsProvider } from './hooks-contexts/useGroups'

const BookmarkWrapper = styled(Grid)``

interface Props {
  desktop: string
}
const TabWrapper = styled(Grid)<Props>`
  padding: ${({ desktop }) =>
    desktop ? '0px' : `${theme.spacing.unit * 2}px`};
`

const App: React.FC = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GroupsProvider>
        <BookmarksProvider>
          <OpenedTabProvider>
            <Grid container>
              <BookmarkWrapper item lg={9}>
                <Bookmarks />
              </BookmarkWrapper>
              <TabWrapper item lg={3} desktop={`${isDesktop}`}>
                <OpenedTabs />
              </TabWrapper>
            </Grid>
          </OpenedTabProvider>
        </BookmarksProvider>
      </GroupsProvider>
    </MuiThemeProvider>
  )
}

export default DragDropContext(HTML5Backend)(App)
