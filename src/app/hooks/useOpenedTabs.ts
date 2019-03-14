import { useState, useEffect } from 'react'
import { Tab } from '../types'
import { subscribeMessage } from '../helpers/subscribeTabs'
import { useSubscribe } from './useSubscribe'

// const a = () =>
//   chrome.tabs.query({ active: false, currentWindow: true }, res => {
//     setTabs(res)
//   })

const useOpenedTabs = () => {
  const [tabs, setTabs] = useState([] as Tab[])
  const [currentWindow, setCurrentWindow] = useState<number>(0)
  useSubscribe(setTabs)

  const removeTab = () => {
    setTabs(tabs.slice(0, tabs.length - 1))
  }
  console.log(':: useOpenedTabs -> tabs', tabs)
  // console.log(':: useOpenedTabs -> currentWindow', currentWindow)
  // console.log('update')
  return {
    tabs,
    removeTab
  }
}

export default useOpenedTabs
