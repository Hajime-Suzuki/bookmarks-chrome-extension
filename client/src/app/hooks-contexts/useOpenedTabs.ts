import { useEffect, useState } from 'react'
import { APP_NAME } from '../../constants'
import {
  OnMessageCallback,
  subscribeMessage,
  unsubscribe
} from '../helpers/subscribeTabs'
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
      chrome.tabs.query({ active: false, currentWindow: true }, currentTabs => {
        setTabs(currentTabs.filter(ct => ct.title !== APP_NAME))
      })
    }

    const subscribeCallback: OnMessageCallback = ({ type, tab, tabId }) => {
      if (type === 'loading') {
        getCurrentTabs()
      }
      if (type === 'remove') {
        setTabs(state => {
          return state.filter(s => s.id !== tabId!)
        })
      } else {
        getCurrentTabs()
      }
    }

    getCurrentTabs()
    subscribeMessage(subscribeCallback)

    return () => {
      unsubscribe(subscribeCallback)
    }
  }, [])

  return {
    tabs,
    removeTab,
    closeTab
  }
}

export default useOpenedTabs
