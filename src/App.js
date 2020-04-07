import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actionsUser } from './redux/actions'
import { Switch, Route } from 'react-router-dom'
import Chat from './page/Chat/Chat'

function App({ fetchUser }) {
  useEffect(() => {
    fetchUser()
  })
  return (
    <Switch>
      <Route exec path={'/dialog/:id'} component={Chat} />
      <Route exec path={'/'} component={Chat} />
    </Switch>
  )
}

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(actionsUser.fetchUser()),
})

export default connect(null, mapDispatchToProps)(App)
