import React, { FC, useState, useContext, useMemo } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Icon from '@material-ui/core/Icon'
import GroupEditModal from '../GroupEditModal'
import styled from 'styled-components'

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider
} from '@material-ui/core'
import { IGroup } from '@bookmarks/shared/src/types'
import { EditGroupModalContext } from '../../../../contexts/EditModal'
import { GroupContext } from '../../../../contexts/Groups'

export interface GroupProps {
  group: IGroup
  index: number
}
const Group: FC<GroupProps> = props => {
  const { children, index } = props
  const open = index % 2 === 0
  return (
    <>
      <GroupTitle {...props} style={{ marginBottom: 10 }} />
      {children}
      <GroupEditModal groupId={props.group._id} index={props.index} />
    </>
  )
}

const GroupTitle: FC<GroupProps & { style: any }> = ({
  group,
  index,
  style
}) => {
  const [showEditButton, setShowButton] = useState(false)
  const [isConfirmModalOpen, setOpenConfirm] = useState(false)
  const { openModal: openEditModal } = useContext(EditGroupModalContext)
  const { deleteGroup } = useContext(GroupContext)

  const openConfirmModal = () => setOpenConfirm(true)
  const closeConfirmModal = () => setOpenConfirm(false)

  return (
    <div style={style}>
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
      <Dialog open={isConfirmModalOpen} onClose={closeConfirmModal}>
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
    </div>
  )
}

interface ButtonProps {
  show: '1' | '0'
  margin_left?: string
}

const StyledIconButton: any = styled(IconButton)`
  && {
    vertical-align: middle;
    opacity: ${({ show }: ButtonProps) => show};
    transition: 0.2s;
    margin-left: ${({ margin_left }: ButtonProps) => margin_left || 'inherit'};
  }
`

export default Group
