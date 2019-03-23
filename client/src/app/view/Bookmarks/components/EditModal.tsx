import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import { Form, Formik } from 'formik'
import React, { FC, useContext, useMemo } from 'react'
import { BookmarkContext } from '../../../hooks-contexts/useBookmarks'
import { EditModalContext } from '../../../hooks-contexts/useModal'

const EditModal: FC<{}> = () => {
  const { isOpen, closeModal, selectedId } = useContext(EditModalContext)
  const { bookmarks, updateBookmark } = useContext(BookmarkContext)
  const selectedBookmark = useMemo(
    () => bookmarks.find(bm => bm._id === selectedId),
    [selectedId]
  )

  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth="md">
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
