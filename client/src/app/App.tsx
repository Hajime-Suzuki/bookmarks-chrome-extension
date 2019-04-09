import { Grid } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import React, { useContext, FC } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import styled from 'styled-components'
import { BookmarksProvider } from './hooks-contexts/useBookmarks'
import { GroupsProvider } from './hooks-contexts/useGroups'
import { OpenedTabProvider } from './hooks-contexts/useOpenedTabs'
import { UserContext, UserContextProvider } from './hooks-contexts/useUser'
import { theme } from './styles/theme'
import Bookmarks from './view/Bookmarks'
import Login from './view/Login'
import OpenedTabs from './view/Tabs/OpenendTabs'

const BookmarkWrapper = styled(Grid)``

interface Props {
  desktop: string
}
const TabWrapper = styled(Grid)<Props>`
  padding: ${({ desktop }) =>
    desktop ? '0px' : `${theme.spacing.unit * 2}px`};
`

const ContextProviders: FC<{}> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GroupsProvider>
        <BookmarksProvider>
          <OpenedTabProvider>{children}</OpenedTabProvider>
        </BookmarksProvider>
      </GroupsProvider>
    </MuiThemeProvider>
  )
}

const App: React.FC = () => {
  const { fetching, user } = useContext(UserContext)
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  console.log(fetching, user)

  if (fetching) return <div>Loading...</div>
  if (!user) return <Login />
  return (
    <ContextProviders>
      {user && (
        <Grid container>
          <>
            <BookmarkWrapper item lg={9}>
              <Bookmarks />
            </BookmarkWrapper>
            <TabWrapper item lg={3} desktop={`${isDesktop}`}>
              <OpenedTabs />
            </TabWrapper>
          </>
        </Grid>
      )}
      {!user && <Login />}
    </ContextProviders>
  )
}

export default DragDropContext(HTML5Backend)(App)
