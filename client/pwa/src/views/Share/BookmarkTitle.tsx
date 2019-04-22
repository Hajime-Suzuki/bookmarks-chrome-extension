import TextField from '@material-ui/core/TextField'
import React, { FC } from 'react'

interface Props {
  title: string
  handleBookmarkTitleChange: (e: any) => void
}
const BookmarkTitle: FC<Props> = ({ title, handleBookmarkTitleChange }) => {
  return <TextField value={title} onChange={handleBookmarkTitleChange} />
}

export default BookmarkTitle
