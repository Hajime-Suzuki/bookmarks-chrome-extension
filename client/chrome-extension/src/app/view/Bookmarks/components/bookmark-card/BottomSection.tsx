import React, { FC, useContext } from 'react'
import { BookmarkCardProps } from '.'
import { GroupContext } from '../../../../contexts/Groups'
import { EditBookmarkModalContext } from '../../../../contexts/EditModal'
import { theme } from '../../../../styles/theme'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

const BottomSection: FC<BookmarkCardProps> = ({
  bookmark,
  index,
  groupIndex
}) => {
  const { pullBookmark, removeBookmark } = useContext(GroupContext)

  const { openModal } = useContext(EditBookmarkModalContext)
  const { _id, tags } = bookmark

  return (
    <>
      <IconButton
        onClick={async () => {
          await removeBookmark(_id)
          pullBookmark({ targetBookmarkIndex: index, groupIndex })
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
