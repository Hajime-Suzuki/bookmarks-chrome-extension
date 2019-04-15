import { Form, Formik } from 'formik'
import React, { FC, Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
