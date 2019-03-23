export const APP_NAME = 'React App'
export const API_BOOKMARK_URL =
  process.env.API_URL || 'http://localhost:4000/bookmarks'

export enum DnDTypes {
  tabs = 'tabs',
  bookmarks = 'bookmarks'
}
