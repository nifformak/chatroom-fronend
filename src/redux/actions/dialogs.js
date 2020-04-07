import constants from '../constants/dialog'
import dialogApi from '../../utils/api/dialog'
import socket from '../../core/socket'
import { actionsMessage } from './index'

const actions = {
  setDialogs: (dialogs) => ({
    type: constants.SET_DIALOGS,
    payload: dialogs,
  }),
  fetchDialogs: () => async (dispatch) => {
    const { data } = await dialogApi.fetchDialogs()
    console.log(data, 'dialogs')
    data.dialogs.forEach((item) =>
      socket.emit('DIALOGS:JOIN', item._id, 'dialogs')
    )
    if (data.dialogs) {
      dispatch(actions.setDialogs(data.dialogs))
    }
  },
  createDialog: (name) => async (dispatch) => {
    const { data } = await dialogApi.createDialog(name)
    await dispatch(actions.fetchDialogs())
    dispatch(actions.setActiveDialog(data.dialog._id))
  },
  addUserToDialog: (id) => async (dispatch) => {
    await dialogApi.addUser(id)
    await dispatch(actions.fetchDialogs())
    await dispatch(actionsMessage.fetchMessages(id))
    socket.emit('MESSAGE:SEND', id, 'dialogs')
    socket.emit('MESSAGE:SEND', id, 'messages')
  },
  setActiveDialog: (id) => ({
    type: constants.SET_ACTIVE_DIALOG,
    payload: id,
  }),
  leaveDialog: (dialogId) => async (dispatch) => {
    await dialogApi.leaveDialog(dialogId)
    await dispatch(actions.fetchDialogs())
    await dispatch(actionsMessage.fetchMessages(dialogId))
    socket.emit('MESSAGE:SEND', dialogId, 'dialogs')
    socket.emit('MESSAGE:SEND', dialogId, 'messages')
    await dispatch(actions.setActiveDialog(0))
  },
}

export default actions
