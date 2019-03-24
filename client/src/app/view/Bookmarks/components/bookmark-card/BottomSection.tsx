import { Icon, IconButton, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { BookmarkContext } from '../../../../hooks-contexts/useBookmarks'
import { EditModalContext } from '../../../../hooks-contexts/useModal'
import { theme } from '../../../../styles/theme'
import { BookmarkCardProps } from '.'

const BottomSection = ({ bookmark }: Pick<BookmarkCardProps, 'bookmark'>) => {
  const { deleteBookmark } = useContext(BookmarkContext)
  const { openModal, selectEditBookmark } = useContext(EditModalContext)
  const { _id, tags } = bookmark

  return (
    <>
      <IconButton onClick={() => deleteBookmark(_id)}>
        <Icon fontSize="small" className="fas fa-minus-circle" />
      </IconButton>
      <Typography
        style={{
          width: '100%',
          textAlign: 'center',
          color: theme.typography.caption.color
        }}
      >
        {tags && tags.join(', ')}
      </Typography>
      <IconButton
        style={{
          marginLeft: 'auto'
        }}
        onClick={() => {
          selectEditBookmark(_id)
          openModal()
        }}
      >
        <Icon fontSize="small" className="fas fa-ellipsis-h" />
      </IconButton>
    </>
  )
}

export default BottomSection
