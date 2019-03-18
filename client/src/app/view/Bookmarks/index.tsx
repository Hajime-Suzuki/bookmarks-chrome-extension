import { Grid } from '@material-ui/core'
import React, { FC, Fragment, useContext } from 'react'
import { BookmarkContext } from '../../hooks-contexts/useBookmarks'
import BookmarkCard from './components/BookmarkCard'
import EditModal from './components/EditModal'

const Bookmarks: FC<{}> = () => {
  const { bookmarks } = useContext(BookmarkContext)
  return (
    <Grid container spacing={24} justify="flex-start">
      {bookmarks.map(bm => {
        return (
          <Grid key={bm._id} item xs={12} sm={6} md={4} lg={3}>
            <BookmarkCard bookmark={bm} />
          </Grid>
        )
      })}
      <EditModal />
    </Grid>
  )
}

export default Bookmarks
