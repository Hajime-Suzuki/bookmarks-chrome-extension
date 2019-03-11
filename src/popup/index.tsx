import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'

const Popup = () => {
  return (
    <div>
      <Button variant='outlined' onClick={() => console.log('sitea')}>
        test
      </Button>
    </div>
  )
}

ReactDOM.render(<Popup />, document.getElementById('popup'))
