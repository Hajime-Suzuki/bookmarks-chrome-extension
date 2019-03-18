import { Dialog, DialogTitle } from '@material-ui/core'
import React, { FC, useContext } from 'react'
import { EditModalContext } from '../../../hooks-contexts/useModal'
import { Formik } from 'formik'

const EditModal: FC = () => {
  const { isOpen, closeModal } = useContext(EditModalContext)
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>Edit Bookmark</DialogTitle>
      <Formik
        initialValue={{ title: 'asht' }}
        onSubmit={() => console.log('subimt')}
        render={() => {
          return 'saihetn'
        }}
      />
    </Dialog>
  )
}

export default EditModal
