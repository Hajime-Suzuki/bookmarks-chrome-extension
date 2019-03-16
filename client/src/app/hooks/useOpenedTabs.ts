import { useEffect, useState } from 'react'
import { subscribeMessage } from '../helpers/subscribeTabs'
import { Tab } from '../types'

const useOpenedTabs = () => {
  const [tabs, setTabs] = useState([] as Tab[])

  const removeTab = () => {
    setTabs(tabs.slice(0, tabs.length - 1))
  }

  const closeTab = (tabId: NonNullable<Tab['id']>) => {
    chrome.tabs.remove(tabId)
  }

  useEffect(() => {
    const getCurrentTabs = () => {
      chrome.tabs.query({ active: false, currentWindow: true }, res => {
        setTabs(res)
      })
    }
    getCurrentTabs()

    subscribeMessage(({ type, tabId }) => {
      if (type === 'remove') {
        setTabs(state => {
          return state.filter(s => s.id !== tabId!)
        })
      }
    })
  }, [])

  return {
    tabs,
    removeTab,
    closeTab
  }
}

export default useOpenedTabs
