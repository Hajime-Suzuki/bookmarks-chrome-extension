import React, { FC, useContext } from 'react'
import { BookmarksProps } from '..'
import { GroupContext } from '../../../hooks-contexts/useGroups'
import { EditBookmarkModalContext } from '../../../hooks-contexts/useModal'
import FormModal from './FormModal'

const EditModal: FC<BookmarksProps> = ({ groupId }) => {
  const { isOpen, closeModal, selectedItem: selectedBookmark } = useContext(
    EditBookmarkModalContext
  )
  const { updateBookmark } = useContext(GroupContext)

  const isModalSelected =
    !!selectedBookmark && selectedBookmark.group === groupId

  const submit = async (values: typeof initialValues) => {
    if (selectedBookmark && selectedBookmark.index !== null)
      await updateBookmark(selectedBookmark._id, selectedBookmark.index, values)
    closeModal()
  }

  const initialValues = {
    title: selectedBookmark ? selectedBookmark.title : '',
    tags:
      selectedBookmark && selectedBookmark.tags
        ? selectedBookmark.tags.join(', ')
        : ''
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

export default EditModal
