export const APP_NAME = 'React App'

const BASE_URL =
  process.env.API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:4000'

export const API_BOOKMARK_URL = `${BASE_URL}/bookmarks`

export const API_GROUPS_URL = `${BASE_URL}/groups`

export enum DnDTypes {
  tabs = 'tabs',
  bookmarks = 'bookmarks'
}
