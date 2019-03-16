import * as mongoos from 'mongoose'

export const connectDB = () => {
  try {
    const shouldUseLocalDB = process.env.IS_OFFLINE || !process.env.DB_URL

    console.log(shouldUseLocalDB ? 'connect local db' : 'connect remote db')

    const dbString = shouldUseLocalDB
      ? 'mongodb://localhost:27017/bookmarks'
      : process.env.DB_URL!

    mongoos.connect(dbString, { useNewUrlParser: true })
  } catch (e) {
    console.log('=== failed to connect to DB')
    console.log(e)
  }
}
