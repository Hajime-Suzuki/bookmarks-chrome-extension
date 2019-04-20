export const APP_NAME = 'React App'

const BASE_URL =
  process.env.IS_DEV === 'development'
    ? 'http://localhost:4000'
    : process.env.REACT_APP_API_URL

export const API_BOOKMARK_URL = `${BASE_URL}/bookmarks`

export const API_GROUPS_URL = `${BASE_URL}/groups`

export enum DnDTypes {
  tabs = 'tabs',
  bookmarks = 'bookmarks'
}
