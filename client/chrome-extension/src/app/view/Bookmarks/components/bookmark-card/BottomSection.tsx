import React, { FC, useContext } from 'react'
import { BookmarkCardProps } from '.'
import { GroupContext } from '../../../../hooks-contexts/useGroups'
import { EditBookmarkModalContext } from '../../../../hooks-contexts/useModal'
import { theme } from '../../../../styles/theme'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

const BottomSection: FC<BookmarkCardProps> = ({ bookmark, index }) => {
  const { pullBookmark, removeBookmark } = useContext(GroupContext)

  const { openModal } = useContext(EditBookmarkModalContext)
  const { _id, tags } = bookmark

  return (
    <>
      <IconButton
        onClick={async () => {
          await removeBookmark(_id)
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
          openModal(bookmark, index)
        }}
      >
        <Icon fontSize="small" className="fas fa-ellipsis-h" />
      </IconButton>
    </>
  )
}

export default BottomSection