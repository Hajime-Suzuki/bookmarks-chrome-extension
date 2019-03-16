import * as mongoos from 'mongoose'

export const connectDB = () => {
  const dbString =
    process.env.DB_STRING || 'mongodb://localhost:27017/bookmarks'
  mongoos.connect(dbString, { useNewUrlParser: true })
}
