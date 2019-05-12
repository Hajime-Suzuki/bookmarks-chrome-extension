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
import { Omit } from 'react-dnd/lib/cjs/interfaces'

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
  groupIndex: number
}
const GroupListItem: FC<GroupListProps> = ({ group }) => {
  return (
    <ListItem>
      <ListItemText>{group.title}</ListItemText>
    </ListItem>
  )
}

export type GroupListItemWrapperProps = GroupDragSourceProps & GroupListProps

const GroupListItemWrapper: FC<GroupListProps> = groupDragSource(
  class extends React.Component<GroupListItemWrapperProps> {
    render() {
      const { connectGroupDragSource, ...rest } = this.props
      return connectGroupDragSource(
        <div>
          <GroupListItem {...rest} />
        </div>
      )
    }
  }
)

export type GroupListWrapperProps = GroupDropTargetProps & {
  groups: IGroup[]
} & Pick<GroupContext, 'reorderGroups'>

const GroupListWrapper: FC<
  Omit<GroupListWrapperProps, keyof GroupDropTargetProps>
> = groupDropTarget(
  class extends React.Component<GroupListWrapperProps> {
    render() {
      const { connectGroupDropTarget, groups } = this.props
      return connectGroupDropTarget(
        <div>
          {groups.map((group, i) => {
            return (
              <GroupListItemWrapper
                key={group._id}
                group={group}
                groupIndex={i}
              />
            )
          })}
        </div>
      )
    }
  }
)

const ReorderGroupsModal: FC<{}> = () => {
  const { open, closeModal } = useContext(ReorderModalContext)
  const { groups, reorderGroups } = useContext(GroupContext)

  if (!groups) return null

  return (
    <>
      <Dialog open={open} onClose={closeModal} maxWidth="md">
        <DialogTitle style={{ textAlign: 'center' }}>
          Reorder Groups
        </DialogTitle>
        <DialogContent style={{ minWidth: 300 }}>
          <GroupListWrapper groups={groups} reorderGroups={reorderGroups} />
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
