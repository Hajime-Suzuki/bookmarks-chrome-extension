import { useEffect } from 'react'
import { subscribeMessage, unsubscribe } from '../helpers/subscribeTabs'
import { Tab } from '../types'

export const useSubscribe = (callback: (args: Tab[]) => void) => {
  const getCurrentTabs = (_cb: (tabs: Tab[]) => void) => {
    chrome.tabs.query({ active: false, currentWindow: true }, res => {
      _cb(res)
    })
  }

  const subscribe: Parameters<typeof subscribeMessage>[0] = ({
    type,
    tabId,
    tabs
  }) => {
    switch (type) {
      case 'initial': {
        if (tabs) callback(tabs)
        return
      }
      case 'remove': {
        getCurrentTabs(_tabs => {
          const filtered = _tabs.filter(t => t.id !== tabId)
          callback(filtered)
        })
        return
      }
      default:
        return
    }
  }

  useEffect(() => {
    getCurrentTabs(callback)
    subscribeMessage(subscribe)
    return () => {
      unsubscribe(subscribe)
    }
  }, [])
}
