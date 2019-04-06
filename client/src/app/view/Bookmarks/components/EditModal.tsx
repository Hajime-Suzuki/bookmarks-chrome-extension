import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import { Form, Formik } from 'formik'
import React, { FC, useContext } from 'react'
import { BookmarksProps } from '..'
import { GroupContext } from '../../../hooks-contexts/useGroups'
import { EditModalContext } from '../../../hooks-contexts/useModal'

const EditModal: FC<BookmarksProps> = ({ groupId }) => {
  const { isOpen, closeModal, selectedBookmark } = useContext(EditModalContext)
  const { updateBookmark } = useContext(GroupContext)

  const isModalSelected =
    !!selectedBookmark && selectedBookmark.group === groupId
  return (
    <Dialog open={isOpen && isModalSelected} onClose={closeModal} maxWidth="md">
      <DialogTitle style={{ textAlign: 'center' }}>Edit Bookmark</DialogTitle>
      <Formik
        initialValues={{
          title: selectedBookmark ? selectedBookmark.title : '',
          tags:
            selectedBookmark && selectedBookmark.tags
              ? selectedBookmark.tags.join(', ')
              : ''
        }}
        onSubmit={async values => {
          if (selectedBookmark)
            await updateBookmark(selectedBookmark._id, values)
          closeModal()
        }}
      >
        {formikProps => {
          const {
            handleSubmit,
            values,
            handleChange,
            dirty,
            isSubmitting
          } = formikProps
          return (
            <>
              <DialogContent style={{ minWidth: 300 }}>
                <Form>
                  <TextField
                    fullWidth
                    label="Title"
                    value={values.title}
                    name="title"
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="tags"
                    value={values.tags}
                    name="tags"
                    onChange={handleChange}
                  />
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeModal}>Close</Button>
                <Button
                  onClick={handleSubmit as any}
                  color="primary"
                  variant="outlined"
                  type="submit"
                  disabled={!dirty || isSubmitting}
                >
                  Save
                </Button>
              </DialogActions>
            </>
          )
        }}
      </Formik>
    </Dialog>
  )
}

export default EditModal
