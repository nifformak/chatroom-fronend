import axios from '../../core/axios'

export default {
  createDialog: (name) => axios.post('/dialog/create', { name: name }),
  fetchDialogs: () => axios.get('/dialogs'),
  addUser: (dialogId) => axios.post('/dialog/add-user', { dialogId }),
  leaveDialog: (dialogId) => axios.post('/dialog/leave-user', { dialogId }),
}
