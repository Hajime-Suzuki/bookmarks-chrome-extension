import React, { FC, useState, useContext } from 'react'
import { IGroup } from '../../../../types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Icon from '@material-ui/core/Icon'
import { EditGroupModalContext } from '../../../../hooks-contexts/useModal'
import GroupEditModal from '../GroupEditModal'
import styled from 'styled-components'
import { GroupContext } from '../../../../hooks-contexts/useGroups'

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
  const [confirmModalOpen, setOpenConfirm] = useState(false)
  const { openModal: openEditModal } = useContext(EditGroupModalContext)
  const { deleteGroup } = useContext(GroupContext)

  const openConfirmModal = () => setOpenConfirm(true)
  const closeConfirmModal = () => setOpenConfirm(false)

  return (
    <>
      <Typography
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        variant="title"
      >
        {group.title}
        <StyledIconButton
          show={showEditButton ? '1' : '0'}
          margin_left="10px"
          onClick={() => openEditModal(group, index)}
        >
          <Icon className="fas fa-pen" fontSize="small" />
        </StyledIconButton>
        <StyledIconButton
          show={showEditButton ? '1' : '0'}
          margin_left="10px"
          onClick={openConfirmModal}
        >
          <Icon className="fas fa-trash-alt" fontSize="small" />
        </StyledIconButton>
      </Typography>
      <Dialog open={confirmModalOpen} onClose={closeConfirmModal}>
        <DialogContent>
          <Typography color="error" variant="title">
            Delete this bookmark?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmModal}>
            <Typography>Cancel</Typography>
          </Button>
          <Button onClick={() => deleteGroup(index)} variant="outlined">
            <Typography color="error">Delete</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

interface ButtonProps {
  show: '1' | '0'
  margin_left?: string
}

const StyledIconButton = styled(IconButton)`
  && {
    vertical-align: middle;
    opacity: ${({ show }: ButtonProps) => show};
    transition: 0.2s;
    margin-left: ${({ margin_left }: ButtonProps) => margin_left || 'inherit'};
  }
`

export default Group
