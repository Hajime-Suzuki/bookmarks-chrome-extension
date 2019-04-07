import React, { FC, useContext } from 'react'
import { BookmarksProps } from '..'
import { GroupContext } from '../../../hooks-contexts/useGroups'
import {
  EditBookmarkModalContext,
  EditGroupModalContext
} from '../../../hooks-contexts/useModal'
import FormModal from './FormModal'
import { IBookmark, IGroup } from '../../../types'
import { UpdateGroupInput } from '../../../api/groups'
import { GroupProps } from './group/Group'

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

  console.log('render modal')
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
