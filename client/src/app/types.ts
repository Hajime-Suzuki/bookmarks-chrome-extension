export type Tab = chrome.tabs.Tab

export interface IBookmark {
  _id: string
  title: string
  url: string
  img?: string
  tags?: string[]
  createdAt: string
  updatedAt?: string
}
