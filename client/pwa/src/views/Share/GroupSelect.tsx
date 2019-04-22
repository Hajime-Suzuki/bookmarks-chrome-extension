import { IGroup } from '@bookmarks/extension/src/app/types'
import React, { useContext } from 'react'
import { SelectedMenuContext } from '../../hooks-contenxts/SelectedMenuContext'
import { NewGroupContext } from '../../hooks-contenxts/useNewGroup'

import FormModal from '@bookmarks/extension/src/app/view/Bookmarks/components/FormModal'
import { Wrapper } from '.'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const GroupSelect = ({ groups }: { groups: IGroup[] }) => {
  const {
    selectItem,
    openMenu,
    anchor,
    closeMenu,
    selectedItem: { index }
  } = useContext(SelectedMenuContext)
  const {
    openModal,
    groupName: newGroupName,
    removeGroupName,
    setGroupName
  } = useContext(NewGroupContext)

  const groupTitle = index !== null ? groups[index].title : ''
  return (
    <Wrapper>
      <Typography variant="h4" align="center">
        Group
      </Typography>
      <Typography variant="h6" align="center">
        {groupTitle}
      </Typography>

      {newGroupName && (
        <TextField
          onChange={e => setGroupName(e.currentTarget.value)}
          value={newGroupName || ''}
        />
      )}
      <div style={{ marginTop: '2em' }} />
      {newGroupName && (
        <Button onClick={openMenu} variant="outlined">
          Select Group
        </Button>
      )}
      {!newGroupName && (
        <Button onClick={openModal} variant="outlined">
          Create Group
        </Button>
      )}
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
