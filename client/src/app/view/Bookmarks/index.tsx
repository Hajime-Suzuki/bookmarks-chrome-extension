import { Grid } from '@material-ui/core'
import React, { FC, Fragment, useContext } from 'react'
import { BookmarksContext } from '../../hooks-contexts/useFetchBookmarks'
import BookmarkCard from './components/BookmarkCard'

const Bookmarks: FC<{}> = () => {
  const { bookmarks } = useContext(BookmarksContext)

  return (
    <Grid container spacing={24} justify="flex-start">
      {bookmarks.map(bm => {
        return (
          <Fragment key={bm._id}>
            <Grid item lg={3}>
              <BookmarkCard bookmark={bm} />
            </Grid>
          </Fragment>
        )
      })}
    </Grid>
  )
}

export default Bookmarks
