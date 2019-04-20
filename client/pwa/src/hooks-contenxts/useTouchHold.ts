import { useState } from 'react'

let interval: any
const useTouchHold = () => {
  const [isLongHold, setTouch] = useState(false)

  const touchStart = () => {
    interval = setInterval(() => {
      setTouch(_isLongHold => {
        console.log('touch start')
        if (_isLongHold) {
          clearInterval(interval)
        }
        return true
      })
    }, 500)
  }

  const touchEnd = () => {
    console.log('touch end')
    // if (!isLongHold) {
    clearInterval(interval)
    setTouch(false)
    // }
  }

  // const closeModal = () => {
  //   clearInterval(interval)
  //   setTouch(false)
  // }

  return {
    isLongHold,
    touchStart,
    touchEnd
    // closeModal
  }
}
