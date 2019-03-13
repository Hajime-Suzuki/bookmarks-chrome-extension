import React, { useState } from 'react'
import OpenedTabs from './components/OpenendTabs'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { theme } from './styles/theme'
import { Button } from '@material-ui/core'

const App: React.FC = () => {
  const [message, setMessage] = useState({ name: '' })

  return (
    <MuiThemeProvider theme={theme}>
      <OpenedTabs />
      <Button variant='contained' color='primary'>
        Hello World
      </Button>
    </MuiThemeProvider>
  )
}

export default App
