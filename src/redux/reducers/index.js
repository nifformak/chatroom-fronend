import { combineReducers } from 'redux'

const reducers = ['user', 'dialog', 'message']

export default combineReducers(
  reducers.reduce((initial, name) => {
    initial[name] = require(`./${name}`).default
    return initial
  }, {})
)
