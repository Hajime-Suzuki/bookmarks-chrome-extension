export enum TableNames {
  bookmarks = 'bookmarks',
  groups = 'groups',
  users = 'users'
}

const shouldUseLocalDB = process.env.IS_OFFLINE || !process.env.DB_URL
export const AuthCheckerOption = {
  auth: shouldUseLocalDB ? false : true
}
