import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React from 'react'
import OpenedTabs from './components/OpenendTabs'
import { theme } from './styles/theme'

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <OpenedTabs />
    </MuiThemeProvider>
  )
}

export default App
