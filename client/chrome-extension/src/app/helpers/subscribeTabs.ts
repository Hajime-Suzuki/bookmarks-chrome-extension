import { TAB_EVENT } from '../../background'
import { Tab } from '@bookmarks/shared/src/types'

export interface Message {
  type: TAB_EVENT
  tabId?: Tab['id']
  tab?: Tab
  tabs?: Tab[]
}

export type OnMessageCallback = (
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => void

export const subscribeMessage = (fn: OnMessageCallback) =>
  chrome.runtime.onMessage.addListener(fn)

export const unsubscribe = (fn: OnMessageCallback) =>
  chrome.runtime.onMessage.removeListener(fn)
