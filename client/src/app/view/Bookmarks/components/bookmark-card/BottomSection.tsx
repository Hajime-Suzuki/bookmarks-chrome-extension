import { Icon, IconButton, Typography } from '@material-ui/core'
import React, { FC, useContext } from 'react'
import { BookmarkCardProps } from '.'
import { bookmarksAPI } from '../../../../api/bookmarks'
import { GroupContext } from '../../../../hooks-contexts/useGroups'
import { EditModalContext } from '../../../../hooks-contexts/useModal'
import { theme } from '../../../../styles/theme'

const BottomSection: FC<BookmarkCardProps> = ({ bookmark, index }) => {
  const { pullBookmark } = useContext(GroupContext)
  const { openModal, selectEditBookmark } = useContext(EditModalContext)
  const { _id, tags } = bookmark

  return (
    <>
      <IconButton
        onClick={async () => {
          await bookmarksAPI.remove(bookmark._id)
          pullBookmark({ groupId: bookmark.group, targetIndex: index })
        }}
      >
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
          selectEditBookmark(bookmark)
          openModal()
        }}
      >
        <Icon fontSize="small" className="fas fa-ellipsis-h" />
      </IconButton>
    </>
  )
}

export default BottomSection
