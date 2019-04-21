import { IGroup } from '@bookmarks/extension/src/app/types'
import React, { useContext } from 'react'
import { SelectedMenuContext } from '../../hooks-contenxts/SelectedMenuContext'
import { NewGroupContext } from '../../hooks-contenxts/useNewGroup'
import {
  Typography,
  IconButton,
  Icon,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core'
import FormModal from '@bookmarks/extension/src/app/view/Bookmarks/components/FormModal'
import { Wrapper } from '.'

const GroupSelect = ({ groups }: { groups: IGroup[] }) => {
  const {
    selectItem,
    openMenu,
    anchor,
    closeMenu,
    selectedItem: { index }
  } = useContext(SelectedMenuContext)
  const { openModal, groupName, removeGroupName } = useContext(NewGroupContext)

  const groupTitle = index !== null ? groups[index].title : ''
  return (
    <Wrapper>
      <Typography variant="h4" align="center">
        Group
      </Typography>
      <Typography variant="h6" align="center">
        {groupName}
      </Typography>
      <Typography variant="h6" align="center">
        {groupTitle}
      </Typography>

      <IconButton onClick={openModal}>
        {groupName && <Icon className="fas fa-pen" fontSize="small" />}
        {!groupName && <Icon className="fas fa-plus-circle" fontSize="small" />}
      </IconButton>
      <Button onClick={openMenu} variant="outlined">
        Select
      </Button>
      <Menu anchorEl={anchor} open={!!anchor} onClose={closeMenu}>
        {groups.map((g, i) => {
          return (
            <MenuItem
              key={g._id}
              onClick={() => {
                removeGroupName()
                selectItem({ id: g._id, index: i })
              }}
              disabled={index !== null && index === i}
            >
              {g.title}
            </MenuItem>
          )
        })}
      </Menu>
      <NewGroupModal />
    </Wrapper>
  )
}

const NewGroupModal = () => {
  const { open, closeModal, setGroupName, groupName } = useContext(
    NewGroupContext
  )
  const { deselectItem } = useContext(SelectedMenuContext)

  const initialValues = { name: '' }

  return (
    <FormModal
      initialValues={groupName ? { name: groupName } : initialValues}
      isOpen={open}
      dialogTitle="Create Group"
      closeModal={closeModal}
      saveOnlyDirty={false}
      onSubmit={(values: typeof initialValues) => {
        setGroupName(values.name)
        deselectItem()
        closeModal()
      }}
    />
  )
}

export default GroupSelect
