import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton
} from '@material-ui/core'
import React, { FC, useContext } from 'react'
import {
  ReorderModalContext,
  ReorderModalProvider
} from '../../../../hooks-contexts/ReorderBookmarkContext'

const ReorderGroupButton: FC<{}> = () => {
  const { openModal } = useContext(ReorderModalContext)
  return (
    <IconButton onClick={openModal}>
      <Icon className="fas fa-sort" />
    </IconButton>
  )
}

const ReorderGroupsModal: FC<{}> = () => {
  const { open, closeModal } = useContext(ReorderModalContext)
  return (
    <>
      <Dialog open={open} onClose={closeModal} maxWidth="md">
        <DialogTitle style={{ textAlign: 'center' }}>
          Reorder Groups
        </DialogTitle>
        <DialogContent style={{ minWidth: 300 }}>Content</DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
          <Button
            onClick={closeModal}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const ReorderGroups = () => (
  <ReorderModalProvider>
    <ReorderGroupButton />
    <ReorderGroupsModal />
  </ReorderModalProvider>
)

export default ReorderGroups
