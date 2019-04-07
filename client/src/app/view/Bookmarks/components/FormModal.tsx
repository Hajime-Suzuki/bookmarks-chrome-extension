import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core'
import { Form, Formik } from 'formik'
import React, { FC, Fragment } from 'react'

interface FormDialogProps<TValues = any> {
  isOpen: boolean
  initialValues: any
  dialogTitle: React.ReactChild
  onSubmit: (values: TValues) => any
  closeModal: () => any
  error?: string
}
const FormModal: FC<FormDialogProps> = props => {
  const {
    isOpen,
    closeModal,
    dialogTitle,
    initialValues,
    onSubmit,
    error
  } = props
  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth="md">
      <DialogTitle style={{ textAlign: 'center' }}>{dialogTitle}</DialogTitle>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                  {Object.keys(values).map(keyname => {
                    return (
                      <Fragment key={keyname}>
                        <TextField
                          fullWidth
                          label={keyname}
                          value={values[keyname]}
                          name={keyname}
                          onChange={handleChange}
                        />
                      </Fragment>
                    )
                  })}
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
                {error && <Typography color="error">{error}</Typography>}
              </DialogActions>
            </>
          )
        }}
      </Formik>
    </Dialog>
  )
}

export default FormModal
