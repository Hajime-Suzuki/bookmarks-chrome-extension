import React, { FC, useState, useContext } from 'react'
import { IGroup } from '../../../../types'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { EditGroupModalContext } from '../../../../hooks-contexts/useModal'
import GroupEditModal from '../GroupEditModal'

export interface GroupProps {
  group: IGroup
  index: number
}
const Group: FC<GroupProps> = props => {
  const { children } = props
  return (
    <>
      <GroupTitle {...props} />
      <div>{children}</div>
      <GroupEditModal groupId={props.group._id} index={props.index} />
    </>
  )
}

const GroupTitle: FC<GroupProps> = ({ group, index }) => {
  const [showEditButton, setShowButton] = useState(false)
  const { openModal } = useContext(EditGroupModalContext)
  return (
    <Typography
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
      variant="title"
    >
      {group.title}
      <IconButton
        style={{
          marginLeft: 5,
          verticalAlign: 'middle',
          opacity: showEditButton ? 1 : 0,
          transition: '0.2s'
        }}
        onClick={() => {
          openModal(group, index)
        }}
      >
        <Icon className="fas fa-pen" fontSize="small" />
      </IconButton>
    </Typography>
  )
}

export default Group
