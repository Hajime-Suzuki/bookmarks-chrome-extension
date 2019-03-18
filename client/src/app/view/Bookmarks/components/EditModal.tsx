import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  TextField,
  DialogActions
} from '@material-ui/core'
import React, { FC, useContext, useMemo } from 'react'
import { EditModalContext } from '../../../hooks-contexts/useModal'
import { Formik, FormikProps, Form, Field } from 'formik'
import { IBookmark } from '../../../types'
import { BookmarkContext } from '../../../hooks-contexts/useBookmarks'

interface FormValues {
  title: IBookmark['title']
}
const EditModal: FC = () => {
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
          title: selectedBookmark ? selectedBookmark.title : ''
        }}
        onSubmit={async values => {
          if (selectedBookmark)
            await updateBookmark(selectedBookmark._id, values)
          closeModal()
        }}
      >
        {formikProps => {
          const { handleSubmit, values, handleChange } = formikProps
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
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeModal}>Close</Button>
                <Button
                  onClick={handleSubmit as any}
                  color="primary"
                  variant="outlined"
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
