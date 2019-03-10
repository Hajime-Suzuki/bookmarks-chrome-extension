import React from 'react'
import ReactDOM from 'react-dom'

class Main extends React.Component {
  render() {
    return (
      <div className={'my-extension'}>
        <h1>Hello world - My first Extension</h1>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('popup'))
