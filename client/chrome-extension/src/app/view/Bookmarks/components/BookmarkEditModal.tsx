import React, { FC, useContext } from 'react'
import { BookmarksProps } from '..'
import { GroupContext } from '../../../hooks-contexts/useGroups'
import { EditBookmarkModalContext } from '../../../hooks-contexts/useEditModal'
import FormModal from './FormModal'

const BookmarkEditModal: FC<BookmarksProps> = ({ groupId, groupIndex }) => {
  const { isOpen, closeModal, selectedItem: selectedBookmark } = useContext(
    EditBookmarkModalContext
  )
  const { updateBookmark } = useContext(GroupContext)

  const isModalSelected =
    !!selectedBookmark && selectedBookmark.group === groupId

  const submit = async (values: typeof initialValues) => {
    if (selectedBookmark && selectedBookmark.index !== null)
      await updateBookmark({
        id: selectedBookmark._id,
        groupIndex,
        bookmarkIndex: selectedBookmark.index,
        input: values
      })
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

export default BookmarkEditModal
