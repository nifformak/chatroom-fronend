import axios from '../../core/axios'

export default {
  fetchMessages: (id) => axios.get(`/dialog/${id}`),
  createMessage: (text, dialogId) =>
    axios.post('/message/create', { text, dialogId }),
}
