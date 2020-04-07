import axios from '../../core/axios'

export default {
  signInUser: (login) => axios.post('/user/signin', { login }),
  fetchUser: () => axios.get('/user/me'),
}
