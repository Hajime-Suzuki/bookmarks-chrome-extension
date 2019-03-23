import { useEffect, useState, createContext, FC } from 'react'
import { APP_NAME } from '../../constants'
import {
  OnMessageCallback,
  subscribeMessage,
  unsubscribe
} from '../helpers/subscribeTabs'
import { Tab } from '../types'
import { BookmarkContext, useBookmarks } from './useBookmarks'
import React from 'react'

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

export type OpenedTabContext = ReturnType<typeof useOpenedTabs>
export const OpenedTabContext = createContext({} as OpenedTabContext)

export const OpenedTabProvider: FC<{}> = props => {
  const tabs = useOpenedTabs()

  return (
    <OpenedTabContext.Provider value={tabs}>
      {props.children}
    </OpenedTabContext.Provider>
  )
}
