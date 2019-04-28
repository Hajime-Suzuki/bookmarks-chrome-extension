import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  ListItem,
  ListItemText
} from '@material-ui/core'
import React, { FC, useContext } from 'react'
import {
  ReorderModalContext,
  ReorderModalProvider
} from '../../../../contexts/ReorderBookmarkContext'
import { GroupContext } from '../../../../contexts/Groups'
import {
  groupDragSource,
  GroupDragSourceProps
} from '../../../../dnd-settings/group-drag-source'
import { IGroup } from '../../../../types'
import {
  groupDropTarget,
  GroupDropTargetProps
} from '../../../../dnd-settings/group-drop-target'

const ReorderGroupButton: FC<{}> = () => {
  const { openModal } = useContext(ReorderModalContext)
  return (
    <IconButton onClick={openModal}>
      <Icon className="fas fa-sort" />
    </IconButton>
  )
}

export interface GroupListProps {
  group: IGroup
}
const GroupList: FC<GroupListProps> = ({ group }) => {
  return (
    <ListItem>
      <ListItemText>{group.title}</ListItemText>
    </ListItem>
  )
}

type Props = GroupDragSourceProps & GroupDropTargetProps & GroupListProps

const GroupListWrapper: FC<GroupListProps> = groupDropTarget(
  groupDragSource(
    class extends React.Component<Props> {
      render() {
        const {
          connectGroupDragSource,
          connectGroupDropTarget,
          group
        } = this.props
        return connectGroupDropTarget(
          connectGroupDragSource(
            <div key={group._id}>
              <GroupList group={group} />
            </div>
          )
        )
      }
    }
  )
)

const ReorderGroupsModal: FC<{}> = () => {
  const { open, closeModal } = useContext(ReorderModalContext)
  const { groups } = useContext(GroupContext)

  if (!groups) return null

  return (
    <>
      <Dialog open={true} onClose={closeModal} maxWidth="md">
        <DialogTitle style={{ textAlign: 'center' }}>
          Reorder Groups
        </DialogTitle>
        <DialogContent style={{ minWidth: 300 }}>
          {groups.map(group => {
            return <GroupListWrapper group={group} key={group._id} />
          })}
        </DialogContent>
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
