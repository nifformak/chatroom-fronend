import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DialogListComponent } from '../components'
import { actionsDialogs, actionsMessage } from '../redux/actions'
import { withFormik } from 'formik'
import store from '../redux/store'
import socket from '../core/socket'
import { useHistory, useParams } from 'react-router-dom'

const DialogList = ({
  fetchDialogs,
  dialogs,
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isLoaded,
  activeDialogId,
  setActiveDialog,
  fetchMessages,
}) => {
  const { id } = useParams()

  const history = useHistory()
  const onSelectDialog = (id) => {
    socket.emit('DIALOGS:LIVE', activeDialogId, 'messages')
    setActiveDialog(id)
    socket.emit('DIALOGS:JOIN', id, 'messages')

    history.push(`/dialog/${id}`)
  }
  useEffect(() => {
    socket.on(
      'MESSAGE:SEND',
      ({ id, component }) => component === 'dialogs' && fetchDialogs()
    )
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    setActiveDialog(id)
    socket.emit('DIALOGS:JOIN', id, 'messages')
    fetchDialogs()
    fetchMessages(id)
  }, [fetchDialogs, fetchMessages, id, setActiveDialog])
  useEffect(() => {
    if (id !== activeDialogId && id !== null && activeDialogId !== null) {
      history.push(`/dialog/${activeDialogId}`)
    }
  }, [history, activeDialogId, id])
  return (
    <DialogListComponent
      dialogs={dialogs}
      values={values}
      errors={errors}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleSubmit={handleSubmit}
      isLoaded={isLoaded}
      activeDialogId={activeDialogId}
      onSelect={onSelectDialog}
    />
  )
}

const mapStateToProps = (state) => ({
  dialogs: state.dialog.dialogs,
  isLoaded: state.dialog.isLoaded,
  activeDialogId: state.dialog.activeDialog,
})

const mapDispatchToProps = (dispatch) => ({
  fetchDialogs: () => dispatch(actionsDialogs.fetchDialogs()),
  setActiveDialog: (id) => {
    dispatch(actionsDialogs.setActiveDialog(id))
  },
  fetchMessages: (id) => dispatch(actionsMessage.fetchMessages(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      name: '',
    }),
    validate: (values) => {
      let errors = {}
      if (!values.name) {
        errors.name = 'Please input chat name!'
      }
      return errors
    },
    handleSubmit: (values) => {
      store.dispatch(actionsDialogs.createDialog(values.name))
    },
    displayName: 'addDialogForm',
  })(DialogList)
)
