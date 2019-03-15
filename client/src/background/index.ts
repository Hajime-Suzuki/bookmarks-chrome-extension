import { Message } from '../app/helpers/subscribeTabs'
import { Tab } from '../app/types'

export enum TAB_EVENT {
  remove = 'remove',
  initial = 'initial'
}

const sendMessage = (args: Message) => chrome.runtime.sendMessage(args)

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (tab.status === 'loading') {
    //
    // console.log('updated')
    // console.log(tab)
  }
})

chrome.tabs.onCreated.addListener(tab => {
  chrome.tabs.query({ currentWindow: true }, tabs => {
    const currentTabs = tabs.filter(t => t.title !== 'React App')
    sendMessage({ type: 'initial', tabs: currentTabs })
  })
})

chrome.tabs.onRemoved.addListener((tabId, info) => {
  console.log('removed')
  sendMessage({ type: 'remove', tabId })
  // chrome.runtime.sendMessage({
  //   type: TAB_EVENT.remove
  // })
})

// chrome.bookmarks.onCreated.addListener(() => {
//   console.log('bookmark!')
// })
