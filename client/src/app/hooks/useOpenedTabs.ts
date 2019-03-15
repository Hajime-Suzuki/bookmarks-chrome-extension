import { useState, useEffect } from 'react'
import { Tab } from '../types'
import { subscribeMessage, unsubscribe } from '../helpers/subscribeTabs'
import { useSubscribe } from './useSubscribe'

// const a = () =>
//   chrome.tabs.query({ active: false, currentWindow: true }, res => {
//     setTabs(res)
//   })

const useOpenedTabs = () => {
  const [tabs, setTabs] = useState([] as Tab[])
  const [currentWindow, setCurrentWindow] = useState<number>(0)
  // useSubscribe(setTabs)

  const removeTab = () => {
    setTabs(tabs.slice(0, tabs.length - 1))
  }

  const closeTab = (tabId: NonNullable<Tab['id']>) => {
    chrome.tabs.remove(tabId)
    console.log(tabId)
  }
  // console.log(':: useOpenedTabs -> currentWindow', currentWindow)
  // console.log('update')

  useEffect(() => {
    const getCurrentTabs = () => {
      chrome.tabs.query({ active: false, currentWindow: true }, res => {
        setTabs(res)
      })
    }
    getCurrentTabs()

    subscribeMessage(({ type, tabId }) => {
      if (type === 'remove') {
        console.log('remove!!')
        setTabs(state => {
          return state.filter(s => s.id !== tabId!)
        })
      }
    })
  }, [])

  const aaa = ({ type, _ }) => {
    if (type === 'remove') {
      console.log({ aishetieanihet: tabs })
    }
  }

  // useEffect(() => {
  //   console.log('ashiet')
  //   subscribeMessage(aaa as any)
  //   return () => {
  //     console.log('clean')
  //     unsubscribe(aaa as any)
  //   }
  // })

  console.log(':: useOpenedTabs -> tabs', tabs)
  return {
    tabs,
    removeTab,
    closeTab
  }
}

export default useOpenedTabs
