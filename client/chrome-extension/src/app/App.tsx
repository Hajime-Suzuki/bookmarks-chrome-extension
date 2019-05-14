import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import React, { FC, useContext } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import styled from 'styled-components'

import { GroupsProvider } from '@bookmarks/shared/contexts/Groups'
import { OpenedTabProvider } from '@bookmarks/shared/contexts/OpenedTabs'
import { UserContext } from '@bookmarks/shared/contexts/User'
import { theme } from './styles/theme'
import Bookmarks from './view/Bookmarks'
import LoginOrSignUp from './view/Login'
import OpenedTabs from './view/Tabs/OpenendTabs'

const BookmarkWrapper: any = styled(Grid)``

interface Props {
  desktop: string
}
const TabWrapper: any = styled(Grid)<Props>`
  padding: ${({ desktop }) =>
    desktop ? '0px' : `${theme.spacing.unit * 2}px`};
`

const ContextProviders: FC<{}> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GroupsProvider>
        <OpenedTabProvider>{children}</OpenedTabProvider>
      </GroupsProvider>
    </MuiThemeProvider>
  )
}

const App: React.FC = () => {
  const { fetching, user } = useContext(UserContext)
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <ContextProviders>
      <div>
        {!fetching && user && (
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
        {!user && !fetching && <LoginOrSignUp />}
        {fetching && <div>Loading</div>}
      </div>
    </ContextProviders>
  )
}

export default DragDropContext(HTML5Backend)(App)
