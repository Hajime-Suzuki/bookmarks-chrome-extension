import { useState, useEffect } from 'react'
import { Tab } from '../types'

const useOpenedTabs = () => {
  const [tabs, setTabs] = useState([] as Tab[])

  useEffect(() => {
    chrome.tabs.query({ active: false, currentWindow: true }, tabs => {
      setTabs(tabs)
    })
  }, [])

  return {
    tabs
  }
}

export default useOpenedTabs
