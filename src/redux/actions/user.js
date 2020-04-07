import constants from '../constants/user'
import userApi from '../../utils/api/user'

const actions = {
  startCreateLoginLoading: () => ({
    type: constants.START_LOGIN_LOADING,
  }),
  setUser: (user) => ({
    type: constants.SET_USER,
    payload: user,
  }),
  createUser: (login) => async (dispatch) => {
    dispatch(actions.startCreateLoginLoading())
    const { data } = await userApi.signInUser(login)
    window.axios.defaults.headers.common['token'] = data.token
    window.localStorage['token'] = data.token
    const user = {
      token: data.token,
      id: data.user._id,
      name: data.user.login,
    }
    dispatch(actions.setUser(user))
  },
  fetchUser: () => async (dispatch) => {
    if(window.localStorage['token']){
      window.axios.defaults.headers.common['token'] = window.localStorage['token']
      const{data} = await userApi.fetchUser();
      if(data.user){
      const user = {
        token: window.localStorage['token'],
        id: data.user._id,
        name: data.user.login,
      }
      dispatch(actions.setUser(user))
    }else {console.log('user undefined')}
  }},
}

export default actions
