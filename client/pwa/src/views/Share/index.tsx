import { GroupContext } from '@bookmarks/extension/src/app/hooks-contexts/useGroups'
import { IGroup } from '@bookmarks/extension/src/app/types'
import FormModal from '@bookmarks/extension/src/app/view/Bookmarks/components/FormModal'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import { format } from 'date-fns'
import { parse } from 'query-string'
import React, { useContext, useMemo } from 'react'
import useReactRouter from 'use-react-router'
import {
  SelectedMenuContext,
  SelectedMenuProvider
} from '../../hooks-contenxts/SelectedMenuContext'
import {
  NewGroupContext,
  NewGroupProvider
} from '../../hooks-contenxts/useNewGroup'

const Share = () => {
  const routeProps = useReactRouter()
  const { groups, fetching } = useContext(GroupContext)

  const params = parse(routeProps.location.search) as {
    title: string
    text: string
  }

  if (fetching || !groups) return <div>fetching</div>

  return (
    <>
      <GroupSelect groups={groups} />
    </>
  )
}

const GroupSelect = ({ groups }: { groups: IGroup[] }) => {
  const {
    selectItem,
    openMenu,
    anchor,
    closeMenu,
    selectedItem: { index }
  } = useContext(SelectedMenuContext)
  const { openModal, groupName } = useContext(NewGroupContext)

  const newGroup = useMemo(() => format(new Date(), 'yyyy MM dd'), [])

  return (
    <>
      <Typography variant="subtitle1">Group</Typography>
      <Typography>{groupName}</Typography>
      <Typography>{index !== null ? groups[index].title : ''}</Typography>
      <IconButton onClick={openModal}>
        <Icon className="fas fa-plus-circle" />
      </IconButton>
      <Typography>Or</Typography>
      <Button onClick={openMenu} variant="outlined">
        {index !== null ? groups[index].title : 'Select Group'}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchor}
        open={!!anchor}
        onClose={closeMenu}
      >
        {groups.map((g, i) => {
          return (
            <MenuItem
              key={g._id}
              onClick={() => selectItem({ id: g._id, index: i })}
              disabled={index !== null && index === i}
            >
              {g.title}
            </MenuItem>
          )
        })}
      </Menu>
      <NewGroupModal />
    </>
  )
}

const NewGroupModal = () => {
  const { open, closeModal, setGroupName, groupName } = useContext(
    NewGroupContext
  )
  const initialValues = { name: '' }

  return (
    <FormModal
      initialValues={{
        ...initialValues,
        ...(groupName && { name: groupName })
      }}
      isOpen={open}
      dialogTitle="Create Group"
      closeModal={closeModal}
      onSubmit={(values: typeof initialValues) => {
        setGroupName(values.name)
        closeModal()
      }}
    />
  )
}

export default () => (
  <SelectedMenuProvider>
    <NewGroupProvider>
      <Share />
    </NewGroupProvider>
  </SelectedMenuProvider>
)
