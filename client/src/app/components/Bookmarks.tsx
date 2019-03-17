import React, { FC, useContext } from 'react'
import { BookmarksContext } from '../hooks-contexts/useFetchBookmarks'

const Bookmarks: FC<{}> = () => {
  const { bookmarks } = useContext(BookmarksContext)

  return (
    <div>
      {bookmarks.map(bm => {
        return <div key={bm._id}>{bm.title}</div>
      })}
    </div>
  )
}

export default Bookmarks
