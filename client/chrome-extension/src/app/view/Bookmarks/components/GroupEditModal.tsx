import React, { FC, useContext } from 'react'
import { UpdateGroupInput } from '@bookmarks/shared/src/api/groups'
import FormModal from './FormModal'
import { IGroup } from '@bookmarks/shared/src/types'
import { EditGroupModalContext } from '../../../contexts/EditModal'
import { GroupContext } from '../../../contexts/Groups'

interface Props {
  groupId: IGroup['_id']
  index: number
}
const GroupEditModal: FC<Props> = ({ groupId, index }) => {
  const { isOpen, closeModal, selectedItem: selectedGroup } = useContext(
    EditGroupModalContext
  )

  const { updateGroup } = useContext(GroupContext)

  const isModalSelected = !!selectedGroup && selectedGroup._id === groupId

  const submit = async (values: UpdateGroupInput) => {
    await updateGroup(index, values)
    closeModal()
  }

  const initialValues: UpdateGroupInput = {
    title: selectedGroup ? selectedGroup.title : ''
  }

  return (
    <FormModal
      isOpen={isOpen && isModalSelected}
      initialValues={initialValues}
      dialogTitle="Edit Bookmark"
      closeModal={closeModal}
      onSubmit={submit}
    />
  )
}

export default GroupEditModal
