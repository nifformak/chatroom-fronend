import React from 'react'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import './Chat.scss'
import {DialogList, Login} from '../../containers'
import Messages from '../../containers/Messages'

const Chat = ({ isAuth }) => {
  const { id } = useParams()

  return (
    <section className={classNames('Chat')}>
      {isAuth ? <>
        <DialogList />
        {id ? <Messages id={id} /> : <div>Выберите или создайте диалог</div>}
      </>: <Login />}
    </section>
  )
}

export default connect((state) => ({ isAuth: state.user.isAuth }), null)(Chat)
