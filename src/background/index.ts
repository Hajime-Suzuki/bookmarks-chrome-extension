chrome.browserAction.onClicked.addListener(tab => {
  console.log(tab)
  if (!tab.id) return
  chrome.tabs.sendMessage(tab.id, {
    name: 'bg!!!!'
  })
})

// chrome.bookmarks.onCreated.addListener(() => {
//   console.log('bookmark!')
// })
