type OnMessageCallback = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => void

const subscribe = (fn: OnMessageCallback) =>
  chrome.runtime.onMessage.addListener(fn)

const unsubscribe = (fn: OnMessageCallback) =>
  chrome.runtime.onMessage.removeListener(fn)
