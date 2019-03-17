import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'

const Popup = () => {
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          console.log('popup clicked')
          // chrome.browserAction.setBadgeText({ text: 'ON' })
          chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const currentTab = tabs[0]
            if (!currentTab) return
            chrome.tabs.sendMessage(currentTab.id!, {
              name: Date()
            })
          })
          // chrome.tabs.create({})
        }}
      >
        test
      </Button>
    </div>
  )
}

ReactDOM.render(<Popup />, document.getElementById('popup'))
