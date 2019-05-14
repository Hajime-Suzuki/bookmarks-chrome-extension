import { Message } from '../app/helpers/subscribeTabs'

export type TAB_EVENT = 'remove' | 'initial' | 'loading'

const sendMessage = (args: Message) => chrome.runtime.sendMessage(args)

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  sendMessage({ type: 'loading', tab })
})

chrome.tabs.onRemoved.addListener((tabId, info) => {
  sendMessage({ type: 'remove', tabId })
})
